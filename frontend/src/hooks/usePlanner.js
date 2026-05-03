import { useState } from "react";
import { generatePlan, regenerateSlot } from "../utils/api";

const defaultForm = {
  name: "",
  date: new Date().toISOString().split("T")[0],
  wakeTime: "06:30 AM",
  sleepTime: "10:30 PM",
  goals: "",
  tasks: "",
  priorities: "",
  workStyle: "Balanced",
  breaks: "Regular short breaks",
  meals: "Breakfast, Lunch, Dinner",
  exercise: "",
  notes: "",
};

export function usePlanner() {
  const [form, setForm] = useState(defaultForm);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regenIndex, setRegenIndex] = useState(null);

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generatePlan(form);
      setPlan(result.plan);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const regenerate = async (index) => {
    if (!plan) return;
    setRegenIndex(index);
    try {
      const slot = plan.schedule[index];
      const result = await regenerateSlot(slot, form.goals);
      setPlan((prev) => {
        const newSchedule = [...prev.schedule];
        newSchedule[index] = result.slot;
        return { ...prev, schedule: newSchedule };
      });
    } catch (err) {
      setError(err.response?.data?.error || "Could not regenerate slot");
    } finally {
      setRegenIndex(null);
    }
  };

  const reset = () => {
    setPlan(null);
    setError(null);
    setForm(defaultForm);
  };

  return { form, updateForm, plan, loading, error, generate, regenerate, regenIndex, reset };
}
