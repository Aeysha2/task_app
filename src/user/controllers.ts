import { Router } from "express";

export const UserRouter =  Router()

UserRouter
.get("/",(request,response)=> {
    
    response.send("liste des utilisateurs")
})

.get("/:id",(request,response)=> {
    
    response.send(` utilisateur ${request.params.id}`)
})

.post("/",(request,response)=> {
    
    response.send(` utilisateur:
        
         ${request.body.firstname}
         ${request.body.lastname}
         ${request.body.email}
         ${request.body.password}

         `)
    
})