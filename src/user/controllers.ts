import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export const UserRouter =  Router()
const prisma = new PrismaClient()
UserRouter
.get("/",async (request,response)=> {
    const users = await prisma.user.findMany()
    response.json({users})
})

.get("/:id",(request,response)=> {
    
    response.send(` utilisateur ${request.params.id}`)
})

.post("/", async (request,response)=> {
    const {
        email,
        firstname,
        lastname,
        password
    } = request.body
    await prisma.user.create({data:{email,firstname,lastname,password}})
    
    response.send(` utilisateur:
        
         ${request.body.firstname}
         ${request.body.lastname}
         ${request.body.email}
         ${request.body.password}

         `)
    
})