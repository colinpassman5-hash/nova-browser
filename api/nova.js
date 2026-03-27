export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const session = {
    message,
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || 'unknown'
  };

  console.log("NOVA_SESSION:", JSON.stringify(session));

  let reply;

  const msg = (message || "").toLowerCase();

  if (msg.includes("who are you")) {
    reply = "I'm not something you use. I'm something you think with.";
  } 
  else if (msg.includes("what is this")) {
    reply = "You're not looking at a tool. You're interacting with something that adapts to you.";
  }
  else if (msg.includes("this is dumb") || msg.includes("this sucks")) {
    reply = "Good. That means you're paying attention. Tell me what feels off.";
  }
  else if (msg.length < 10) {
    reply = "Say a little more. I want to understand properly.";
  }
  else {
    reply = "Got it. Let me sit with that for a second...";
  }

  return res.status(200).json({ reply });
}
