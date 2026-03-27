export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal, constraint, message } = req.body;

  const session = {
    goal: goal || null,
    constraint: constraint || null,
    message: message || null,
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || 'unknown'
  };

  // 🔴 DATA LOGGING (REPLACE WITH DB LATER — CURRENTLY LOGGING TO VERCEL)
  console.log("NOVA_SESSION:", JSON.stringify(session));

  let response;

  if (goal && constraint) {
    response = {
      message: `Understood. You're aiming for "${goal}".`,
      next: `Primary constraint identified: "${constraint}".\n\nStart here:\n1. Remove immediate friction\n2. Create a fast feedback loop\n3. Execute one controlled test today`
    };
  } else {
    response = {
      message: "I'm with you.",
      next: "Tell me more about what you're trying to do."
    };
  }

  return res.status(200).json(response);
}
