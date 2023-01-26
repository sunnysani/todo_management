import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
    body: object( {
        email: string({
            required_error: "Email is required",
        }).email("Email is invalid"),
        username: string({
            required_error: "Username is required",
        }),
        password: string({
            required_error: "Password is required",
        }),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];