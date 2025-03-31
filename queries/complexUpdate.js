const { MongoClient } = require('mongodb');

async function incrementVehicleCount(intersectionId, incrementBy) {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        await db.collection('traffic_flows').updateOne(
            { intersection_id: intersectionId },
            { $inc: { vehicle_count: incrementBy } }
        );

        console.log(`Vehicle count incremented by ${incrementBy} for intersection ${intersectionId}.`);
    } finally {
        await client.close();
    }
}

incrementVehicleCount(1, 50).catch(console.error);
