import express, { json, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  findUserById,
  updateUser,
} from "./persistence";
import { User } from "./user";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/:id", async (req: Request, res: Response) => {
  const user = await findUserById(req.params.id);
  res.status(200).json(user);
});

app.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new User(name, email, password);
  await createUser(user);
  res.status(201).json(user);
});

app.put("/", async (req: Request, res: Response) => {
  const { publicId, name, email, password } = req.body;
  const user = new User(name, email, password);
  user.publicId = publicId;
  await updateUser(user);
  res.status(200).json(user);
});

app.delete("/:id", async (req: Request, res: Response) => {
  const user = await deleteUser(req.params.id);
  res.status(200).json(user);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
