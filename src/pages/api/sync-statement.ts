import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { findOrCreateCustomer, createOrder } from '../../lib/airtable';
import { extractBookingDataFromSession, sendBookingConfirmation } from '../../lib/mailcoach';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2026-02-25.clover' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.body;
  if (!session_id) return res.status(400).json({ error: 'missing session_id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['customer'] });

    const details = session.customer_details || {};
    const customer = (typeof session.customer === 'object' ? session.customer : null) || {};

    const fullName = ((details as Stripe.Checkout.Session.CustomerDetails).name || (customer as Stripe.Customer).name || session.metadata?.customer_name || '').trim();
    const email = ((details as Stripe.Checkout.Session.CustomerDetails).email || (customer as Stripe.Customer).email || session.customer_email || '').trim();
    const phone = ((details as Stripe.Checkout.Session.CustomerDetails).phone || (customer as Stripe.Customer).phone || session.metadata?.customer_phone || '').trim();

    const customerId = await findOrCreateCustomer({ fullName, email, phone });

    const orderId = await createOrder({
      stripeSessionId: session_id,
      status: session.payment_status === 'paid' ? 'Paid' : 'Pending',
      guestsCount: Number(session.metadata?.guestsCount || 1),
      orderDate: new Date().toISOString().slice(0, 10),
      customerEmail: email,
      customerFullName: fullName,
    });

    // Fallback email sending
    if (session.payment_status === 'paid') {
      try {
        const bookingData = await extractBookingDataFromSession(session, stripe);
        if (bookingData) {
          await sendBookingConfirmation(bookingData);
        }
      } catch (emailErr) {
        console.error('Fallback email error:', emailErr);
      }
    }

    return res.status(200).json({ ok: true, customerId, orderId });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('sync-statement error:', error?.stack || error);
    return res.status(500).json({ error: error?.message || String(err) });
  }
}