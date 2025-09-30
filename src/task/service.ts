import { PrismaClient,  TaskStatus } from "@prisma/client";
import { CreateTask } from "@src/type";
const prisma = new PrismaClient();

export const findAll = async (taskStatus:string,userID:string) =>{
  if(!userID) throw new Error ("l'ID de l'utilisateur n'existe pas")
  const statusMap: Record<string,  TaskStatus> = {
    pending:  TaskStatus.PENDING,
    starting:  TaskStatus.STARTING,
    finishing: TaskStatus.FINISHING,
  };
if (taskStatus && statusMap[taskStatus]) {
    const statusValue = statusMap[taskStatus];
    const tasks = await prisma.task.findMany({
      where: { status: statusValue , userID},
    });

    return tasks;
  }

  return await prisma.task.findMany({
    where:{userID}
  });
  
}

export const findByID = async (id:string)=> {
    return   await prisma.task.findUnique({
      where: { id  },
    });
}

export const startingTask = async (id :string)=>{
    try {
          const task = await prisma.task.findUnique({ where: { id  } });
          if (!task) throw new Error(`Tâche non trouvée avec cet ID. ${id}`);
          if (task.status===TaskStatus.STARTING) {
            throw new Error ( "vous avez deja commencé cette tâche. vous devez la terminer" )
          };
          const taskUpdated = await prisma.task.update({
            where: { id },
            data: { status: TaskStatus.STARTING },
          });
          return taskUpdated ;
        } catch (error: any) {
          throw new Error ( error.message );
        }
}

export const finishingTask = async (id:string)=> {
    try {
          const task = await prisma.task.findUnique({ where: { id } });
          if (!task) throw new Error(`Tâche non trouvée avec cet ID. ${id}`);
          if (task.status===TaskStatus.PENDING) throw new Error(`Commencer la tache d'abord`);
          if (task.status===TaskStatus.FINISHING) {
           throw new Error ("tache deja terminee") 
            
          };
          
          const taskUpdated = await prisma.task.update({
            where: { id },
            data: { status: TaskStatus.FINISHING },
          });
    
          return  taskUpdated ;
        } catch (error: any) {
          throw new Error ( error.message );
        }
}

export const createTask = async(body: CreateTask)=> {   
      return await prisma.task.create({
      data: {title:body.title,description:body.description , status : TaskStatus.PENDING, userID:body.userID }
     });
}