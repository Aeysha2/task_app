import { Router } from "express";
import { createUser, findAll, findByID, loginUser, updateByID,forgotPassword } from "./service.js";
import { generateToken } from "../utils/jwt.js";
import { Auth } from "../middleware/auth.js";

export const UserRouter = Router();
UserRouter.get("/", Auth ,async (request:any, response:any) => {
    response.json({ user:await findAll() });
} )

  .get("/:id", Auth ,async (request, response) => {
    response.json({ user: await findByID(request.params.id) });
  })
  
  .get("/me", Auth ,async (request:any, response) => {
    response.json({ user: await findByID(request.userID) });
  })

  .get("/forgotPassword/:email", Auth ,async (request, response) => {
    try {
      await forgotPassword(request.params.email)
    response.json({ 
      message: `Verifier votre email (${request.params.email}), nous vous avons envoyé un lien de renitialisation`});
    } catch (error) {
      response.status(403).json({message:"génération de lien de renitialisation de mot de passe echoué"})
    }
  })

  .put("/:id",Auth, async (request, response) => {
   
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
