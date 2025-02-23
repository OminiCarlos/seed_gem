// filepath: /workspaces/seed_gem/testConnection.js
const { testOracleConnection } = require('./appService');

async function verifyConnection() {
    const isConnected = await testOracleConnection();
    if (isConnected) {
        console.log('Successfully connected to Supabase.');
    } else {
        console.log('Failed to connect to Supabase.');
    }
}

verifyConnection();