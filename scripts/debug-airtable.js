

const Airtable = require('airtable');

const baseId = process.env.AIRTABLE_BASE_ID;
const apiKey = process.env.AIRTABLE_API_KEY;

if (!baseId || !apiKey) {
    console.error('Missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY');
    process.exit(1);
}

const base = new Airtable({ apiKey }).base(baseId);

async function checkSchema() {
    try {
        console.log('1. Creating dummy customer...');
        const cust = await base('Customers').create([{ fields: { "Full Name": "Link Test", "Email": "link@test.com" } }]);
        const custId = cust[0].id;
        console.log('   Dummy customer created:', custId);

        console.log('2. Creating Order linked to Customer via "Full Name" field...');
        const record = await base('Orders').create([
            {
                fields: {
                    "Status": "Pending",
                    "Total Amount (USD)": 10,
                    "Guests Count": 1,

                    "Full Name": [custId]
                }
            }
        ]);
        console.log('✅ Successfully created Order record with "Full Name" as LINK:', record[0].id);
        console.log('✅ Fields:', record[0].fields);
    } catch (err) {
        console.error('❌ Error creating Order record:', err);
    }
}

checkSchema();
