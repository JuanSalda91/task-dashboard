// ----- The functions here encapsulate transformations (filtering, sorting, localStorage), so the components can focus on UI and interactions ----- //
import type { Task, TaskFilterOptions, TaskFormData, TaskStatus, TaskPriority } from "../types"

const STORAGE_KEY = "task-dashboard-tasks";
const THEME_KEY = "task-dashboard-theme";

export function createTaskFromForm(data: TaskFormData): Task {
    const now = new Date().toISOString(); // Method that converts a date's value to a string format following the ISO 8601 standard.
    return {
        id: crypto.randomUUID(),// UUID Helps to generate ID
        title: data.title.trim(),
        description: data.description.trim(),
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate || undefined,
        createdAt: now,
        updatedAt: now,
    };
}

export function updateTaskForm(task: Task, data: TaskFormData): Task {
    return {
        ...task,
        title: data.title.trim(),
        description: data.description.trim(),
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate || undefined,
        updatedAt: new Date(). toISOString(),
    };
};

export function filterTasks(tasks: Task[], filters: TaskFilterOptions): Task[] {
    return tasks.filter((task) => {
        const matchesStatus = filters.status === "all" || task.status === filters.status;
        const matchesPriority = filters.priority === "all" || task.priority === filters.priority;
        const search = filters.search.trim().toLowerCase();
        const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search);
        return matchesStatus && matchesPriority && matchesSearch;
    });
}

export function sortTasks(tasks: Task[], sortBy: "createdAt" | "priority" | "status"): Task[] {
    const priorityOrder: TaskPriority[] = ["low", "medium", "high"];
    const statusOrder: TaskStatus[] = ["todo", "in-progress", "done"];

    const copy = [...tasks];
    copy.sort((a, b) => {
        if (sortBy === "createdAt") {
            return new Date(b.createdAt). getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "priority") {
            return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
        }
        if (sortBy === "status") {
            return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        }
        return 0;
    });
    return copy;
}

// --- localStorage --- //
export function saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasksFromStorage(): Task[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as Task[];
        return parsed;
    } catch {
        return [];
    }
}

export function exportTasks(tasks: Task[]): string {
    return JSON.stringify(tasks, null, 2);
  }
  
  export function importTasks(json: string): Task[] {
    const parsed = JSON.parse(json) as Task[];
    return parsed;
  }
  
  export function saveThemeToStorage(theme: "light" | "dark"): void {
    localStorage.setItem(THEME_KEY, theme);
  }
  
  export function loadThemeFromStorage(): "light" | "dark" | null {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return null;
  }


/**
 * - Crypto: The Crypto interface represents basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives.
 * 
 * - UUID(Universally Unique Identifier): Is a label used to uniquely identify a resource among all other resources of that type. UUIDs are 128-bit values that are canonically represented as a 36-character string in the format 123e4567-e89b-12d3-a456-426614174000 (5 hex strings separated by hyphens).
 * 
 * - randomUUID(): The randomUUID() method of the Crypto interface is used to generate a v4 UUID using a cryptographically secure random number generator.
 */