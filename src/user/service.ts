import { PrismaClient } from "@prisma/client";
import { CreateUser, UpdateUser } from "@src/type";
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
    return await prisma.user.create({
      data: body ,
    })
}