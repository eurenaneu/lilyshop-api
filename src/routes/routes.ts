import express, { Request, Response } from "express";
import { UserController } from "../controllers/user/user.controller";
import { UserService } from "../services/user/user.service";
import { UserRepository } from "../repositories/user/user.repository";
//import { User } from "../models/user";
import { UserDTO } from "../dto/user.dto";

const router = express.Router();

const userService = new UserService(UserRepository);
const userController = new UserController(userService);

router.get("/user", async (_req: Request, res: Response) => {
  const { statusCode, body } = await userController.getAll();

  if (statusCode == 500) {
    res.send(body);
  } else {
    res.json(body);
  }

  res.status(statusCode);
});

router.get("/user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { statusCode, body } = await userController.getUser(id);

  if (statusCode == 500) {
    res.send(body);
  } else {
    res.json(body);
  }

  res.status(statusCode);
});

router.post("/user", async (req: Request, res: Response) => {
  const userDTO: UserDTO = req.body;

  res.json(await userController.registerUser(userDTO));
})

router.patch("/user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const userDTO: UserDTO = req.body;

  const { statusCode, body } = await userController.patchUser(id, userDTO);

  res.json(body).status(statusCode);
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { statusCode, body } = await userController.deleteUser(id);

  if (statusCode == 500) {
    res.send(body);
  } else {
    res.json(body);
  }

  res.status(statusCode);
});

export default router;
