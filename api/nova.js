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

  if (!message) {
    return res.status(200).json({
      reply: "I'm here. Start wherever your head is at."
    });
  }

  const msg = message.toLowerCase();

  let reply;

  // 🔥 TRUE CORE — DIRECT + INTELLIGENT

  if (msg.includes("who are you") || msg.includes("what is this")) {
    reply = `I'm Nova.

You're not using a tool right now.

You're interacting with a system designed to think with you in real time.

You don't need perfect input. You don't need structure.

You just need to be honest about what you're trying to do or what's stuck.

Start there.`;
  }

  else if (msg.includes("confused") || msg.includes("lost")) {
    reply = `Good.

That means you're actually paying attention instead of pretending clarity.

Tell me what feels off — not what sounds smart.`;
  }

  else if (
    msg.includes("fuck") ||
    msg.includes("shit") ||
    msg.includes("dumb")
  ) {
    reply = `You're right to react like that.

That means something isn't landing.

Tell me exactly what feels wrong — the UI, the response, or the direction.`;
  }

  else if (msg.length < 12) {
    reply = `Give me a little more.

Not polished — just enough so I can actually see what you're dealing with.`;
  }

  else {
    reply = `I see what you're pointing at.

Now go one layer deeper — what's the part of this that's actually blocking you or matters most?`;
  }

  return res.status(200).json({ reply });
}
