import { route, type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "./routes/login.tsx"),
    route("kanban", "./routes/kanban.tsx"),
    route("task/:id", "./routes/task.tsx"),
    route("task/new", "./routes/create-task.tsx"),
    route("pipe/new", "./routes/create-pipe.tsx"),
    route("pipe/:id", "./routes/pipe.tsx"),
] satisfies RouteConfig;
