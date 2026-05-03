import React from "react";
import { usePlanner } from "./hooks/usePlanner";
import PlannerForm from "./components/PlannerForm";
import ScheduleView from "./components/ScheduleView";
import styles from "./App.module.css";

export default function App() {
  const { form, updateForm, plan, loading, error, generate, regenerate, regenIndex, reset } =
    usePlanner();

  return (
    <div className={styles.app}>
      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <span className={styles.logo}>
            <span className={styles.logoIcon}>◎</span>
            DayFlow<span className={styles.logoAI}> AI</span>
          </span>
          {plan && (
            <button className="btn btn-ghost" onClick={reset} style={{ padding: "8px 16px" }}>
              New Plan
            </button>
          )}
        </div>
      </nav>

      {/* Error Banner */}
      {error && (
        <div className={styles.errorBanner}>
          ⚠️ {error}
          <button onClick={() => {}} className={styles.dismissError}>×</button>
        </div>
      )}

      {/* Main Content */}
      <main className={styles.main}>
        {!plan ? (
          <PlannerForm
            form={form}
            updateForm={updateForm}
            onGenerate={generate}
            loading={loading}
          />
        ) : (
          <ScheduleView
            plan={plan}
            onRegenerate={regenerate}
            regenIndex={regenIndex}
            onReset={reset}
          />
        )}
      </main>

      <footer className={styles.footer}>
        Built with Claude AI · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
