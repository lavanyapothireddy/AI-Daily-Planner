/* ─── Layout ─────────────────────────────────────────────────────────────── */
.app {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}
.bg-glow-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
  top: -200px;
  right: -200px;
}
.bg-glow-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.07) 0%, transparent 70%);
  bottom: -150px;
  left: -150px;
}

.main-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 20px 80px;
  position: relative;
  z-index: 1;
}

/* ─── Error Banner ────────────────────────────────────────────────────────── */
.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  color: #fca5a5;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  margin-bottom: 20px;
  font-size: 14px;
}
.error-banner button {
  background: none;
  border: none;
  color: #fca5a5;
  cursor: pointer;
  margin-left: auto;
}

/* ─── Input Form ──────────────────────────────────────────────────────────── */
.input-form-container {
  animation: fadeUp 0.6s ease both;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-icon-ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.15));
  border: 1.5px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: var(--accent);
  box-shadow: 0 0 40px rgba(56, 189, 248, 0.15);
}

.form-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  background: linear-gradient(135deg, #e2e8f0 0%, var(--accent) 60%, var(--accent2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.form-subtitle {
  color: var(--text-muted);
  font-size: 15px;
  margin-top: 8px;
  font-weight: 300;
}

.planner-form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: var(--shadow);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--font-display);
}

.required {
  color: var(--accent);
}

.form-group input,
.form-group textarea {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.08);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
  font-weight: 300;
  font-style: italic;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

/* Mood grid */
.mood-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.mood-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-dim);
}

.mood-btn:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(56, 189, 248, 0.05);
}

.mood-btn.active {
  border-color: var(--accent);
  background: rgba(56, 189, 248, 0.1);
  color: var(--accent);
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.12);
}

.mood-emoji {
  font-size: 22px;
}

.mood-label {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-display);
}

/* Generate Button */
.generate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
  margin-top: 8px;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(56, 189, 248, 0.4);
}

.generate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ─── Dashboard ──────────────────────────────────────────────────────────── */
.dashboard {
  animation: fadeUp 0.5s ease both;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 32px;
  box-shadow: var(--shadow);
}

.header-left {
  flex: 1;
}

.day-theme-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  color: var(--gold);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.greeting-text {
  font-family: var(--font-display);
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
  line-height: 1.3;
}

.motivational-quote {
  font-size: 14px;
  color: var(--text-muted);
  font-style: italic;
  font-weight: 300;
  max-width: 500px;
  line-height: 1.6;
}

.header-right {
  text-align: center;
  flex-shrink: 0;
}

.score-ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid var(--accent3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  background: rgba(52, 211, 153, 0.08);
  box-shadow: 0 0 24px rgba(52, 211, 153, 0.2);
}

.score-number {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--accent3);
}

.score-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 400;
}

.score-caption {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-dim);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
}

.reset-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.summary-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(56, 189, 248, 0.05);
  border: 1px solid rgba(56, 189, 248, 0.15);
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.7;
}

.summary-card svg {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.top-tasks {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.task-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 30px;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--text-dim);
}

.task-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-display);
}

/* ─── Tabs ────────────────────────────────────────────────────────────────── */
.tabs {
  display: flex;
  gap: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 13px;
  font-family: var(--font-display);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--text);
  background: var(--surface2);
}

.tab-btn.active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.15));
  color: var(--accent);
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.tab-content {
  min-height: 300px;
}

/* ─── Schedule ────────────────────────────────────────────────────────────── */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.schedule-block {
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--block-color, var(--accent));
  border-radius: var(--radius-sm);
  overflow: hidden;
  animation: slideIn 0.4s ease both;
  transition: box-shadow 0.2s;
}

.schedule-block:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.block-main {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  cursor: pointer;
}

.block-time {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-dim);
  min-width: 68px;
  letter-spacing: 0.02em;
}

.block-content {
  flex: 1;
}

.block-activity {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 4px;
}

.block-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.block-category {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.block-duration {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted);
}

.block-priority {
  font-size: 10px;
  font-weight: 700;
  font-family: var(--font-display);
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.05em;
}

