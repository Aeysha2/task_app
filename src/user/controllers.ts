import { Router } from "express";
import { createUser, findAll, findByID, updateByID } from "./service.js";

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
  });
