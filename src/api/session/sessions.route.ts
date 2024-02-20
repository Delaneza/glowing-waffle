import { adaptRoute } from '@shared/http/route-adapter';
import { BodyValidator } from '@src/middlewares/body-validator.middleware';
import express, { Router } from 'express';
import { NewSessionController, NewSessionDTO } from './controllers/new-session.controller';

const sessionRoutes: Router = express.Router();

sessionRoutes.post('/', BodyValidator(NewSessionDTO), adaptRoute(NewSessionController));

export { sessionRoutes };
