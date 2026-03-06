require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
});

async function test() {
    console.log('Connecting to:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
    try {
        const client = await pool.connect();
        console.log('✅ Connected to Supabase!');

        // Check if table exists
        const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'survey_responses'
      );
    `);
        const tableExists = tableCheck.rows[0].exists;
        console.log('Table survey_responses exists:', tableExists);

        if (!tableExists) {
            console.log('Creating table...');
            await client.query(`
        CREATE TABLE IF NOT EXISTS survey_responses (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          age_group VARCHAR(50),
          gender VARCHAR(50),
          shopping_platform TEXT[],
          biggest_problem TEXT,
          shopping_frequency VARCHAR(100),
          ai_interest VARCHAR(100),
          early_customer BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
            console.log('✅ Table created!');
        }

        // Test insert
        const insertResult = await client.query(
            `INSERT INTO survey_responses (name, email, age_group, gender, shopping_platform, biggest_problem, shopping_frequency, ai_interest, early_customer)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (email) DO UPDATE SET name=EXCLUDED.name
       RETURNING id, name, email, created_at`,
            ['DB Test User', 'dbtest@trijati.com', '18-24', 'Male', ['Myntra'], 'Size issues', 'Monthly', 'Very interested', true]
        );
        console.log('✅ Insert OK! Row:', insertResult.rows[0]);

        // Count rows
        const count = await client.query('SELECT COUNT(*) FROM survey_responses');
        console.log('Total rows in DB:', count.rows[0].count);

        client.release();
    } catch (err) {
        console.error('❌ DB ERROR:', err.message);
        console.error('Code:', err.code);
    } finally {
        await pool.end();
    }
}

test();
