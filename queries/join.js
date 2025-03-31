const { MongoClient } = require('mongodb');

async function joinData() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        const result = await db.collection('intersections').aggregate([
            {
                $lookup: {
                    from: 'traffic_lights',
                    localField: '_id',
                    foreignField: 'intersection_id',
                    as: 'traffic_light_details'
                }
            },
            {
                $lookup: {
                    from: 'cameras',
                    localField: '_id',
                    foreignField: 'intersection_id',
                    as: 'camera_details'
                }
            }
        ]).toArray();

        console.log('Join results:', result);
    } finally {
        await client.close();
    }
}

joinData().catch(console.error);
