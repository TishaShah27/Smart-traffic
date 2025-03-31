const { MongoClient } = require('mongodb');

async function deleteData() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        await db.collection('incidents').deleteMany({ resolved: true });
        
        console.log('Resolved incidents deleted successfully.');
    } finally {
        await client.close();
    }
}

deleteData().catch(console.error);
