import { NextResponse } from "next/server";
import Stripe from "stripe";


interface CartItem {
    title: string;
    metadata?: Record<string, string>;
    unit_price: number;
    quantity?: number;
}

interface CheckoutRequestBody {
    items: CartItem[];
    guests?: number;
}

export async function POST(request: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Missing STRIPE_SECRET_KEY environment variable");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            typescript: true,
            apiVersion: "2025-12-15.clover",
        });

        const body = await request.json() as CheckoutRequestBody;
        const { items, guests } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ message: "No items in cart" }, { status: 400 });
        }

        const quantityMultiplier = (typeof guests === "number" && guests > 0) ? guests : 1;

        const lineItems = items.map((item: CartItem) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    metadata: item.metadata,
                },
                unit_amount: item.unit_price, // Price in cents
            },
            quantity: (item.quantity || 1) * quantityMultiplier,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${request.headers.get("origin")}/success`,
            cancel_url: `${request.headers.get("origin")}/cart`,
        });

        // --- Airtable Integration ---
        try {
            const { createOrder, createLineItems } = await import("@/lib/airtable");

            const orderId = await createOrder({
                stripeSessionId: session.id,
                status: 'Pending',
                guestsCount: quantityMultiplier,
                // We could pass total amount if needed
            });

            if (orderId) {
                // Prepare items for Airtable
                // We need to flatten the "guests" multiplier into the items or just log it
                // The current structure in createLineItems takes a list. 
                // Let's pass the raw items but quantity multiplied
                const airtableItems = items.map((item: CartItem) => ({
                    title: item.title,
                    quantity: (item.quantity || 1) * quantityMultiplier,
                    unitPrice: item.unit_price / 100, // Convert cents to dollars for Airtable visibility
                    metadata: item.metadata
                }));

                await createLineItems(orderId, airtableItems);
            }
        } catch (airtableError) {
            console.error("Failed to sync with Airtable:", airtableError);
        }

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        console.error("Error creating checkout session:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}
