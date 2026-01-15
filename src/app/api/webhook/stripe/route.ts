import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderByStripeSession, findOrCreateCustomer } from "@/lib/airtable";

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ message: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        typescript: true,
        apiVersion: "2025-12-15.clover",
    });

    let event: Stripe.Event;

    try {
        if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
            console.warn("Stripe signature or webhook secret missing. This is only acceptable in development.");
            event = JSON.parse(body);
        } else {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        console.error(`Webhook signature verification failed: ${errorMessage}`);
        return NextResponse.json({ message: "Webhook Error" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log(`Payment confirmed for session: ${session.id}`);

        const customerName = session.customer_details?.name || session.metadata?.customer_name || "";
        const customerEmail = session.customer_details?.email || session.customer_email || "";
        const customerPhone = session.customer_details?.phone || session.metadata?.customer_phone || "";
        const totalAmount = session.amount_total ? session.amount_total / 100 : 0;

        try {

            const customerId = await findOrCreateCustomer({
                email: customerEmail,
                fullName: customerName,
                phone: customerPhone,
            });


            const orderUpdate = await updateOrderByStripeSession(session.id, {
                status: "Paid",
                totalAmount,
                customerId: customerId || undefined,
                stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
            });

            if (orderUpdate?.id) {
                console.log(`Airtable updated for session: ${session.id}`);
            } else {
                console.warn(`Order not found for session ${session.id}.`);
            }
        } catch (airtableError) {
            console.error(`Failed to update Airtable for session ${session.id}:`, airtableError);
        }
    }

    return NextResponse.json({ received: true });
}
