import Airtable from 'airtable';

// --- Interfaces based on User Schema ---

export interface Product {
    id?: string; // Airtable Record ID
    product_id: string; // e.g. 'maasai-mara'
    name: string;
    description?: string;
    unit_price: number;
    type: 'Accommodation' | 'Safari' | 'Add-on' | 'Flight';
    status: 'Active' | 'Archived';
}

export interface Order {
    id?: string; // Airtable Record ID
    stripe_session_id?: string;
    customer_id?: string; // Link to Customer record
    order_date?: string;
    status: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
    guests_count: number;
    // total_amount is calculated in Airtable via Rollup, but we might want to track it here too if needed
}

export interface NewsItem {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    isFeatured: boolean;
    content?: string;
    readMoreUrl?: string;
}

export interface OrderLineItem {
    id?: string; // Airtable Record ID
    order_id: string; // Link to Order record
    product_id?: string; // Link to Product record (if we have it) or we might just store metadata if product syncing is complex
    // For this phase, if we don't have Product records synced, we might need to rely on text fields or ensure Products exist.
    // However, the schema requested 'Link to Products'. 
    // To keep it simple for now, we'll try to link if we have the ID, or just rely on the 'Metadata' field for description.
    quantity: number;
    unit_price: number;
    metadata?: string;
}

// --- Client Initialization ---

const baseId = process.env.AIRTABLE_BASE_ID;
const apiKey = process.env.AIRTABLE_API_KEY;

if (!baseId || !apiKey) {
    console.warn("❌ Airtable not configured: Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY in environment variables.");
} else {
    console.log("✅ Airtable configuration found. Initializing base...");
}

const base = (baseId && apiKey) ? new Airtable({ apiKey: apiKey }).base(baseId) : null;

// --- Helper Functions ---

/**
 * Creates a new Order record in Airtable.
 */
export async function createOrder(data: {
    stripeSessionId: string;
    status: 'Pending' | 'Paid';
    guestsCount: number;
    totalAmount?: number; // Optional, strict schema relies on rollup but we can pass it if we add a raw field
}): Promise<string | null> {
    if (!base) return null;

    try {
        const records = await base('Orders').create([
            {
                fields: {
                    "Stripe Session ID": data.stripeSessionId,
                    "Status": data.status,
                    "Guests Count": data.guestsCount,
                    // "Order Date": "2025-..." // Created Time is automatic
                },
            },
        ]);
        return records[0].id;
    } catch (error) {
        console.error("Error creating Airtable Order:", error);
        return null;
    }
}

/**
 * Creates Line Items linked to an Order.
 */
export async function createLineItems(orderId: string, items: {
    title: string;
    quantity: number;
    unitPrice: number;
    metadata?: Record<string, string>;
}[]) {
    if (!base) return;

    // The user's schema has a 'Product' link field. 
    // Since we don't know the Airtable Record IDs for the products (unless we query them first),
    // and we want to avoid blocking checkout on complex lookups, 
    // we will store the Product Name/Title in the 'Metadata' or description for now 
    // OR we assume the user will manually link/we skip the link.
    //
    // The Schema also has: 'Unit Price' (start as number here? Schema says Lookup but usually you need a real field to write to if not linked)
    // Wait, the Schema says "Unit Price" is a LOOKUP. That means it comes from the Product.
    // If we can't link the Product, we can't set the Unit Price via that Lookup.
    // 
    // ADAPTATION: We will dump the "Title", "Unit Price", and specific metadata into the 'Metadata' Long Text field 
    // so data is preserved even if linking fails.

    // We will batch creates (max 10 per request in Airtable)
    const chunks = [];
    for (let i = 0; i < items.length; i += 10) {
        chunks.push(items.slice(i, i + 10));
    }

    for (const chunk of chunks) {
        try {
            const recordsToCreate = chunk.map(item => {
                const metaString = `Product: ${item.title}\nPrice: ${item.unitPrice}\nDetails: ${JSON.stringify(item.metadata || {})}`;

                return {
                    fields: {
                        "Order": [orderId], // Link to the Order we just created
                        "Quantity": item.quantity,
                        "Metadata": metaString,
                        // we cannot write to 'Unit Price' if it is a lookup field.
                        // we cannot write to 'Product' link unless we have the record ID.
                    }
                };
            });

            await base('Order Line Items').create(recordsToCreate);
        } catch (error) {
            console.error("Error creating Airtable Line Items:", error);
        }
    }
}

/**
 * Fetches all news items from Airtable.
 */
export async function getNewsItems(): Promise<NewsItem[]> {
    if (!base) {
        console.error("❌ Cannot fetch news: Airtable base is not initialized.");
        return [];
    }

    try {
        console.log("📡 Fetching records from 'Press Items' table...");
        const records = await base('Press Items').select({
            sort: [{ field: 'Date', direction: 'desc' }]
        }).all();

        console.log(`✅ Successfully fetched ${records.length} records logic-wise.`);

        if (records.length === 0) {
            console.warn("⚠️ 'Press Items' table returned 0 records. Check your table name and data in Airtable.");
        }

        return records.map(record => {
            // Log a sample record fields to help debug naming issues
            // console.log("Field names found in record:", Object.keys(record.fields));

            return {
                id: record.id,
                type: record.get('Type') as string || 'PRESS RELEASE',
                title: record.get('Title') as string || '',
                description: record.get('Description') as string || '',
                date: record.get('Date') as string || '',
                isFeatured: !!record.get('Is Featured'),
                content: record.get('Content') as string || '',
                readMoreUrl: record.get('Read More URL') as string || '#',
            };
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("❌ Airtable API Error:", errorMessage);
        if (errorMessage.includes("not found")) {
            console.error("👉 TIP: Check if your table name is exactly 'Press Items' (including the space).");
        }
        return [];
    }
}
