import { createUserController } from '@src/api/user/controllers/create-user.controller';
import express, { Router } from 'express';

const userRoutes: Router = express.Router();

userRoutes.post("/", createUserController);

export { userRoutes };
