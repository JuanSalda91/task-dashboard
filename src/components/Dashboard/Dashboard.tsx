import React, { useEffect, useMemo, useState } from "react";

import {
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
} from "../../utils/taskUtils";

import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";