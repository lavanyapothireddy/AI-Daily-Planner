import React from "react";
import {
  RefreshCw, Loader2, Sun, Coffee, Briefcase, Utensils,
  Dumbbell, User, Moon, Quote, BarChart2, RotateCcw
} from "lucide-react";
import styles from "./ScheduleView.module.css";

const CATEGORY_CONFIG = {
  "morning-routine": { icon: Sun, color: "#f0a832", bg: "#fef9ed", label: "Morning" },
  work: { icon: Briefcase, color: "#5a7a5e", bg: "#eef4ef", label: "Work" },
  break: { icon: Coffee, color: "#c0635a", bg: "#fdf1f0", label: "Break" },
  meal: { icon: Utensils, color: "#7c6fcd", bg: "#f2f0fb", label: "Meal" },
  exercise: { icon: Dumbbell, color: "#3a8fb5", bg: "#edf5fa", label: "Exercise" },
  personal: { icon: User, color: "#b07a3e", bg: "#f9f3eb", label: "Personal" },
  "wind-down": { icon: Moon, color: "#6b7a99", bg: "#f0f2f7", label: "Wind Down" },
};

const PRIORITY_DOT = { high: "#c0635a", medium: "#d4820a", low: "#5a7a5e" };

function SlotCard({ slot, index, onRegenerate, isRegenerating }) {
  const cfg = CATEGORY_CONFIG[slot.category] || CATEGORY_CONFIG["work"];
  const Icon = cfg.icon;

  return (
    <div className={styles.slotCard} style={{ "--cat-color": cfg.color, "--cat-bg": cfg.bg }}>
      <div className={styles.slotTime}>
        <span className={styles.timeText}>{slot.time}</span>
        <span className={styles.timeEnd}>{slot.endTime}</span>
      </div>

      <div className={styles.slotBody}>
        <div className={styles.slotHeader}>
          <div className={styles.categoryChip}>
            <Icon size={12} />
            {cfg.label}
          </div>
          <span
            className={styles.priorityDot}
            style={{ background: PRIORITY_DOT[slot.priority] || "#999" }}
            title={`${slot.priority} priority`}
          />
        </div>

        <h3 className={styles.slotTitle}>{slot.title}</h3>
        <p className={styles.slotDesc}>{slot.description}</p>

        {slot.tips && (
          <div className={styles.tip}>
            <span>💡</span> {slot.tips}
          </div>
        )}
      </div>

      <button
        className={styles.regenBtn}
        onClick={() => onRegenerate(index)}
        disabled={isRegenerating}
        title="Regenerate this slot"
      >
        {isRegenerating ? (
          <Loader2 size={14} className={styles.spin} />
        ) : (
          <RefreshCw size={14} />
        )}
      </button>
    </div>
  );
}

export default function ScheduleView({ plan, onRegenerate, regenIndex, onReset }) {
  const stats = plan.dailyStats || {};

  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <p className={styles.greeting}>{plan.greeting}</p>
        <p className={styles.summary}>{plan.summary}</p>

        {plan.motivationalQuote && (
          <div className={styles.quoteBox}>
            <Quote size={16} />
            <span>{plan.motivationalQuote}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          { label: "Work Hours", value: `${stats.workHours || 0}h`, color: "#5a7a5e" },
          { label: "Break Time", value: `${stats.breakTime || 0}h`, color: "#c0635a" },
          { label: "Personal", value: `${stats.personalTime || 0}h`, color: "#7c6fcd" },
          { label: "Total", value: `${stats.totalScheduled || 0}h`, color: "#d4820a" },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statValue} style={{ color: s.color }}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Focus tip */}
      {plan.focusTip && (
        <div className={styles.focusTip}>
          <BarChart2 size={16} />
          <strong>Focus Tip: </strong>{plan.focusTip}
        </div>
      )}

      {/* Schedule */}
      <div className={styles.scheduleList}>
        {plan.schedule.map((slot, i) => (
          <SlotCard
            key={i}
            slot={slot}
            index={i}
            onRegenerate={onRegenerate}
            isRegenerating={regenIndex === i}
          />
        ))}
      </div>

      {/* Reset */}
      <div className={styles.resetRow}>
        <button className="btn btn-ghost" onClick={onReset}>
          <RotateCcw size={16} />
          Plan a New Day
        </button>
      </div>
    </div>
  );
}
