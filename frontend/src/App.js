import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Sun, Moon, Zap, Target, MessageCircle, Send, RefreshCw,
  Clock, CheckCircle, Flame, Star, Brain, Coffee, Dumbbell,
  BookOpen, Settings, ChevronDown, ChevronUp, Sparkles,
  Calendar, TrendingUp, Heart, X, Menu, Download
} from "lucide-react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "";

const CATEGORY_ICONS = {
  "Morning Routine": <Coffee size={14} />,
  "Deep Work": <Brain size={14} />,
  "Break": <Heart size={14} />,
  "Exercise": <Dumbbell size={14} />,
  "Meals": <Coffee size={14} />,
  "Learning": <BookOpen size={14} />,
  "Admin": <Settings size={14} />,
  "Evening Wind-down": <Moon size={14} />,
};

const CATEGORY_COLORS = {
  "Morning Routine": "#fbbf24",
  "Deep Work": "#818cf8",
  "Break": "#34d399",
  "Exercise": "#f87171",
  "Meals": "#fb923c",
  "Learning": "#38bdf8",
  "Admin": "#a78bfa",
  "Evening Wind-down": "#6ee7b7",
};

const MOODS = [
  { label: "Energized", emoji: "⚡", value: "High energy and motivated" },
  { label: "Focused", emoji: "🎯", value: "Calm and focused" },
  { label: "Neutral", emoji: "😐", value: "Neutral, average energy" },
  { label: "Tired", emoji: "😴", value: "Low energy, need gentle pacing" },
  { label: "Anxious", emoji: "😰", value: "Anxious, need structured breaks" },
  { label: "Creative", emoji: "🎨", value: "Creative and inspired" },
];

