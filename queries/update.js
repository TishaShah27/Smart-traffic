const { MongoClient } = require('mongodb');

async function updateData() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        await db.collection('traffic_lights').updateOne(
            { _id: 1 },
            { $set: { state: 'Red', timing: 30 } }
        );
        
        await db.collection('incidents').updateMany(
            { resolved: false },
            { $set: { resolved: true } }
        );
        
        console.log('Data updated successfully.');
    } finally {
        await client.close();
    }
}

updateData().catch(console.error);
