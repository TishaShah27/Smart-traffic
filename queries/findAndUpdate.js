const { MongoClient } = require('mongodb');

async function findAndUpdateCamera(model, newStatus) {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        const result = await db.collection('cameras').findOneAndUpdate(
            { model: model },
            { $set: { status: newStatus } },
            { returnOriginal: false }
        );

        console.log('Updated Camera:', result.value);
    } finally {
        await client.close();
    }
}

findAndUpdateCamera('CamY200', 'Active').catch(console.error);
