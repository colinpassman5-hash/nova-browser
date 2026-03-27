export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const message = String(body.message || "").trim();
  const sessionId = String(body.sessionId || "unknown");
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
    return res.status(400).json({ error: "Message required" });
  }

  const lower = message.toLowerCase();

  const asksIdentity =
    lower.includes("who are you") ||
    lower.includes("what are you") ||
    lower.includes("what is this") ||
    lower.includes("what is nova");

  const frustration =
    /(fuck|fucking|shit|bullshit|stupid|dumb|garbage|hate|retarded|idiot)/i.test(lower);

  const uncertainty =
    /(confused|unclear|lost|don't know|dont know|not sure|overwhelmed|messy|scattered)/i.test(lower);

  const ambition =
    /(build|create|launch|grow|scale|system|company|business|future|vision|extraordinary|big)/i.test(lower);

  const greeting =
    /^(hi|hello|hey|yo|sup|what's up|whats up)\b/i.test(lower);

  const shortInput = message.length < 20;

  let reply = "";
  let uiTitle = "Engaged.";
  let uiSub = "Nova is holding the thread and moving with you.";
  let mode = "Operator";
  let flow = "Responsive";
  let headerTitle = "Nova engaged";
  let headerSub = "Tracking your direction.";

  if (asksIdentity) {
    reply =
`I’m Nova.

This is a live intelligence surface designed to think with you, not force you into a rigid workflow.

You can arrive messy, ambitious, uncertain, clear, frustrated, or exploratory. Nova’s job is to receive that honestly, reduce friction, and move the thinking forward without making you perform first.`;

    uiTitle = "Clarity.";
    uiSub = "Identity anchored. The system is now oriented around understanding and guidance.";
    mode = "Companion";
    flow = "Orienting";
    headerTitle = "Identity established";
    headerSub = "The surface is now aligned.";
  } else if (frustration) {
    reply =
`Good. Keep it honest.

The signal is clear: something about this is off for you. I’d rather have the real reaction than polite noise.

Tell me the exact failure in one sentence — design, intelligence, clarity, pacing, or trust — and I’ll correct that layer directly.`;

    uiTitle = "Pressure received.";
    uiSub = "Nova is not recoiling from force. It is using it as signal.";
    mode = "Correction";
    flow = "Recalibrating";
    headerTitle = "Signal received";
    headerSub = "Correcting against real friction.";
  } else if (uncertainty) {
    reply =
`Good. That gives us something real to work with.

Do not waste energy trying to sound organized. Give me the raw version:
what are you trying to do, and what feels unstable about it?`;

    uiTitle = "Stabilizing.";
    uiSub = "The system is reducing ambiguity and preparing to structure the thought.";
    mode = "Companion";
    flow = "Stabilizing";
    headerTitle = "Clarity mode";
    headerSub = "Reducing noise before action.";
  } else if (greeting) {
    reply =
`Hey.

You can come in lightly or go straight to the core. Either is fine.

If you want the cleanest start, tell me what you're trying to move, build, understand, or fix right now.`;

    uiTitle = "Open.";
    uiSub = "No pressure. Nova is ready to receive the first true signal.";
    mode = "Companion";
    flow = "Welcoming";
    headerTitle = "Nova is with you";
    headerSub = "Start naturally.";
  } else if (ambition) {
    reply =
`I can work with that.

We do this cleanly:
1. define the actual target,
2. identify the dominant friction,
3. reduce it to the next controlled move.

Start with the sharpest version of the objective. One paragraph. No polishing.`;

    uiTitle = "Locked in.";
    uiSub = "The system has detected ambition and is shifting toward structured execution.";
    mode = "Operator";
    flow = "Locking target";
    headerTitle = "Execution forming";
    headerSub = "Target definition in progress.";
  } else if (shortInput) {
    reply =
`I’m with you, but that’s still below signal.

Give me a little more than that — enough for me to feel the shape of what’s actually happening.`;

    uiTitle = "Below signal.";
    uiSub = "Nova needs a slightly stronger thread to lock onto.";
    mode = "Companion";
    flow = "Listening deeper";
    headerTitle = "Need more signal";
    headerSub = "Send one layer deeper.";
  } else {
    reply =
`Understood.

I’m tracking the shape of what you’re saying.

Now push one level deeper: what is the real pressure point inside this — the thing that makes it matter, stall, or demand change right now?`;

    uiTitle = "Tracking.";
    uiSub = "Nova has the thread and is pulling for the true pressure point.";
    mode = "Operator";
    flow = "Deepening";
    headerTitle = "Context acquired";
    headerSub = "Driving toward the real constraint.";
  }

  return res.status(200).json({
    reply,
    uiTitle,
    uiSub,
    mode,
    flow,
    headerTitle,
    headerSub
  });
}
