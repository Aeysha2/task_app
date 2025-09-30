import { sign } from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "secret_dev_key"; 

export const generateToken = (userId: string, email: string) => {
  return sign(
    { userId, email },          
    SECRET_KEY,                 
    { expiresIn: "1h" }         
  );
};