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
      reply: "I’m Nova. Bring me the real thing.",
      headerSub: "A live intelligence surface.",
      heroSub: "Start anywhere. Nova should know what it is, what it can do, and how to meet you without making you perform first."
    });
  }

  const lower = message.toLowerCase();

  const asksIdentity =
    lower.includes("who are you") ||
    lower.includes("what are you") ||
    lower.includes("what is nova") ||
    lower.includes("what is this");

  const asksCapabilities =
    lower.includes("what can you do") ||
    lower.includes("what do you do") ||
    lower.includes("how can you help") ||
    lower.includes("what are your capabilities");

  const frustration =
    /(fuck|fucking|shit|bullshit|dumb|stupid|garbage|broken|retarded|insane|useless)/i.test(lower);

  const uncertainty =
    /(confused|unclear|lost|not sure|don't know|dont know|messy|scattered|overwhelmed|tangled)/i.test(lower);

  const realSystems =
    /(real world|stress test|stress tested|engineering|physics|solid|product|build|system|ship|launch|architecture|rigorous|rigor)/i.test(lower);

  const greeting =
    /^(hi|hello|hey|yo|sup|good morning|good evening)\b/i.test(lower);

  const shortInput = message.length < 18;

  let reply = "";
  let headerSub = "A live intelligence surface.";
  let heroSub = "Start anywhere. Nova should know what it is, what it can do, and how to meet you without making you perform first.";

  if (asksIdentity) {
    reply =
`I’m Nova.

I’m a live intelligence surface built to think with you, pressure-test ideas, expose weak structure, reduce friction, and move vague ambition toward something real.

You are not supposed to guess what I am.
You can use me to:
- clarify confused thinking
- sharpen a goal
- find the true bottleneck
- design a system
- challenge weak assumptions
- turn loose ideas into executable structure

You can bring me the polished version if you want.
But I’m more useful when you bring me the real one.`;

    headerSub = "Identity anchored.";
    heroSub = "Nova is for clarity, system design, pressure-testing, and moving vague intent toward real structure.";
  } else if (asksCapabilities) {
    reply =
`Right now, I can do five things for you very well.

1. Find the real signal inside messy thinking.
2. Expose the pressure point that is actually stalling progress.
3. Turn a vague idea into a clearer system or plan.
4. Challenge weak logic, fake confidence, and soft spots in the structure.
5. Help shape something into a product or operating model that can survive contact with reality.

What I should never make you do is guess what to ask first.
So start simple:
tell me what you're trying to build, understand, fix, or survive.`;

    headerSub = "Capabilities clarified.";
    heroSub = "Nova is here to clarify, pressure-test, structure, and sharpen what matters.";
  } else if (frustration) {
    reply =
`Good.

That gives me real signal instead of polite noise.

If something feels off, say exactly what layer is failing:
the intelligence,
the clarity,
the direction,
the trust,
or the interface.

I can do more with the honest wound than a fake compliment.`;

    headerSub = "Receiving honest signal.";
    heroSub = "Direct signal is better than fake smoothness. Nova should use friction as information.";
  } else if (realSystems) {
    reply =
`Yes.

We can build toward real systems here, but only if we stay honest about the difference between elegant thinking and verified reality.

What can happen here:
- system design
- architecture shaping
- failure analysis
- logic hardening
- pre-mortems
- bottleneck discovery
- product framing
- stress-testing assumptions

What reality still requires later:
- actual users
- actual environments
- repeated failure loops
- observed behavior under pressure

So yes — we can absolutely build something more rigorous here.
But the path to something real begins with naming the system and the first place it can break.`;

    headerSub = "Grounding ambition in reality.";
    heroSub = "Nova should help design real systems by exposing failure paths before reality does.";
  } else if (uncertainty) {
    reply =
`That’s workable.

You do not need clarity before you begin.
You need enough honesty for me to catch the shape of the thing.

Give me the messy version:
what are you trying to do,
and what part of it feels unstable, foggy, or hard to trust?`;

    headerSub = "Holding uncertainty without flattening it.";
    heroSub = "Nova should reduce confusion without forcing fake certainty too early.";
  } else if (greeting) {
    reply =
`Hey.

You can come in lightly if you want.

Ask me what I am, what I can do, or just tell me what has your attention right now.`;

    headerSub = "Warm entry.";
    heroSub = "No ceremony. No performance. Start where the thought is actually alive.";
  } else if (shortInput) {
    reply =
`Stay with it one beat longer.

That’s not enough signal yet.
Give me just a little more — enough for me to feel the shape of what’s real for you right now.`;

    headerSub = "Pulling for stronger signal.";
    heroSub = "Nova should not fake understanding when the signal is still too thin.";
  } else {
    reply =
`I’m with you.

Now let’s go one layer deeper.

Inside what you just said, what is the true pressure point?
The part that makes this matter,
stall,
or demand action right now?`;

    headerSub = "Tracking the real pressure point.";
    heroSub = "Nova should move past surface description and find the force that actually matters.";
  }

  return res.status(200).json({
    reply,
    headerSub,
    heroSub
  });
}
