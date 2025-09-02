import { Router } from "express";

export const TaskRouter =  Router()

TaskRouter
.get("/",(request,response)=> {
    
    response.send("liste des taches")
})

.get("/:id",(request,response)=> {
    
    response.send(` tache ${request.params.id}`)
})

.post("/",(request,response)=> {
    
    response.send(` tache:
        
         ${request.body.title}
         ${request.body.description}
         

         `)
    
})