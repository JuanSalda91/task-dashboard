// ----- Defining core interfaces, so they can be shared safely ----- //

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
    updatedAt: string;
    dueDate?: string;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
}

export interface TaskFilterOptions {
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
    search: string;
}

export interface TaskListProps {
    tasks: Task [];
    onTogglleStatus: (id: string) => void;
    onDelete: (id: string) => void;
    onReorder: (sourceIndex: number, destinationIndex: number) => void;
}

export interface TaskItemProps {
    tas: Task;
    onToggelStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface TaskFormProps {
    filters: TaskFilterOptions;
    onChange: (filters: TaskFilterOptions) => void;
}

export type Theme = "light" | "dark";

export interface DashboardProps {
    initialTask?: Task [];
}

/** 
 * - TaskFormData omits id, createdAt, updatedAt because those belong to the “domain layer” and are added when saving, not when typing in the form.
 * 
 * - TaskFilterOptions keeps filters centralized so the Dashboard can compute filtered+sorted tasks and pass them to TaskList.
 * 
 * - The Theme type restricts theme state to two valid values, which makes dark-mode logic type-safe.
 */