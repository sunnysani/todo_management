import { Router } from "express";
import requireUser from "../../middleware/requireUser";
import { createTodoHandler, deleteTodoHandler, getAllTodoHandler, getTodoByUsernameHandler, toggleTodoHandler } from "./controller";
import { createTodoSchema, deleteTodoSchema, toggleTodoSchema } from "./schema";
import validateResource from "../../middleware/validateResource";

const router = Router();

router.get(
    "/api/todo",
    requireUser,
    getAllTodoHandler
);

router.get(
    "/api/todo/:username",
    requireUser,
    getTodoByUsernameHandler
);

router.post(
    "/api/todo/create",
    requireUser,
    validateResource(createTodoSchema),
    createTodoHandler
);

router.delete(
    "/api/todo",
    requireUser,
    validateResource(deleteTodoSchema),
    deleteTodoHandler
);

router.put(
    "/api/todo",
    requireUser,
    validateResource(toggleTodoSchema),
    toggleTodoHandler
);

export default router;
