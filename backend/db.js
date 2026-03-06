// MOCK DB for Tanmaya
// Used because PostgreSQL was not found on the local system.
// Mimics a subset of the 'pg' Pool interface for basic demo.

class MockPool {
  constructor() {
    this.responses = [];
    this.nextId = 1;
    console.log("Using In-Memory Mock Database (Tanmaya)");
  }

  async query(text, params) {
    // Basic INSERT support
    if (text.startsWith('INSERT INTO survey_responses')) {
      const resp = {
        id: this.nextId++,
        name: params[0],
        email: params[1],
        age_group: params[2],
        gender: params[3],
        shopping_platform: params[4],
        biggest_problem: params[5],
        shopping_frequency: params[6],
        ai_interest: params[7],
        early_customer: params[8],
        created_at: new Date().toISOString()
      };
      this.responses.push(resp);
      return { rows: [resp] };
    }

    // Basic SELECT support
    if (text.startsWith('SELECT * FROM survey_responses')) {
      // Sort by created_at DESC
      const sorted = [...this.responses].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return { rows: sorted };
    }

    return { rows: [] };
  }
}

const pool = new MockPool();

module.exports = pool;
