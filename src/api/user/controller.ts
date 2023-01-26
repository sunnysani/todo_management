import { Request, Response } from "express";
import { CreateUserInput } from "./schema";
import { createUser } from "./service";
import log from "../../utils/logger";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) {
    const body = req.body

    try {
        const user = await createUser(body);

        log.info(`Created user with email ${user.email}`)
        return res.send(`User @${user.username} successfully created`);

    } catch (e: any) {
        // Handle if user exists
        if (e.code === 11000) {
            return res.status(409).send("Email already used");
        }

        log.error(e);
        return res.status(500).send(e);
    }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}
