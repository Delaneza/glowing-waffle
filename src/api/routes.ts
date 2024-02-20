import { sessionRoutes } from '@api/session/sessions.route';
import { userRoutes } from '@api/user/users.route';
import express, { Router } from 'express';

const routes: Router = express.Router();

routes.use('/users', userRoutes);
routes.use('/auth', sessionRoutes)

export { routes };
