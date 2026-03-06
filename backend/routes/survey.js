const express = require('express');
const router = express.Router();
const pool = require('../db');
const { Parser } = require('json2csv');

// POST /api/survey - submit a survey response
router.post('/', async (req, res) => {
  const {
    name,
    email,
    age_group,
    gender,
    shopping_platform,
    biggest_problem,
    shopping_frequency,
    ai_interest,
    early_customer,
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const result = await pool.query(
    `INSERT INTO survey_responses
      (name, email, age_group, gender, shopping_platform, biggest_problem, shopping_frequency, ai_interest, early_customer)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (email) DO UPDATE SET 
      name = EXCLUDED.name,
      age_group = EXCLUDED.age_group,
      gender = EXCLUDED.gender,
      shopping_platform = EXCLUDED.shopping_platform,
      biggest_problem = EXCLUDED.biggest_problem,
      shopping_frequency = EXCLUDED.shopping_frequency,
      ai_interest = EXCLUDED.ai_interest,
      early_customer = EXCLUDED.early_customer
     RETURNING *`,
    [
      name,
      email,
      age_group || null,
      gender || null,
      shopping_platform || [],
      biggest_problem || null,
      shopping_frequency || null,
      ai_interest || null,
      early_customer === true || early_customer === 'true',
    ]
  );

  res.status(201).json({
    message: early_customer
      ? 'Thank you! You are now registered as an Early Tanmaya Customer. We will notify you when the AI stylist launches.'
      : 'Thank you for your feedback! We will keep you posted.',
    data: result.rows[0],
  });
});

// GET /api/admin/responses - get all responses
router.get('/admin/responses', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM survey_responses ORDER BY created_at DESC'
  );
  res.json(result.rows);
});

// GET /api/admin/export - export as CSV
router.get('/admin/export', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM survey_responses ORDER BY created_at DESC'
  );

  const fields = [
    'id', 'name', 'email', 'age_group', 'gender',
    'shopping_platform', 'biggest_problem', 'shopping_frequency',
    'ai_interest', 'early_customer', 'created_at',
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(result.rows);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="tanmaya_survey_responses.csv"');
  res.send(csv);
});

module.exports = router;
