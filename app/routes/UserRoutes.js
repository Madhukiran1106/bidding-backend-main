import express from 'express';
import UserController from '../controllers/UserController.js';
import UserAuth from '../middlewares/AuthorizationMiddleware.js';

const UserRouter = express.Router();

UserRouter.post('/register', UserController.signup);

UserRouter.post('/login', UserController.login);

UserRouter.get('/profile', UserAuth, UserController.profile);

export default UserRouter;
