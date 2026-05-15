const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "AI Daily Planner API is running 🚀" });
});

// ─── Generate Daily Plan ──────────────────────────────────────────────────────
app.post("/api/generate-plan", async (req, res) => {
  const { name, goals, wakeTime, sleepTime, priorities, mood, availableHours } =
    req.body;

  if (!goals || !priorities) {
    return res.status(400).json({ error: "Goals and priorities are required." });
  }

  const systemPrompt = `You are an expert productivity coach and daily planner AI. 
Your job is to create highly personalized, realistic, and motivating daily schedules.
Always respond with a valid JSON object only — no markdown, no explanation outside JSON.`;

  const userPrompt = `Create a detailed daily plan for ${name || "the user"}.

User Details:
- Wake Time: ${wakeTime || "7:00 AM"}
- Sleep Time: ${sleepTime || "11:00 PM"}
- Available Hours for Work/Tasks: ${availableHours || "8"} hours
- Current Mood/Energy: ${mood || "Neutral"}
- Main Goals for Today: ${goals}
- Top Priorities: ${priorities}

Respond ONLY with this exact JSON structure:
{
  "greeting": "A warm personalized greeting for the user",
  "motivationalQuote": "An inspiring quote relevant to their goals",
  "dayTheme": "A single theme/focus word for the day (e.g. Focus, Growth, Balance)",
  "schedule": [
    {
      "time": "7:00 AM",
      "duration": "30 min",
      "activity": "Activity name",
      "category": "one of: Morning Routine, Deep Work, Break, Exercise, Meals, Learning, Admin, Evening Wind-down",
      "tip": "A short actionable tip for this block",
      "priority": "one of: High, Medium, Low"
    }
  ],
  "topThreeTasks": ["Task 1", "Task 2", "Task 3"],
  "wellnessTips": ["Tip 1", "Tip 2", "Tip 3"],
  "eveningReflection": ["Reflection question 1", "Reflection question 2", "Reflection question 3"],
  "productivityScore": "A predicted productivity score out of 10 based on the plan",
  "summary": "A 2-3 sentence motivational summary of the day plan"
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const rawContent = completion.choices[0]?.message?.content || "";

    // Strip any markdown fences if present
    const cleaned = rawContent
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const plan = JSON.parse(cleaned);
    res.json({ success: true, plan });
  } catch (error) {
    console.error("Groq API Error:", error.message);
    if (error instanceof SyntaxError) {
      return res
        .status(500)
        .json({ error: "Failed to parse AI response. Please try again." });
    }
    res.status(500).json({ error: "Failed to generate plan. Please try again." });
  }
});

// ─── Chat with AI Coach ───────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { message, conversationHistory, currentPlan } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemPrompt = `You are an encouraging AI productivity coach integrated into a Daily Planner app. 
You help users stay on track, adjust their plans, and stay motivated throughout the day.
${currentPlan ? `The user's current plan summary: ${currentPlan}` : ""}
Keep responses concise (2-4 sentences), actionable, and warm.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...(conversationHistory || []),
    { role: "user", content: message },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: 0.8,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "";
    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chat Error:", error.message);
    res.status(500).json({ error: "Chat failed. Please try again." });
  }
});

// ─── Adjust Plan ──────────────────────────────────────────────────────────────
app.post("/api/adjust-plan", async (req, res) => {
  const { originalPlan, adjustment } = req.body;

  if (!originalPlan || !adjustment) {
    return res.status(400).json({ error: "Original plan and adjustment details required." });
  }

  const prompt = `Given this daily schedule: ${JSON.stringify(originalPlan.schedule)}
  
The user wants to make this adjustment: "${adjustment}"

Return ONLY a JSON object with the updated "schedule" array using the same structure as the original. No explanation outside JSON.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are a scheduling assistant. Return only valid JSON, no markdown.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });

    const rawContent = completion.choices[0]?.message?.content || "";
    const cleaned = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleaned);
    res.json({ success: true, updatedSchedule: result.schedule });
  } catch (error) {
    console.error("Adjust Plan Error:", error.message);
    res.status(500).json({ error: "Failed to adjust plan." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
