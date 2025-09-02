import EXPRESS from "express";
import {UserRouter} from "./user/controllers.js";
import {TaskRouter} from "./task/controllers.js";


const application = EXPRESS()
const port = 3000

application.use(EXPRESS.urlencoded({}))
application.use("/users",UserRouter)
application.use("/tasks",TaskRouter)


application.listen(port,()=> console.log(`connecter sur http://localhost:${port}`))


