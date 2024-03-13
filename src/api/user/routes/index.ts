import { createUserController, showUserController } from '@api/user/controllers'
import { CreateUserDTO } from '@api/user/dtos'
import { adaptRoute } from '@middlewares/adapt-route.middleware'
import { bodyValidator } from '@middlewares/body-validator.middleware'
import { ensureAuthenticated } from '@middlewares/ensure-authenticated.middleware'
import express, { Router } from 'express'

const userRoutes: Router = express.Router()

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *      - Usuários
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Endereço de e-mail do usuário
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário (mínimo 6 caracteres)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Endereço de e-mail do usuário
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                 path:
 *                  type: string
 *                  description: Campo com erro
 *                 error:
 *                   type: string
 *                   description: Tipo de erro
 */
userRoutes.post('/', bodyValidator(CreateUserDTO), adaptRoute(createUserController))

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *      - Usuários
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Usuários retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Endereço de e-mail do usuário
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                 path:
 *                  type: string
 *                  description: Campo com erro
 *                 error:
 *                   type: string
 *                   description: Tipo de erro
 */
userRoutes.get('/me', ensureAuthenticated(), adaptRoute(showUserController))

export { userRoutes }
