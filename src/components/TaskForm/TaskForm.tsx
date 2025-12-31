import React, { useState }  from "react";
import type { TaskFormData, TaskFormProps } from "../../types/index.tsx"

const emptyForm: TaskFormData = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
};

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
    //1. local form state
    const [form, setForm] = useState<TaskFormData> (initialData ?? emptyForm);
    const [errors, setErrors] = useState<{ title?: string }> ({});

    //2. handle text/select changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 3. simple validation
    const validate = (): boolean => {
        const newErrors: { title?: string } = {};
        if (!form.title.trim()) {
            newErrors.title = "Title is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //4. on submit: validate, call parent, reset
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({
            title: form.title.trim(),
            description: form.description.trim(),
            status: form.status,
            priority: form.priority,
            dueDate: form.dueDate || undefined,
        });

        if (!initialData) {
            setForm(emptyForm);
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className={`w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="e.g. Finish React assignment"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>
    
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Add some details about the task"
            />
          </div>
    
          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
    
          {/* Due date */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
              Due date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate ?? ""}
              onChange={handleChange}
              className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
    
          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 transition-colors"
          >
            {initialData ? "Save changes" : "Add task"}
          </button>
        </form>
      );
};

export default TaskForm;