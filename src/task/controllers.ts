import { Router } from "express";
import { PrismaClient, TaskStatus } from "@prisma/client";
import { createTask, findAll, findByID, finishingTask, startingTask } from "./service.js";

export const TaskRouter = Router();
const prisma = new PrismaClient();

TaskRouter.get("/", async (request, response) => {
    const taskStatus: string = (request.query.status as string) || "";
    const tasks = await findAll(taskStatus)
  return response.json(tasks);
})

  .get("/:id", async (request, response) => {
    const task = await findByID(request.params.id) 
    return response.json({ task });
  })

  .patch("/starting/:id", async (request, response) => {
    try {
     const taskUpdated= await startingTask(request.params.id)
      response.json({ taskUpdated });
    } catch (error: any) {
      response.status(404).json({ message: error.message });
    }
  })

  .patch("/finishing/:id", async (request, response) => {
    try {
     const taskUpdated =await finishingTask(request.params.id) 
      response.json({ taskUpdated });
    } catch (error: any) {
      response.status(404).json({ message: error.message });
    }
  })

  .post("/", async (request, response) => {
    
     const task = await createTask (request.body)

     response.json(task);
  });
