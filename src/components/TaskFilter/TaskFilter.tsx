import React from "react";
import type { TaskFilterOptions, TaskFilterProps } from "../../types/index.tsx";

const TaskFilter: React.FC<TaskFilterProps> = ({ filters, onChange }) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
  
      const next: TaskFilterOptions = {
        ...filters,
        [name]:
          name === "status" && value === "all"
            ? "all"
            : name === "priority" && value === "all"
            ? "all"
            : value,
      };
  
      onChange(next);
    };
  
    return (
      <div className="space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">
          Filters
        </h2>
  
        {/* Search */}
        <div>
          <label className="block text-xs font-medium mb-1" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={handleChange}
            className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by title or description"
          />
        </div>
  
        {/* Status + Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
  
          <div>
            <label className="block text-xs font-medium mb-1" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleChange}
              className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default TaskFilter;