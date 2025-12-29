import React, { useEffect, useMemo, useState } from "react";

import type {
    DashboardProps,
    Task,
    TaskFilterOptions,
    TaskFormData,
    Theme,
} from "../../types";

import {
    createTaskFromForm,
    filterTasks,
    loadTasksFromStorage,
    saveTasksToStorage,
    sortTasks,
    exportTasks,
    importTasks,
    loadThemeFromStorage,
    saveThemeToStorage,
} from "../../utils/TaskUtils";

import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";

const Dashboard: React.FC<DashboardProps> = ({ initialTasks = [] }) => {
    // task state //
    const [tasks, setTasks] = useState<Task[]> (initialTasks);

    // filter state //
    const [filters, setFilters] = useState<TaskFilterOptions>({
        status: "all",
        priority: "all",
        search: "",
    });

    // sort state //
    const [sortBy, setSortBy] = useState<"createdAt" | "priority" | "status">(
        "createdAt"
    );

    // theme state //
    const [theme, setTheme] = useState<Theme>("light");

    // Import/export text
  const [importText, setImportText] = useState("");

  // Load tasks + theme from localStorage on first render
  useEffect(() => {
    const storedTasks = loadTasksFromStorage();
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }

    const storedTheme = loadThemeFromStorage();
    if (storedTheme) {
      setTheme(storedTheme);
      applyThemeClass(storedTheme);
    } else {
      applyThemeClass("light");
    }
  }, []);

  // Persist tasks whenever they change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Apply theme to <html> or <body>
  const applyThemeClass = (t: Theme) => {
    const root = document.documentElement; // <html />
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Handle theme toggle
  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      applyThemeClass(next);
      saveThemeToStorage(next);
      return next;
    });
  };

  // Derived: filtered + sorted tasks
  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sortBy);
  }, [tasks, filters, sortBy]);

  // Derived: statistics
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;

  // Event handlers
  const handleAddTask = (data: TaskFormData) => {
    const newTask = createTaskFromForm(data);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        let nextStatus: Task["status"];
        if (task.status === "todo") nextStatus = "in-progress";
        else if (task.status === "in-progress") nextStatus = "done";
        else nextStatus = "todo";

        return { ...task, status: nextStatus, updatedAt: new Date().toISOString() };
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleChangeFilters = (nextFilters: TaskFilterOptions) => {
    setFilters(nextFilters);
  };

  const handleChangeSort = (value: "createdAt" | "priority" | "status") => {
    setSortBy(value);
  };

  const handleReorderTasks = (sourceIndex: number, destinationIndex: number) => {
    setTasks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(destinationIndex, 0, moved);
      return updated;
    });
  };

  const handleExport = () => {
    const json = exportTasks(tasks);
    // simplest: copy to clipboard and alert
    navigator.clipboard.writeText(json).catch(() => {});
    alert("Tasks JSON copied to clipboard.");
  };

  const handleImport = () => {
    try {
      const imported = importTasks(importText);
      setTasks(imported);
      setImportText("");
      alert("Tasks imported.");
    } catch (e) {
      alert("Invalid JSON.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Task Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage tasks, filter, sort, and track progress.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleTheme}
              className="rounded-full px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Theme: {theme === "light" ? "Light" : "Dark"}
            </button>
            <button
              onClick={handleExport}
              className="rounded px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              Export
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow">
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-xl font-semibold">{totalTasks}</div>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow">
            <div className="text-xs text-gray-500">To do</div>
            <div className="text-xl font-semibold">{todoTasks}</div>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow">
            <div className="text-xs text-gray-500">In progress</div>
            <div className="text-xl font-semibold">{inProgressTasks}</div>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow">
            <div className="text-xs text-gray-500">Done</div>
            <div className="text-xl font-semibold">{doneTasks}</div>
          </div>
        </section>

        {/* Main content: form + filters + list */}
        <main className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 items-start">
          {/* Left column: form + import */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
              <h2 className="font-semibold mb-2 text-sm uppercase tracking-wide text-gray-500">
                New task
              </h2>
              <TaskForm onSubmit={handleAddTask} />
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
              <h2 className="font-semibold mb-2 text-sm uppercase tracking-wide text-gray-500">
                Import tasks
              </h2>
              <textarea
                className="w-full h-24 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2"
                placeholder="Paste tasks JSON here"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
              <button
                onClick={handleImport}
                className="mt-2 rounded px-3 py-1 text-sm bg-green-600 text-white hover:bg-green-700"
              >
                Import
              </button>
            </div>
          </div>

          {/* Right column: filter + list */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
              <TaskFilter filters={filters} onChange={handleChangeFilters} />
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                  Sort by:
                </span>
                <button
                  onClick={() => handleChangeSort("createdAt")}
                  className={`px-2 py-1 rounded-full border text-xs ${
                    sortBy === "createdAt"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Created
                </button>
                <button
                  onClick={() => handleChangeSort("priority")}
                  className={`px-2 py-1 rounded-full border text-xs ${
                    sortBy === "priority"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Priority
                </button>
                <button
                  onClick={() => handleChangeSort("status")}
                  className={`px-2 py-1 rounded-full border text-xs ${
                    sortBy === "status"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Status
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
              <TaskList
                tasks={visibleTasks}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
                onReorder={handleReorderTasks}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;