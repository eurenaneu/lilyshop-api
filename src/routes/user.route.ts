import express, { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { userRepository } from "../repositories/user.repository";
import { invalidateCache, storeCache } from "../middlewares/cache.middleware";
import { User } from "../models/user";
import { UserSchema } from "../schemas/user.schema";

const userRouter = express.Router();

const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/", storeCache<User[]>(), async (req: Request, res: Response) => {
  const { statusCode, body } = await userController.getAll();
  return res.status(statusCode).json(body);
});

userRouter.get("/:id", storeCache<User>(), async (req: Request, res: Response) => {
  const id = req.params.id;

  const { statusCode, body } = await userController.getUser(id);
  return res.status(statusCode).json(body);
});

userRouter.get("/:id/addresses", storeCache<User>(), async (req: Request, res: Response) => {
  const id = req.params.id;

  const { statusCode, body } = await userController.getUserAddresses(id);
  console.log(body);
  return res.status(statusCode).json(body);
})

userRouter.post("/", invalidateCache<User>(), async (req: Request, res: Response) => {
  const userDTO = UserSchema.parse(req.body);
  const { statusCode, body } = await userController.createUser(userDTO);

  return res.status(statusCode).json(body);
});

userRouter.patch("/:id", invalidateCache<User>(), async (req: Request, res: Response) => {
  const id = req.params.id;
  const userDTO = UserSchema.parse(req.body);

  const { statusCode, body } = await userController.patchUser(id, userDTO);

  return res.status(statusCode).json(body);
});

userRouter.delete("/:id", invalidateCache<User>(), async (req: Request, res: Response) => {
  const id = req.params.id;
  const { statusCode, body } = await userController.deleteUser(id);

  return res.status(statusCode).json(body);
});

export default userRouter;