import { CreateUserController } from '@src/api/user/controllers/create-user.controller';
import express, { Router } from 'express';

const userRoutes: Router = express.Router();

userRoutes.post("/", CreateUserController);

export { userRoutes };
