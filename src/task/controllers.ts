import { Router } from "express";
import { PrismaClient,$Enums } from "@prisma/client";

export const TaskRouter =  Router()
const prisma = new PrismaClient 

TaskRouter
.get("/",async(request,response)=> {
      const tasks = await prisma.task.findMany()
    response.json({tasks})
})

.get("/:id",async (request,response)=> {

    
    response.send(` tache ${request.params.id}`)
})

.post("/",async(request,response)=> {
    const {
        title,
        description
    }= request.body
    await prisma.task.create({data:{title,description,status:$Enums.TaskStatus.PENDING}})
    
    response.send(` tache:
        
         ${request.body.title}
         ${request.body.description}
         

         `)
    
})