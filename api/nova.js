export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal, constraints } = req.body;

  if (!goal) {
    return res.status(400).json({ error: 'Goal required' });
  }

  const session = {
    goal,
    constraints,
    timestamp: new Date().toISOString()
  };

  console.log('NOVA SESSION:', session);

  const response = {
    message: `NOVA engaged. Processing goal: ${goal}`,
    next: 'Breaking this into executable steps...'
  };

  return res.status(200).json(response);
}
