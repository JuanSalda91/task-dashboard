# TASK DASHBOARD

This task dashboard activity was a good opportunity to practice typed React components, state management, and component composition with a realistic feature set.

## React + TypeScript features

React and TypeScript worked together to give a strongly typed structure to the app. The Task, TaskFormData, and TaskFilterOptions types defined the shape of data flowing through the app, while props interfaces such as TaskListProps and TaskFormProps documented what each component expects. Using useState and useEffect with generics (for example, useState<Task[]>) helped keep state updates safe, because TypeScript caught mistakes like missing fields or incorrect property names at compile time instead of at runtime. Overall, typing both state and props made the components easier to navigate and refactor.

## Challenges and how they were solved

One main challenge was understanding where to put logic such as reading from localStorage and applying the Tailwind dark mode class while avoiding React warnings about calling setState inside effects. This was addressed by using lazy initialization functions in useState to read initial values from localStorage, and then using useEffect only to synchronize the DOM (adding/removing the dark class) when the theme changes. Another challenge was dealing with “unused variable” and “accessed before declared” errors; this was solved by reordering functions like applyThemeClass so they are defined before use, and simplifying catch blocks when the error object is not needed.

## Component composition and state management

The dashboard followed the common pattern of lifting state up: the Dashboard component holds global state (tasks, filters, sort, theme), and passes data and callbacks down to child components like TaskForm, TaskFilter, TaskList, and TaskItem. Child components remain “dumb” UI pieces that render based on props and notify the parent about events through typed callbacks, which keeps them reusable and easy to test. Derived values such as filtered/sorted tasks and statistics are computed in the Dashboard using helper utilities, which centralizes business logic and keeps rendering components focused purely on presentation.
