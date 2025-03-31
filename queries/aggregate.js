const { MongoClient } = require('mongodb');

async function aggregateData() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        const result = await db.collection('traffic_flows').aggregate([
            {
                $group: {
                    _id: null,
                    average_vehicle_count: { $avg: '$vehicle_count' }
                }
            }
        ]).toArray();
        
        console.log('Aggregate result:', result);
    } finally {
        await client.close();
    }
}

aggregateData().catch(console.error);
