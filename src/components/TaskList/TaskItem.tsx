import React from "react"
import type { TaskItemProps } from "../../types/index.tsx"

const statusLabel: Record<string, string> = {
  "todo": "To do",
  "in-progress": "In progress",
  "done": "Done",
};

const priorityColor: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  high: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus, onDelete }) => {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{task.title}</h3>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
              priorityColor[task.priority]
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
        </div>
        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-2 text-[11px] text-gray-500">
          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
            {statusLabel[task.status]}
          </span>
          {task.dueDate && (
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
              Due: {task.dueDate}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <button
          onClick={() => onToggleStatus(task.id)}
          className="text-[11px] px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Next status
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-[11px] px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
