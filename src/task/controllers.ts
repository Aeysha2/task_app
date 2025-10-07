import { Router } from "express";
import {
  createTask,
  findAll,
  findByID,
  finishingTask,
  startingTask,
} from "./service.js";

export const TaskRouter = Router();
TaskRouter.get("/", async (request:any, response:any) => {
   try {
    const taskStatus: string = (request.query.status as string) || "";
    const tasks = await findAll(taskStatus, request.userID);
    return response.json(tasks);
  } catch (error: any) {
    response.status(404).json({ message: error.message });
  }
})

  .get("/:id", async (request, response) => {
    const task = await findByID(request.params.id);
    return response.json({ task });
  })

  .patch("/starting/:id", async (request, response) => {
    try {
      const taskUpdated = await startingTask(request.params.id);
      response.json({ taskUpdated });
    } catch (error: any) {
      response.status(404).json({ message: error.message });
    }
  })

  .patch("/finishing/:id", async (request, response) => {
    try {
      const taskUpdated = await finishingTask(request.params.id);
      response.json({ taskUpdated });
    } catch (error: any) {
      response.status(404).json({ message: error.message });
    }
  })

  .post("/", async (request:any, response:any) => {
    const task = await createTask({...request.body,userID:request.userID});
    response.json({task});
  });
