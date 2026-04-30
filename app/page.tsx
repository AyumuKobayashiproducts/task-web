"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input) return;

    const newTask: Task = {
      id: Date.now(),
      text: input,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (task: Task) => {
    setTasks(
      tasks.map((currentTask) =>
        currentTask.id === task.id
          ? { ...currentTask, done: !currentTask.done }
          : currentTask
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">AI Task App</h1>

        <div className="flex gap-3 mb-8">
          <input
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            placeholder="タスクを入力"
          />

          <button
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between bg-zinc-900 p-4 rounded-xl"
            >
              <span className={task.done ? "line-through" : ""}>
                {task.text}
              </span>

              <div className="flex gap-2">
                <button
                  className="bg-green-600 px-2"
                  onClick={() => toggleTask(task)}
                >
                  完了
                </button>

                <button
                  className="bg-red-600 px-2"
                  onClick={() => deleteTask(task.id)}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
