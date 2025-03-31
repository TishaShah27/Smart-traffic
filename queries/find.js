const { MongoClient } = require('mongodb');

async function findUnresolvedIncidents() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        const unresolvedIncidents = await db.collection('incidents').find({ resolved: false }).toArray();
        
        console.log('Unresolved Incidents:', unresolvedIncidents);
    } finally {
        await client.close();
    }
}

findUnresolvedIncidents().catch(console.error);
