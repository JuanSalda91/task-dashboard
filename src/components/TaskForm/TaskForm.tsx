import React, { useState }  from "react";
import { TaskFormData, TaskFormProps } from "../../types/index.tsx"

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
}