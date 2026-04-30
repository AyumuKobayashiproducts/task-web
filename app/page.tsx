"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error.message, error.details, error.hint, error.code);
      return;
    }

    setTasks(data ?? []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!input) return;

    const { error } = await supabase.from("tasks").insert({
      text: input,
      done: false,
    });

    if (error) {
      console.error("Supabase insert error:", error.message, error.details, error.hint, error.code);
      return;
    }

    setInput("");
    fetchTasks();
  };

  const toggleTask = async (task: Task) => {
    const { error } = await supabase
      .from("tasks")
      .update({ done: !task.done })
      .eq("id", task.id);

    if (error) {
      console.error("Supabase update error:", error.message, error.details, error.hint, error.code);
      return;
    }

    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error.message, error.details, error.hint, error.code);
      return;
    }

    fetchTasks();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task App</h1>

      <input
        className="border p-2 mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="bg-blue-500 text-white p-2" onClick={addTask}>
        Add
      </button>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task)}
            />

            <span className={task.done ? "line-through" : ""}>
              {task.text}
            </span>

            <button
              className="text-red-500"
              onClick={() => deleteTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
