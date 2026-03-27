export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal, constraint, message } = req.body;

  // 🔒 SESSION OBJECT (TRACK EVERYTHING)
  const session = {
    goal: goal || null,
    constraint: constraint || null,
    message: message || null,
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown'
  };

  // 🧠 LOG EVERYTHING (VISIBLE IN VERCEL LOGS)
  console.log("🧠 NOVA SESSION:", JSON.stringify(session));

  let response;

  // 🔥 CORE NOVA LOGIC
  if (!goal && !message) {
    response = {
      message: "Hey... I'm here.",
      next: "You can talk to me, or just explore. What’s on your mind?"
    };
  } 
  
  else if (goal && !constraint) {
    response = {
      message: `I see where you're going — "${goal}"`,
      next: "What's the one thing that could slow you down?"
    };
  } 
  
  else if (goal && constraint) {
    response = {
      message: `Good. You're aiming for "${goal}".`,
      next: `Constraint locked: "${constraint}"

Here’s your move:
1. Eliminate immediate friction
2. Reduce scope to one controllable action
3. Execute within 24 hours

Stay focused.`
    };
  } 
  
  else if (message) {
    response = {
      message: "I'm listening.",
      next: message
    };
  } 
  
  else {
    response = {
      message: "I'm with you.",
      next: "Tell me more."
    };
  }

  return res.status(200).json(response);
}
