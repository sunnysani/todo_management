import { Router } from "express";
import { createSessionSchema } from "./schema";
import validateResource from "../../middleware/validateResource";
import { createSessionHandler, refreshAccessTokenHandler } from "./controller";

const router = Router();

router.post(
    "/api/auth/login",
    validateResource(createSessionSchema),
    createSessionHandler
);

router.post("/api/auth/refresh", refreshAccessTokenHandler);

export default router;
