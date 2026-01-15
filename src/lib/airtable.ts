import Airtable from 'airtable';

export interface Product {
    id?: string;
    product_id: string;
    name: string;
    description?: string;
    unit_price: number;
    type: 'Accommodation' | 'Safari' | 'Add-on' | 'Flight';
    status: 'Active' | 'Archived';
}

export interface Order {
    id?: string;
    stripe_session_id?: string;
    customer_id?: string;
    order_date?: string;
    status: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
    guests_count: number;
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
    id?: string;
    order_id: string;
    product_id?: string;
    quantity: number;
    unit_price: number;
    metadata?: string;
}

const baseId = process.env.AIRTABLE_BASE_ID;
const apiKey = process.env.AIRTABLE_API_KEY;

if (!baseId || !apiKey) {
    console.warn("❌ Airtable not configured: Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY in environment variables.");
} else {
    console.log("✅ Airtable configuration found. Initializing base...");
}

const base = (baseId && apiKey) ? new Airtable({ apiKey: apiKey }).base(baseId) : null;

export async function findOrCreateCustomer(data: {
    email?: string;
    fullName?: string;
    phone?: string;
}): Promise<string | null> {
    const email = (data.email || '').trim().toLowerCase();
    const fullName = (data.fullName || '').trim();
    const phone = (data.phone || '').trim();



    if (!base) {
        console.error('❌ Airtable base not configured');
        return null;
    }

    const esc = (s: string) => s.replace(/'/g, "\\'");

    try {
        const clauses: string[] = [];
        if (email && email !== 'n/a') clauses.push(`{Email} = '${esc(email)}'`);
        if (phone && phone !== 'n/a') clauses.push(`{Phone} = '${esc(phone)}'`);

        if (clauses.length > 0) {
            const selectOpts: Airtable.SelectOptions<Airtable.FieldSet> = {
                maxRecords: 1,
                filterByFormula: clauses.length === 1 ? clauses[0] : `OR(${clauses.join(',')})`
            };
            const records = await base('Customers').select(selectOpts).firstPage();

            if (records.length > 0) {
                const existing = records[0];


                const updateFields: Airtable.FieldSet = {};
                if (fullName && !existing.fields['Full Name']) updateFields['Full Name'] = fullName;
                if (email && !existing.fields['Email']) updateFields['Email'] = email;
                if (phone && !existing.fields['Phone']) updateFields['Phone'] = phone;

                if (Object.keys(updateFields).length > 0) {

                    await base('Customers').update(existing.id, updateFields);
                }
                return existing.id;
            }
        }



        const fields: Airtable.FieldSet = {};
        fields['Full Name'] = fullName || 'Guest Customer';
        if (email) fields['Email'] = email;
        if (phone) fields['Phone'] = phone;


        const newRecords = await base('Customers').create([{ fields }]);

        return newRecords[0].id;
    } catch (error) {
        console.error('❌ Error in findOrCreateCustomer:', error);
        return null;
    }
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryCreateWithRetries(tableName: string, records: { fields: Airtable.FieldSet }[], maxRetries = 3) {
    if (!base) throw new Error('Airtable base not configured');
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await base(tableName).create(records);
        } catch (err: unknown) {
            attempt++;
            const airtableErr = err as { code?: string; errno?: string; type?: string; statusCode?: number; message?: string; response?: { data?: unknown } };
            const code = airtableErr?.code || airtableErr?.errno || airtableErr?.type;
            console.error(`Airtable create error (attempt ${attempt}):`, code, airtableErr?.response?.data || airtableErr?.message || airtableErr);
            if (attempt >= maxRetries) throw err;
            const retryable = code === 'ETIMEDOUT' || (airtableErr?.statusCode && airtableErr.statusCode >= 500) || /timeout/i.test(airtableErr?.message || '');
            if (!retryable) throw err;
            await delay(500 * attempt);
        }
    }
    throw new Error('Unreachable retry loop exit');
}

