import { PrismaClient } from "@prisma/client";
import { CreateUser, LoginUser, UpdateUser } from "@src/type";
import { generateToken } from "@src/utils/jwt.js";
import { hash,compare } from "bcrypt";
const prisma = new PrismaClient();

export const findAll = async () => {
  return await prisma.user.findMany();
}

export const  findByID = async (id:string) =>{
 return await prisma.user.findUnique({
      where: { id},
    })
}

export const updateByID = async (id:string, body:UpdateUser)=> {
    const user = await prisma.user.findUnique({
      where: {id},
    });
    if (!user) throw new Error(`Utilisateur non trouvé avec cet ID. ${id}`);
    if (!body.firstname)  body.firstname=user.firstname
    if (!body.email)  body.email=user.email
    if (!body.lastname)  body.lastname=user.lastname

     return await prisma.user.update({
            where: { id },
            data: body,
          });    
}

export const createUser = async (body:CreateUser) => {
  body.password= await hash(body.password, 10)
    return await prisma.user.create({
      data: body ,
    })
}

export const loginUser = async (body: LoginUser) => {
  const user = await prisma.user.findUnique({
    where: {email:body.email}})
    if(!user) throw new Error("l'utilisateur n'existe pas")
    const isSamePassword = await compare (body.password,user.password)
    if(isSamePassword) return generateToken(user.id,user.email)
    throw new Error("Les Mots de passe sont pas  identiques")
}