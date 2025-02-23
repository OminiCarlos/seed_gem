// filepath: /workspaces/seed_gem/appService.js
const { createClient } = require('@supabase/supabase-js');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Supabase configuration setup. Ensure your .env file has the required Supabase credentials.
const supabaseUrl = envVariables.SUPABASE_URL;
const supabaseKey = envVariables.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Wrapper to manage Supabase actions, simplifying connection handling.
async function withSupabase(action) {
    try {
        return await action(supabase);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Core functions for database operations
async function testSupabaseConnection() {
    return await withSupabase(async (supabase) => {
        const { data, error } = await supabase.from('plant').select('*').limit(1);
        if (error) {
            throw error;
        }
        return true;
    }).catch(() => {
        return false;
    });
}

module.exports = {
    testOracleConnection: testSupabaseConnection, // Alias kept for compatibility
    withOracleDB: withSupabase, // Alias kept for compatibility
    supabase:supabase
};