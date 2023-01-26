import { TypeOf, object, string } from "zod";

export const createTodoSchema = object({
    body: object({
        description: string({
            required_error: "Description is required",
        })
    })
});

export const deleteTodoSchema = object({
    body: object({
        id: string({
            required_error: "id is required",
        })
    })
})

export const toggleTodoSchema = object({
    body: object({
        id: string({
            required_error: "id is required",
        })
    })
})

export type createTodoInput = TypeOf<typeof createTodoSchema>["body"];
export type deleteTodoInput = TypeOf<typeof deleteTodoSchema>["body"];
export type toggleTodoInput = TypeOf<typeof createTodoSchema>["body"];