export async function createOrder(data: {
    stripeSessionId: string;
    status: 'Pending' | 'Paid';
    guestsCount: number;
    totalAmount?: number;
    orderDate?: string;
    customerId?: string;
    customerEmail?: string;
    customerFullName?: string;
}): Promise<string | null> {


    if (!base) return null;

    let customerRecordId = data.customerId || null;
    if (!customerRecordId && (data.customerEmail || data.customerFullName)) {
        customerRecordId = await findOrCreateCustomer({
            email: data.customerEmail,
            fullName: data.customerFullName,
        });
    }

    const fields: Airtable.FieldSet = {
        "Stripe Session ID": data.stripeSessionId,
        "Status": data.status,
        "Guests Count": data.guestsCount || 1,
        "Order Date": data.orderDate || new Date().toISOString().slice(0, 10),
        "Total Amount (USD)": data.totalAmount || 0
    };

    if (customerRecordId || data.customerFullName) {
        fields["Full Name"] = data.customerFullName || "Guest";
    }

    try {
        const createdRecords = await tryCreateWithRetries('Orders', [{ fields }]);
        return createdRecords[0].id;
    } catch (err) {
        console.error("❌ Error creating Airtable Order:", err);
        return null;
    }
}

export async function updateOrderByStripeSession(sessionId: string, data: {
    status?: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
    totalAmount?: number;
    customerId?: string;
    stripePaymentIntentId?: string;
}): Promise<{ id: string } | null> {
    if (!base) return null;

    try {
        const records = await base('Orders').select({
            filterByFormula: `{Stripe Session ID} = '${sessionId}'`,
            maxRecords: 1,
        }).firstPage();

        if (records.length === 0) {
            console.error(`Order with Stripe Session ID ${sessionId} not found`);
            return null;
        }

        const recordId = records[0].id;
        const updateFields: Airtable.FieldSet = {};

        if (data.status) updateFields["Status"] = data.status;
        if (data.customerId) updateFields["Full Name"] = [data.customerId];
        if (data.totalAmount) updateFields["Total Amount (USD)"] = data.totalAmount;



        console.log('🔵 Updating order', recordId, 'with fields:', JSON.stringify(updateFields));
        await base('Orders').update(recordId, updateFields);
        return { id: recordId };
    } catch (error) {
        console.error("Error updating Airtable Order:", error);
        return null;
    }
}



export async function createLineItems(orderId: string, items: {
    id: string;
    title: string;
    quantity: number;
    unitPrice: number;
    metadata?: Record<string, string>;
}[]) {
    if (!base) return;


    const chunks: typeof items[] = [];
    for (let i = 0; i < items.length; i += 10) chunks.push(items.slice(i, i + 10));

    for (const chunk of chunks) {
        const recordsToCreate = chunk.map(item => ({
            fields: {
                "Order": orderId,
                "Name": `${item.title} (x${item.quantity})`,
                "Product": item.title,
                "Quantity": item.quantity,
                "Unit Price (USD)": item.unitPrice,
                "Metadata": JSON.stringify(item.metadata || {}),
                "Status": "Active"
            }
        }));

        try {
            await tryCreateWithRetries('Order Line Items', recordsToCreate);
        } catch (err: unknown) {
            const airtableErr = err as { response?: { data?: unknown }; message?: string };
            console.error("❌ Error creating Airtable Line Items:", airtableErr?.response?.data || airtableErr?.message || err);
        }
    }
}

export async function createCustomerFromStatement(statement: {
    fullName?: string;
    email?: string;
    phone?: string;
}): Promise<string | null> {
    if (!statement.fullName && !statement.email) {
        console.error('createCustomerFromStatement: missing name/email');
        return null;
    }
    const fullName = (statement.fullName || '').trim();
    const email = (statement.email || '').trim().toLowerCase();
    const phone = statement.phone?.trim();

    console.log('🔵 createCustomerFromStatement:', { fullName, email, phone });
    return await findOrCreateCustomer({ fullName, email, phone });
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
>>>>>>> dev
}
