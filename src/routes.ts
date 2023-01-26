import express from "express";
import authApiRouter from './api/auth/routes';
import todoApiRouter from './api/todo/routes';
import userApiRouter from './api/user/routes';

const router = express.Router();

router.get('/healthcheck', (_, res) => {res.sendStatus(200)});
router.use(authApiRouter);
router.use(todoApiRouter);
router.use(userApiRouter);

export default router;