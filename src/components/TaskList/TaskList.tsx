import React from "react";
import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onDelete,
  // onReorder, // not used yet
}) => {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        No tasks match the current filters.
      </p>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
