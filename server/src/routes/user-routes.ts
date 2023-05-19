import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user-controller';

const userRouter = Router();

userRouter.post('/api/users', createUser);
userRouter.get('/api/users', getAllUsers);
userRouter.get('/api/users/:id', getUserById);
userRouter.put('/api/users/:id', updateUser);

export default userRouter;
