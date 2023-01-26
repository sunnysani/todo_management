import log from "../../utils/logger";
import UserModel from "../user/model";
import TodoModel, { Todo } from "./model";

export function getAllTodo() {
    return TodoModel.find();
}

export async function getTodoByUsername(username: string) {
    try {
        const userId = (await UserModel.findOne({ username: username }))?._id
        return TodoModel.find({ user: userId })
    } catch (e) {
        log.error(e);
    }
}

export function createTodo(input: Partial<Todo>, userId: string) {
    return TodoModel.create({ user: userId, description: input.description });
}

export async function deleteTodo(todoId: string, userId: string) {
    try {
        const todo = await TodoModel.findById( todoId );

        if (todo === null) {
            throw (`No Todo Found with id: '${todoId}'`);
        }

        if (todo.user._id != userId) {
            throw (`Todo and creator not match. todoId: '${todoId}' & userId: '${userId}'`);
        }

        return TodoModel.deleteOne( { _id: todoId } )
    } catch (e) {        
        log.error(e);
    }

}

export async function toggleTodo(todoId: string, userId: string) {
    try {
        const todo = await TodoModel.findById( todoId );

        if (todo === null) {
            throw (`No Todo Found with id: '${todoId}'`);
        }

        if (todo.user._id != userId) {
            throw (`Todo and creator not match. todoId: '${todoId}' & userId: '${userId}'`);
        }

        return TodoModel.updateOne(
            { _id: todoId }, 
            { $set: { statusDone: !todo.statusDone } },
        )
    } catch (e) {        
        log.error(e);
    }
}
