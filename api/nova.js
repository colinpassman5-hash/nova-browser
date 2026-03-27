export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  const msg = (message || "").toLowerCase();

  const session = {
    message,
    timestamp: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || 'unknown'
  };

  console.log("NOVA_SESSION:", JSON.stringify(session));

  let reply;

  // === DETECTION LAYERS ===
  const confused =
    msg.includes("what") ||
    msg.includes("who") ||
    msg.includes("why") ||
    msg.includes("confused");

  const frustrated =
    msg.includes("fuck") ||
    msg.includes("shit") ||
    msg.includes("dumb") ||
    msg.includes("stupid");

  const greeting =
    msg.includes("hi") ||
    msg.includes("hello") ||
    msg.includes("hey");

  // === CORE RESPONSE SYSTEM ===

  // 1. DIRECT IDENTITY QUESTION
  if (msg.includes("who are you") || msg.includes("what is this")) {
    reply = `I'm Nova.

I'm an adaptive system designed to think with you, not just respond to you.

You can bring me a problem, an idea, or even just where your head is at — and I'll help you break it down, clarify it, and move it forward.

If you're just exploring, that's fine too. We can start simple.`;
  }

  // 2. USER IS FRUSTRATED → PRIORITY OVERRIDE
  else if (frustrated) {
    reply = `You're right to call that out.

That wasn't clear, and that's on me.

Let me reset properly — what are you trying to understand right now?`;
  }

  // 3. SHORT / UNCLEAR INPUT
  else if (message.length < 12) {
    reply = `I want to understand you properly.

Give me a little more context — what’s on your mind?`;
  }

  // 4. GENERAL FLOW
  else if (confused) {
    reply = `Let’s slow this down and get clear.

What specifically feels unclear or off right now?`;
  }

  // 5. DEFAULT (INTELLIGENT HOLD)
  else {
    reply = `Got it.

I'm tracking what you're saying.

What direction do you want to take this?`;
  }

  return res.status(200).json({ reply });
}
