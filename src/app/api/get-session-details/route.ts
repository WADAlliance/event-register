import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ message: "Missing session_id" }, { status: 400 });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Missing STRIPE_SECRET_KEY environment variable");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            typescript: true,
            apiVersion: "2026-02-25.clover",
        });

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items", "customer"],
        });

        const details = {
            id: session.id,
            customer_details: session.customer_details,
            amount_total: session.amount_total,
            currency: session.currency,
            line_items: session.line_items?.data.map(item => ({
                id: item.id,
                description: item.description,
                amount_total: item.amount_total,
                quantity: item.quantity,
                currency: item.currency,
            })),
            created: session.created,
            status: session.status,
            payment_status: session.payment_status,
        };

        return NextResponse.json(details);
    } catch (err: unknown) {
        console.error("Error fetching session details:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}
