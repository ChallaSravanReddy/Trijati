const { Pool } = require('pg');

// Supabase PostgreSQL connection pool
// Supabase requires SSL - do NOT disable this in production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase hosted PostgreSQL
  },
});

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Failed to connect to Supabase PostgreSQL:', err.message);
    console.error('👉 Check your DATABASE_URL in the .env file.');
  } else {
    console.log('✅ Connected to Supabase PostgreSQL successfully!');
    release();
  }
});

module.exports = pool;
