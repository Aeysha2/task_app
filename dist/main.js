import EXPRESS from "express";
import { UserRouter } from "@src/user/controllers";
const application = EXPRESS();
const port = 3000;
application.use(EXPRESS.urlencoded({}));
application.use(UserRouter);
application.listen(port, () => console.log(`connecter sur http://localhost:${port}`));
