import jwt from "jsonwebtoken";

export const Auth = (request: any, response: any, next: any) => {
  try {
    const authorization = request.headers.authorization;
    if (!authorization) throw new Error("Connecter vous svp!");
    const [type, token] = authorization.split(" ");

   const  decodeToken = jwt.decode(token)
    
    console.log(decodeToken);
    

    next();
  } catch (error:any) {
    response.status(403).json({message:error.message})
  }
};
