import { Router } from "express";
import { createUserHandler, getCurrentUserHandler } from "./controller";
import validateResource from "../../middleware/validateResource";
import { createUserSchema } from "./schema";
import requireUser from "../../middleware/requireUser";

const router = Router();

router.post(
    "/api/user/create",
    validateResource(createUserSchema),
    createUserHandler
);

router.get("/api/user/me", requireUser, getCurrentUserHandler);

export default router;
