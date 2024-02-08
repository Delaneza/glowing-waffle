import express, { Router } from 'express';
import { makeCreateUserController } from "../factories";

const userRoutes: Router = express.Router();

const createUserController = makeCreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
