require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const Groq = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    const allowed = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
      : [];
    
    if (allowed.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, allow all
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests explicitly
app.options("*", cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Too many requests. Please try again later." },
});
app.use("/api/", limiter);

// ── Groq client ───────────────────────────────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Helper ────────────────────────────────────────────────────────────────────
function buildPrompt(data) {
  const {
    name, date, wakeTime, sleepTime, goals, tasks,
    priorities, workStyle, breaks, meals, exercise, notes,
  } = data;

  return `You are an expert productivity coach and daily planner. Generate a highly detailed, personalized daily schedule.

USER PROFILE:
- Name: ${name || "User"}
- Date: ${date}
- Wake Up Time: ${wakeTime}
- Sleep Time: ${sleepTime}
- Work Style: ${workStyle || "Balanced"}
- Break Preference: ${breaks || "Regular short breaks"}

GOALS FOR TODAY:
${goals || "General productivity"}

TASKS TO COMPLETE:
${tasks || "No specific tasks listed"}

PRIORITIES (High → Low):
${priorities || "Not specified"}

MEALS PLANNED:
${meals || "Standard 3 meals"}

EXERCISE:
${exercise || "None planned"}

ADDITIONAL NOTES:
${notes || "None"}

Generate a complete daily schedule in the following JSON format ONLY (no markdown, no extra text, no code fences):
{
  "greeting": "Personalized motivational greeting",
  "summary": "2-3 sentence overview of the day plan",
  "schedule": [
    {
      "time": "HH:MM AM/PM",
      "endTime": "HH:MM AM/PM",
      "title": "Activity title",
      "description": "Brief description",
      "category": "morning-routine|work|break|meal|exercise|personal|wind-down",
      "priority": "high|medium|low",
      "tips": "Productivity tip for this block"
    }
  ],
  "focusTip": "Main productivity insight for the day",
  "motivationalQuote": "Relevant motivational quote",
  "dailyStats": {
    "workHours": 0,
    "breakTime": 0,
    "personalTime": 0,
    "totalScheduled": 0
  }
}`;
}

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/generate-plan", async (req, res) => {
  try {
    const { userData } = req.body;
    if (!userData) {
      return res.status(400).json({ error: "userData is required" });
    }

    const prompt = buildPrompt(userData);

    const message = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.choices[0].message.content.trim();

    // Strip markdown fences if present
    const jsonText = rawText
      .replace(/^```json\n?/, "")
      .replace(/^```\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const plan = JSON.parse(jsonText);
    res.json({ success: true, plan });

  } catch (err) {
    console.error("Error generating plan:", err);
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

app.post("/api/regenerate-slot", async (req, res) => {
  try {
    const { slot, context } = req.body;
    if (!slot) return res.status(400).json({ error: "slot is required" });

    const prompt = `You are a productivity coach. Regenerate ONLY this single schedule slot with a better activity suggestion.

Current slot: ${JSON.stringify(slot)}
Day context: ${context || "General workday"}

Return ONLY valid JSON for ONE slot, no markdown, no code fences, no extra text:
{
  "time": "${slot.time}",
  "endTime": "${slot.endTime}",
  "title": "New activity title",
  "description": "Brief description",
  "category": "${slot.category}",
  "priority": "${slot.priority}",
  "tips": "Productivity tip"
}`;

    const message = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.choices[0].message.content.trim();
    const jsonText = rawText
      .replace(/^```json\n?/, "")
      .replace(/^```\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const newSlot = JSON.parse(jsonText);
    res.json({ success: true, slot: newSlot });

  } catch (err) {
    console.error("Regenerate slot error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 AI Daily Planner API running on port ${PORT}`);
});