// ─── InputForm Component ────────────────────────────────────────────────────
function InputForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    name: "",
    goals: "",
    priorities: "",
    wakeTime: "07:00",
    sleepTime: "23:00",
    availableHours: "8",
    mood: "Neutral, average energy",
  });
  const [selectedMood, setSelectedMood] = useState(2);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleMoodSelect = (idx, value) => {
    setSelectedMood(idx);
    handleChange("mood", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <div className="input-form-container">
      <div className="form-header">
        <div className="form-icon-ring">
          <Sparkles size={28} />
        </div>
        <h1 className="form-title">AI Daily Planner</h1>
        <p className="form-subtitle">
          Tell me about your day — I'll craft the perfect schedule for you.
        </p>
      </div>

      <form className="planner-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="e.g. Alex"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Goals */}
        <div className="form-group">
          <label>Today's Goals <span className="required">*</span></label>
          <textarea
            placeholder="e.g. Finish the project proposal, learn React hooks, go for a run..."
            value={form.goals}
            onChange={(e) => handleChange("goals", e.target.value)}
            required
            rows={3}
          />
        </div>

        {/* Priorities */}
        <div className="form-group">
          <label>Top Priorities <span className="required">*</span></label>
          <textarea
            placeholder="e.g. Complete client presentation (most important), reply to emails, workout..."
            value={form.priorities}
            onChange={(e) => handleChange("priorities", e.target.value)}
            required
            rows={3}
          />
        </div>

        {/* Time Row */}
        <div className="form-row">
          <div className="form-group">
            <label>Wake Time</label>
            <input
              type="time"
              value={form.wakeTime}
              onChange={(e) => handleChange("wakeTime", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Sleep Time</label>
            <input
              type="time"
              value={form.sleepTime}
              onChange={(e) => handleChange("sleepTime", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Work Hours</label>
            <input
              type="number"
              min="1"
              max="16"
              value={form.availableHours}
              onChange={(e) => handleChange("availableHours", e.target.value)}
            />
          </div>
        </div>

        {/* Mood */}
        <div className="form-group">
          <label>Current Mood & Energy</label>
          <div className="mood-grid">
            {MOODS.map((m, idx) => (
              <button
                key={idx}
                type="button"
                className={`mood-btn ${selectedMood === idx ? "active" : ""}`}
                onClick={() => handleMoodSelect(idx, m.value)}
              >
                <span className="mood-emoji">{m.emoji}</span>
                <span className="mood-label">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="generate-btn" disabled={loading}>
          {loading ? (
            <>
              <RefreshCw size={18} className="spin" />
              Crafting Your Plan...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate My Day Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// ─── Schedule Block ──────────────────────────────────────────────────────────
function ScheduleBlock({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const color = CATEGORY_COLORS[item.category] || "#38bdf8";
  const icon = CATEGORY_ICONS[item.category] || <Clock size={14} />;

  return (
    <div
      className={`schedule-block ${expanded ? "expanded" : ""}`}
      style={{ "--block-color": color, animationDelay: `${index * 0.06}s` }}
    >
      <div className="block-main" onClick={() => setExpanded(!expanded)}>
        <div className="block-time">{item.time}</div>
        <div className="block-content">
          <div className="block-activity">{item.activity}</div>
          <div className="block-meta">
            <span className="block-category" style={{ color }}>
              {icon} {item.category}
            </span>
            <span className="block-duration">
              <Clock size={11} /> {item.duration}
            </span>
            <span
              className="block-priority"
              data-priority={item.priority?.toLowerCase()}
            >
              {item.priority}
            </span>
          </div>
        </div>
        <button className="block-expand">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      {expanded && (
        <div className="block-tip">
          <Zap size={13} />
          {item.tip}
        </div>
      )}
    </div>
  );
}

// ─── Chat Component ──────────────────────────────────────────────────────────
function ChatCoach({ planSummary }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I'm your AI coach for today 🎯 Ask me anything about your plan, or tell me if you need to adjust your schedule!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        conversationHistory: messages.slice(-6),
        currentPlan: planSummary,
      });
      setMessages([...newHistory, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([
        ...newHistory,
        { role: "assistant", content: "Sorry, I had trouble connecting. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <MessageCircle size={18} />
        <span>AI Coach</span>
        <span className="online-dot" />
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>
            {m.role === "assistant" && (
              <div className="msg-avatar">
                <Brain size={14} />
              </div>
            )}
            <div className="msg-bubble">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg assistant">
            <div className="msg-avatar">
              <Brain size={14} />
            </div>
            <div className="msg-bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask your coach anything..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Plan Dashboard ──────────────────────────────────────────────────────────
function PlanDashboard({ plan, onReset, onAdjust }) {
  const [activeTab, setActiveTab] = useState("schedule");
  const [adjustText, setAdjustText] = useState("");
  const [adjusting, setAdjusting] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(plan.schedule);

  const handleAdjust = async () => {
    if (!adjustText.trim()) return;
    setAdjusting(true);
    try {
      const res = await axios.post(`${API_URL}/api/adjust-plan`, {
        originalPlan: { ...plan, schedule: currentSchedule },
        adjustment: adjustText,
      });
      setCurrentSchedule(res.data.updatedSchedule);
      setAdjustText("");
    } catch {
      alert("Failed to adjust plan. Please try again.");
    } finally {
      setAdjusting(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="day-theme-badge">
            <Star size={12} />
            {plan.dayTheme}
          </div>
          <h2 className="greeting-text">{plan.greeting}</h2>
          <p className="motivational-quote">"{plan.motivationalQuote}"</p>
        </div>
        <div className="header-right">
          <div className="score-ring">
            <span className="score-number">{plan.productivityScore}</span>
            <span className="score-label">/ 10</span>
          </div>
          <p className="score-caption">Predicted Score</p>
          <button className="reset-btn" onClick={onReset}>
            <RefreshCw size={14} /> New Plan
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="summary-card">
        <TrendingUp size={16} />
        <p>{plan.summary}</p>
      </div>

      {/* Top 3 Tasks */}
      <div className="top-tasks">
        {plan.topThreeTasks?.map((task, i) => (
          <div key={i} className="task-chip">
            <span className="task-num">{i + 1}</span>
            {task}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["schedule", "wellness", "reflect", "chat"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "schedule" && <><Calendar size={14} /> Schedule</>}
            {tab === "wellness" && <><Heart size={14} /> Wellness</>}
            {tab === "reflect" && <><Brain size={14} /> Reflect</>}
            {tab === "chat" && <><MessageCircle size={14} /> Coach</>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "schedule" && (
          <div className="schedule-view">
            <div className="schedule-list">
              {currentSchedule?.map((item, i) => (
                <ScheduleBlock key={i} item={item} index={i} />
              ))}
            </div>

            {/* Adjust plan */}
            <div className="adjust-section">
              <p className="adjust-title">
                <Settings size={14} /> Need to adjust your schedule?
              </p>
              <div className="adjust-row">
                <input
                  value={adjustText}
                  onChange={(e) => setAdjustText(e.target.value)}
                  placeholder='e.g. "Move gym to 6 PM and add a 30-min nap at 2 PM"'
                  disabled={adjusting}
                />
                <button
                  onClick={handleAdjust}
                  disabled={adjusting || !adjustText.trim()}
                  className="adjust-btn"
                >
                  {adjusting ? <RefreshCw size={14} className="spin" /> : <Zap size={14} />}
                  Adjust
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "wellness" && (
          <div className="wellness-list">
            {plan.wellnessTips?.map((tip, i) => (
              <div key={i} className="wellness-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="wellness-icon">
                  <CheckCircle size={16} />
                </div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reflect" && (
          <div className="reflect-list">
            <p className="reflect-intro">
              Use these questions for your evening reflection:
            </p>
            {plan.eveningReflection?.map((q, i) => (
              <div key={i} className="reflect-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="reflect-num">Q{i + 1}</span>
                <p>{q}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "chat" && (
          <ChatCoach planSummary={plan.summary} />
        )}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/generate-plan`, formData);
      setPlan(res.data.plan);
    } catch (err) {
      const msg =
        err.response?.data?.error || "Failed to generate plan. Check your API connection.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Background decoration */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <main className="main-content">
        {error && (
          <div className="error-banner">
            <X size={16} />
            {error}
            <button onClick={() => setError("")}>
              <X size={14} />
            </button>
          </div>
        )}

        {!plan ? (
          <InputForm onGenerate={handleGenerate} loading={loading} />
        ) : (
          <PlanDashboard
            plan={plan}
            onReset={() => setPlan(null)}
          />
        )}
      </main>
    </div>
  );
}