.block-priority[data-priority="high"] {
  background: rgba(248, 113, 113, 0.1);
  color: #fca5a5;
  border: 1px solid rgba(248, 113, 113, 0.2);
}

.block-priority[data-priority="medium"] {
  background: rgba(251, 191, 36, 0.1);
  color: #fcd34d;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.block-priority[data-priority="low"] {
  background: rgba(52, 211, 153, 0.1);
  color: #6ee7b7;
  border: 1px solid rgba(52, 211, 153, 0.2);
}

.block-expand {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}

.block-expand:hover {
  color: var(--text);
}

.block-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px 14px 16px;
  background: var(--surface2);
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.5;
  animation: fadeUp 0.2s ease;
}

.block-tip svg {
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}

/* Adjust Section */
.adjust-section {
  margin-top: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px 20px;
}

.adjust-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-dim);
  margin-bottom: 12px;
}

.adjust-row {
  display: flex;
  gap: 10px;
}

.adjust-row input {
  flex: 1;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--text);
  font-size: 13px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s;
}

.adjust-row input:focus {
  border-color: rgba(56, 189, 248, 0.4);
}

.adjust-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 8px;
  color: var(--accent);
  font-size: 13px;
  font-family: var(--font-display);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.adjust-btn:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.2);
}

.adjust-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ─── Wellness ───────────────────────────────────────────────────────────── */
.wellness-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
}

.wellness-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  animation: slideIn 0.4s ease both;
}

.wellness-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(52, 211, 153, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent3);
  flex-shrink: 0;
}

.wellness-item p {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.6;
  margin-top: 4px;
}

/* ─── Reflection ─────────────────────────────────────────────────────────── */
.reflect-intro {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
  font-style: italic;
}

.reflect-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reflect-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  animation: slideIn 0.4s ease both;
}

.reflect-num {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 800;
  color: var(--accent2);
  background: rgba(129, 140, 248, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
  padding: 4px 8px;
  border-radius: 6px;
  flex-shrink: 0;
}

.reflect-item p {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.6;
}

/* ─── Chat ───────────────────────────────────────────────────────────────── */
.chat-container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  height: 440px;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.online-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent3);
  margin-left: auto;
  box-shadow: 0 0 8px var(--accent3);
  animation: pulse 2s infinite;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-msg {
  display: flex;
  gap: 10px;
  animation: fadeUp 0.25s ease;
}

.chat-msg.user {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}

.msg-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13.5px;
  line-height: 1.6;
}

.chat-msg.assistant .msg-bubble {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text-dim);
  border-radius: 4px 12px 12px 12px;
}

.chat-msg.user .msg-bubble {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.15));
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: var(--text);
  border-radius: 12px 4px 12px 12px;
}

.msg-bubble.typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px;
}

.msg-bubble.typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: bounce 1.4s infinite ease-in-out;
}

.msg-bubble.typing span:nth-child(1) { animation-delay: 0s; }
.msg-bubble.typing span:nth-child(2) { animation-delay: 0.2s; }
.msg-bubble.typing span:nth-child(3) { animation-delay: 0.4s; }

.chat-input-row {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border);
}

.chat-input-row input {
  flex: 1;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--text);
  font-size: 13.5px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s;
}

.chat-input-row input:focus {
  border-color: rgba(56, 189, 248, 0.4);
}

.chat-input-row button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.chat-input-row button:hover:not(:disabled) {
  transform: scale(1.05);
}

.chat-input-row button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ─── Animations ─────────────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.spin {
  animation: spinAnim 1s linear infinite;
}

@keyframes spinAnim {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .planner-form {
    padding: 20px;
  }
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
  .form-row .form-group:last-child {
    grid-column: 1 / -1;
  }
  .mood-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-header {
    flex-direction: column;
    padding: 20px;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  .top-tasks {
    flex-direction: column;
  }
  .tabs {
    flex-wrap: wrap;
  }
  .tab-btn {
    font-size: 12px;
  }
  .adjust-row {
    flex-direction: column;
  }
}
