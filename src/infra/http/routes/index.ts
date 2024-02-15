import express, { Router } from 'express';
import { userRoutes } from './users.route';

const routes: Router = express.Router();

routes.use('/users', userRoutes);

export { routes };