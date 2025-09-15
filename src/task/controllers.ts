import { Router } from "express";
import { PrismaClient, $Enums } from "@prisma/client";

export const TaskRouter = Router();
const prisma = new PrismaClient();

TaskRouter.get("/", async (request, response) => {
  const tasks = await prisma.task.findMany();
  response.json({ tasks });
})

  .get("/:id", async (request, response) => {
    const task = await prisma.task.findUnique({
      where: { id: request.params.id },
    });
    response.json({ task });
  })

  .patch("/starting/:id", async (request, response) => {
    try {
      const taskID = request.params.id;
      const task = await prisma.task.findUnique({ where: { id: taskID } });
      if (!task) throw new Error(`Tâche non trouvée avec cet ID. ${taskID}`);
      const taskUpdated = await prisma.task.update({
        where: { id: taskID },
        data: { status: $Enums.TaskStatus.STARTING },
      });

      response.json({ taskUpdated });
    } catch (error: any) {
      response.status(404).json({ message: error.message });
    }
  })

  .post("/", async (request, response) => {
    const { title, description } = request.body;
    await prisma.task.create({
      data: { title, description, status: $Enums.TaskStatus.PENDING },
    });

    response.send(` tache:
        
         ${request.body.title}
         ${request.body.description}
         

         `);
  });
