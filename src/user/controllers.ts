import { Router } from "express";
import { createUser, findAll, findByID, loginUser, updateByID } from "./service.js";
import { generateToken } from "../utils/jwt.js";

export const UserRouter = Router();
UserRouter.get("/", async (request, response) => {
    response.json({ user:await findAll() });

} )

  .get("/:id", async (request, response) => {
    response.json({ user: await findByID(request.params.id) });
  })

  .put("/:id", async (request, response) => {
   
    response.json({ user: await updateByID( request.params.id, request.body) });
  })
  

  .post("/", async (request, response) => {
    const user = await createUser(request.body)
    response.json({ user });
  })

  .post("/login", async(request,response)=> {
    try {
      const user = await loginUser({email:request.body.email  , password:request.body.password})
      const token = generateToken(user.id,user.email)
      response.json({token})
    } 
    catch(error:any) {
      response.status(403).json({message:error.message})
      
    }

  })
