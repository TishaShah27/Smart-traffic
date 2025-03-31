const { MongoClient } = require('mongodb');
const intersectionsData = require('../data/intersections.json');
const trafficLightsData = require('../data/traffic_lights.json');
const camerasData = require('../data/cameras.json');
const trafficFlowsData = require('../data/traffic_flows.json');
const incidentsData = require('../data/incidents.json');

async function insertData() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('traffic_db');

        // Clear existing data to avoid duplicates
        await db.collection('intersections').deleteMany({});
        await db.collection('traffic_lights').deleteMany({});
        await db.collection('cameras').deleteMany({});
        await db.collection('traffic_flows').deleteMany({});
        await db.collection('incidents').deleteMany({});

        // Insert new data
        await db.collection('intersections').insertMany(intersectionsData);
        await db.collection('traffic_lights').insertMany(trafficLightsData);
        await db.collection('cameras').insertMany(camerasData);
        await db.collection('traffic_flows').insertMany(trafficFlowsData);
        await db.collection('incidents').insertMany(incidentsData);

        console.log('Data inserted successfully.');
    } finally {
        await client.close();
    }
}

insertData().catch(console.error);
