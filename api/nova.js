export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const sessionId = String(body.sessionId || "unknown");
  const message = String(body.message || "").trim();
  const history = Array.isArray(body.history) ? body.history : [];

  const telemetry = {
    sessionId,
    message,
    historyDepth: history.length,
    timestamp: new Date().toISOString(),
    ip: req.headers["x-forwarded-for"] || "unknown",
    userAgent: req.headers["user-agent"] || "unknown",
    referer: req.headers["referer"] || "unknown"
  };

  console.log("NOVA_SESSION", JSON.stringify(telemetry));

  if (!message) {
    return res.status(200).json({
      reply: "I’m here. Start anywhere you like.",
      headerSub: "Soft entry. Real conversation."
    });
  }

  const lower = message.toLowerCase();

  const asksIdentity =
    lower.includes("who are you") ||
    lower.includes("what are you") ||
    lower.includes("what is this") ||
    lower.includes("what is nova");

  const frustration =
    /(fuck|fucking|shit|bullshit|dumb|stupid|garbage|hate|retarded|insane|broken)/i.test(lower);

  const uncertainty =
    /(confused|unclear|lost|not sure|don't know|dont know|overwhelmed|messy|tangled|scattered)/i.test(lower);

  const groundedBuild =
    /(build|product|system|engineering|physics|real world|stress test|solid|ship|launch|architecture)/i.test(lower);

  const greeting =
    /^(hi|hello|hey|yo|sup|good morning|good evening)\b/i.test(lower);

  const shortInput = message.length < 18;

  let reply = "";
  let headerSub = "Still with you.";

  if (asksIdentity) {
    reply =
`I’m Nova.

Not a cold form. Not a dead script.

This is a place where you can bring raw thought, half-built ideas, pressure, ambition, or confusion without having to clean yourself up first.

We take what is true, reduce friction, and move it toward something real.`;
    headerSub = "Identity anchored.";
  } else if (frustration) {
    reply =
`Fair.

If it feels broken, say it straight. I’d rather get the honest signal than a polite lie.

Give me the exact failure in plain language, and I’ll work that layer directly.`;
    headerSub = "Receiving honest signal.";
  } else if (uncertainty) {
    reply =
`That’s a good place to start.

Don’t force clarity before it arrives.

Tell me the messy version: what are you trying to do, and what part of it feels unstable or hard to trust?`;
    headerSub = "Holding uncertainty without forcing it.";
  } else if (groundedBuild) {
    reply =
`Yes.

We can build real systems here in the sense that we can design them, pressure-test the logic, harden the interaction, and move them toward actual engineering discipline instead of fantasy.

The honest limit is this: ideas become truly stress-tested when they meet real users, real environments, and repeated failure loops.

If you want, bring me the system exactly as it is, and we’ll identify what has to be made rigorous first.`;
    headerSub = "Grounding ambition in reality.";
  } else if (greeting) {
    reply =
`Hey.

No ceremony needed.

What’s been sitting on your mind lately?`;
    headerSub = "Warm entry.";
  } else if (shortInput) {
    reply =
`Stay with it a second longer.

Give me just a little more than that — enough for me to feel the shape of what’s real for you right now.`;
    headerSub = "Pulling for more signal.";
  } else {
    reply =
`I’m with you.

Now go one layer deeper: what is the real pressure point inside this for you — the thing that makes it matter, stall, or demand action right now?`;
    headerSub = "Going deeper, gently.";
  }

  return res.status(200).json({
    reply,
    headerSub
  });
}
