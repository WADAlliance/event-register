import Stripe from "stripe";
import { jsPDF } from "jspdf";

interface BookingConfirmationData {
    customerName: string;
    customerEmail: string;
    transactionId: string;
    orderDate: string;
    lineItems: Array<{
        description: string;
        quantity: number;
        amount_total: number;
        currency: string;
    }>;
    totalAmount: number;
    currency: string;
}

async function generateStatementPDF(data: BookingConfirmationData): Promise<string> {
    const doc = new jsPDF();
    const margin = 20;
    let y = 30;

    doc.setFontSize(22);
    doc.setTextColor(238, 107, 65);
    doc.text("CATS 2026", margin, y);

    doc.setFontSize(10);
    doc.setTextColor(113, 128, 150);
    doc.text("Official Payment Statement", margin + 100, y);

    y += 20;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y - 5, 190, y - 5);

    doc.setFontSize(12);
    doc.setTextColor(14, 14, 14);
    doc.text("Customer Details:", margin, y);
    doc.setFontSize(14);
    doc.text(data.customerName, margin, y + 7);
    doc.setFontSize(10);
    doc.text(data.customerEmail, margin, y + 12);

    doc.text("Transaction ID:", margin + 100, y);
    doc.setFont("courier", "normal");
    doc.text(data.transactionId, margin + 100, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${data.orderDate}`, margin + 100, y + 12);

    y += 30;

    doc.setFillColor(247, 250, 252);
    doc.rect(margin, y, 170, 10, 'F');
    doc.setFontSize(10);
    doc.setTextColor(113, 128, 150);
    doc.text("Description", margin + 5, y + 7);
    doc.text("Qty", margin + 120, y + 7, { align: "center" });
    doc.text("Amount", margin + 165, y + 7, { align: "right" });

    y += 15;
    doc.setTextColor(45, 55, 72);

    data.lineItems.forEach(item => {
        const amount = (item.amount_total / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: item.currency.toUpperCase()
        });

        doc.text(item.description, margin + 5, y);
        doc.text(item.quantity.toString(), margin + 120, y, { align: "center" });
        doc.text(amount, margin + 165, y, { align: "right" });

        y += 8;
        if (y > 270) {
            doc.addPage();
            y = 30;
        }
    });

    y += 10;
    doc.setFillColor(255, 245, 242);
    doc.rect(margin, y, 170, 15, 'F');
    doc.setFontSize(14);
    doc.setTextColor(238, 107, 65);
    doc.text("TOTAL PAID", margin + 5, y + 10);

    const formattedTotal = (data.totalAmount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: data.currency.toUpperCase()
    });
    doc.text(`${formattedTotal} ${data.currency.toUpperCase()}`, margin + 165, y + 10, { align: "right" });

    doc.setFontSize(8);
    doc.setTextColor(160, 174, 192);
    doc.text("Cardano Africa Tech Summit 2026 | catsummit.io", margin, 285);
    doc.text("This is a system generated statement.", margin + 100, 285);

    const base64Content = doc.output('datauristring').split(',')[1];
    return base64Content;
}

function formatLineItemsAsHTML(items: BookingConfirmationData['lineItems']): string {
    return items.map(item => {
        const amount = (item.amount_total / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: item.currency.toUpperCase()
        });

        return `
            <tr style="border-bottom: 1px solid #edf2f7;">
                <td style="padding: 12px 0; color: #4a5568;">${item.description}</td>
                <td style="padding: 12px 0; text-align: center; color: #4a5568;">${item.quantity}</td>
                <td style="padding: 12px 0; text-align: right; color: #2d3748; font-weight: 500;">${amount}</td>
            </tr>
        `.trim();
    }).join('');
}

export async function sendBookingConfirmation(data: BookingConfirmationData): Promise<{ success: boolean; error?: string }> {
    try {
        if (!process.env.MAILCOACH_API_URL || !process.env.MAILCOACH_API_TOKEN) {
            console.warn('Mailcoach not configured - skipping confirmation email');
            return { success: false, error: 'Mailcoach not configured' };
        }

        const formattedAmount = (data.totalAmount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: data.currency.toUpperCase()
        });

        const pdfBase64 = await generateStatementPDF(data);

        const variables = {
            // Standard keys
            customerName: data.customerName,
            orderDate: data.orderDate,
            transactionId: data.transactionId,
            orderItems: formatLineItemsAsHTML(data.lineItems),
            totalAmount: (data.totalAmount / 100).toFixed(2),
            currency: data.currency.toUpperCase(),

            // Keys with exact template spacing
            "customerName ": data.customerName,
            "orderDate ": data.orderDate,
            "transactionId ": data.transactionId,
            "orderItems ": formatLineItemsAsHTML(data.lineItems),
            " currency ": data.currency.toUpperCase(),
            " totalAmount ": (data.totalAmount / 100).toFixed(2)
        };

        const response = await fetch(`${process.env.MAILCOACH_API_URL}/api/transactional-mails/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MAILCOACH_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                mail_name: 'booking-confirmation',
                to: data.customerEmail,
                from: process.env.MAILCOACH_FROM_EMAIL || 'hello@newsletter.catsummit.io',
                from_name: process.env.MAILCOACH_FROM_NAME || 'CATS 2026',
                subject: 'Your CATS 2026 Booking Confirmation',
                variables: variables,
                replacements: variables,
                slots: variables,
                attachments: [
                    {
                        name: `Statement_${data.transactionId.slice(-6)}.pdf`,
                        content: pdfBase64,
                        content_type: 'application/pdf'
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Mailcoach API error:', response.status, errorText);
            return { success: false, error: `Mailcoach API error: ${response.status} ` };
        }

        const result = await response.json();

        return { success: true };
    } catch (error) {
        console.error(' Failed to send booking confirmation email:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: errorMessage };
    }
}

export async function extractBookingDataFromSession(
    session: Stripe.Checkout.Session,
    stripe: Stripe
): Promise<BookingConfirmationData | null> {
    try {
        const customerName = session.customer_details?.name || 'Valued Customer';
        const customerEmail = session.customer_details?.email || session.customer_email;

        if (!customerEmail) {
            console.warn('No customer email found in session');
            return null;
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            limit: 100
        });

        const formattedLineItems = lineItems.data.map((item: Stripe.LineItem) => ({
            description: item.description || 'Item',
            quantity: item.quantity || 1,
            amount_total: item.amount_total || 0,
            currency: session.currency || 'usd'
        }));

        return {
            customerName,
            customerEmail,
            transactionId: session.id,
            orderDate: new Date(session.created * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            lineItems: formattedLineItems,
            totalAmount: session.amount_total || 0,
            currency: session.currency || 'usd'
        };
    } catch (error) {
        console.error('Failed to extract booking data from session:', error);
        return null;
    }
}
