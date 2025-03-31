const { MongoClient } = require('mongodb');

async function updateAllYellowToRed() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        const result = await db.collection('traffic_lights').updateMany(
            { state: 'Yellow' },
            { $set: { state: 'Red' } }
        );

        console.log(`${result.modifiedCount} traffic lights updated from Yellow to Red.`);
    } finally {
        await client.close();
    }
}

updateAllYellowToRed().catch(console.error);
