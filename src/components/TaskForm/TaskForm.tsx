import React, { useState }  from "react";
import { TaskFormData, TaskFormProps } from "../../types/index.tsx"

const emptyForm: TaskFormData = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
};