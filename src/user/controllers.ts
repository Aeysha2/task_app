import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export const UserRouter = Router();
const prisma = new PrismaClient();
UserRouter.get("/", async (request, response) => {
  const users = await prisma.user.findMany();
  response.json({ users });
})

  .get("/:id", async (request, response) => {
    const user = await prisma.user.findUnique({
      where: { id: request.params.id },
    });
    response.json({ user });
  })

  .put("/:id", async (request, response) => {
    const userID =request.params.id
    const user = await prisma.user.findUnique({
      where: { id: request.params.id },
    });
    if (!user) throw new Error(`Utilisateur non trouvé avec cet ID. ${userID}`);
    const { email, firstname, lastname } = request.body;
    
    const userUpdated = await prisma.user.update({
            where: { id: userID },
            data: { firstname,lastname,email },
          });    
    response.json({ user });
  })
  

  .post("/", async (request, response) => {
    const { email, firstname, lastname, password } = request.body;
    const user = await prisma.user.create({
      data: { email, firstname, lastname, password },
    });
    response.json({ user });
  });
