import EXPRESS from "express";
import {UserRouter} from "./user/controllers.js";
import cors from "cors"
import {TaskRouter} from "./task/controllers.js";
import { Auth } from "./middleware/auth.js";


const application = EXPRESS()
const port = 3000
application.use(cors())
application.use(EXPRESS.json())
application.use(EXPRESS.urlencoded({}))
application.use("/users",UserRouter)
application.use("/tasks",Auth,TaskRouter)



application.listen(port,()=> console.log(`connecter sur http://localhost:${port}`))


