import { Request, Response } from "express";
import { createTodo, deleteTodo, getAllTodo, getTodoByUsername, toggleTodo } from "./service";
import { createTodoInput, deleteTodoInput } from "./schema";
import log from "../../utils/logger";

export async function getAllTodoHandler(req: Request, res: Response) {
    try {
        const todos = await getAllTodo();

        return res.send(todos);

    } catch (e) {
        log.error(e);
        return res.status(500).send(e);
    }
}

export async function getTodoByUsernameHandler(req: Request, res: Response) {
    const username = req.params.username;
    try {
        const todos = await getTodoByUsername(username);

        return res.send(todos);

    } catch (e) {
        log.error(e);
        return res.status(500).send(e);
    }
}

export async function createTodoHandler(
    req: Request<{}, {}, createTodoInput>,
    res: Response
) {
    const body = req.body;

    try {
        createTodo(body, res.locals.user._id)

        log.info(`Todo '${body.description}' Created by ${res.locals.user._id}`);
        return res.send(`Todo successfully created`);

    } catch (e) {
        log.error(e);
        return res.status(500).send(e);
    }
}

export async function deleteTodoHandler(
    req: Request<{}, {}, deleteTodoInput>,
    res: Response
) {
    const body = req.body;

    try {
        deleteTodo(body.id, res.locals.user._id)

        log.info(`Todo with id :'${body.id}' Deleted by ${res.locals.user._id}`);
        return res.send(`Todo with id: '${body.id}' successfully deleted`);

    } catch (e) {
        log.error(e);
        return res.status(500).send(e);
    }
}

export async function toggleTodoHandler(req: Request, res: Response) {
    const body = req.body

    try {
        toggleTodo(body.id, res.locals.user._id)

        log.info(`Todo '${body.id}' toggled by ${res.locals.user._id}`);
        return res.send(`Todo successfully toggled`);

    } catch(e) {
        log.error(e);
        return res.status(500).send(e);

    }
}