import { PrismaClient } from "@prisma/client";
import { CreateUser, LoginUser, UpdateUser } from "@src/type";
import { generateToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/sendMail.js";
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

export const forgotPassword = async (email:string)=> {
    // const user =  await prisma.user.findUnique({
    //   where: {email},
    // });
    // if (!user) throw new Error(`Utilisateur non trouvé avec cet email. ${email}`);
    const token = generateToken('user.id','user.email')
    const link = `http://localhost:5173/resetPassword/${token}`
    await sendEmail({to:email,html:link,subject:"Rénisation de mot de passe"})
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
    const {password, ...userWithoutPassword} = user
    if(isSamePassword)  return userWithoutPassword
    throw new Error("Les Mots de passe sont pas  identiques")
}