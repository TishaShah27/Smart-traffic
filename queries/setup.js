const { MongoClient } = require('mongodb');

async function setupCollections() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        await db.createCollection('intersections');
        await db.createCollection('traffic_lights');
        await db.createCollection('cameras');
        await db.createCollection('traffic_flows');
        await db.createCollection('incidents');
        
        console.log('Collections created successfully.');
    } finally {
        await client.close();
    }
}

setupCollections().catch(console.error);
