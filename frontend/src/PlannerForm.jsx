import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import styles from "./PlannerForm.module.css";

const WORK_STYLES = ["Deep Focus", "Balanced", "Creative Flow", "Meetings Heavy", "Flexible"];
const BREAK_PREFS = [
  "Pomodoro (25/5)",
  "Regular short breaks",
  "Long midday break",
  "Minimal breaks",
  "Frequent micro-breaks",
];

export default function PlannerForm({ form, updateForm, onGenerate, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>AI-Powered</div>
        <h1 className={styles.title}>Your Daily Planner</h1>
        <p className={styles.subtitle}>
          Tell us about your day and we'll craft the perfect schedule for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Your Name</label>
            <input
              type="text"
              placeholder="e.g. Priya"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateForm("date", e.target.value)}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Wake Up Time</label>
            <input
              type="text"
              placeholder="e.g. 06:30 AM"
              value={form.wakeTime}
              onChange={(e) => updateForm("wakeTime", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Sleep Time</label>
            <input
              type="text"
              placeholder="e.g. 10:30 PM"
              value={form.sleepTime}
              onChange={(e) => updateForm("sleepTime", e.target.value)}
            />
          </div>
        </div>

        {/* Goals */}
        <div className={styles.field}>
          <label>Goals for Today</label>
          <textarea
            rows={3}
            placeholder="e.g. Finish project proposal, review team feedback, go for a walk..."
            value={form.goals}
            onChange={(e) => updateForm("goals", e.target.value)}
          />
        </div>

        {/* Tasks */}
        <div className={styles.field}>
          <label>Tasks to Complete</label>
          <textarea
            rows={3}
            placeholder="List your tasks, one per line..."
            value={form.tasks}
            onChange={(e) => updateForm("tasks", e.target.value)}
          />
        </div>

        {/* Priorities */}
        <div className={styles.field}>
          <label>Top Priorities (High → Low)</label>
          <input
            type="text"
            placeholder="e.g. Client call > Report writing > Emails"
            value={form.priorities}
            onChange={(e) => updateForm("priorities", e.target.value)}
          />
        </div>

        {/* Row 3 */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Work Style</label>
            <select
              value={form.workStyle}
              onChange={(e) => updateForm("workStyle", e.target.value)}
            >
              {WORK_STYLES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Break Preference</label>
            <select
              value={form.breaks}
              onChange={(e) => updateForm("breaks", e.target.value)}
            >
              {BREAK_PREFS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Meals Planned</label>
            <input
              type="text"
              placeholder="e.g. Breakfast, Lunch, Dinner"
              value={form.meals}
              onChange={(e) => updateForm("meals", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Exercise</label>
            <input
              type="text"
              placeholder="e.g. 30 min yoga, evening walk"
              value={form.exercise}
              onChange={(e) => updateForm("exercise", e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div className={styles.field}>
          <label>Additional Notes</label>
          <textarea
            rows={2}
            placeholder="Anything else to consider for your day..."
            value={form.notes}
            onChange={(e) => updateForm("notes", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-amber ${styles.submitBtn}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className={styles.spin} />
              Crafting your plan...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate My Daily Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
}
