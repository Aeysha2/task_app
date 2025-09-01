import { Router } from "express";

export const UserRouter =  Router()


UserRouter.get("/users",(request,response)=> {
    
    response.send("liste des utilisateurs")
})

UserRouter.get("/users/:id",(request,response)=> {
    
    response.send(` utilisateur ${request.params.id}`)
})

UserRouter.post("/users",(request,response)=> {
    
    response.send(` utilisateur:
        
         ${request.body.firstname}
         ${request.body.lastname}
         ${request.body.email}
         ${request.body.password}

         `)
    
})