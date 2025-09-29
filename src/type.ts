export type CreateUser = {
    email: string,
    firstname:string,
    lastname:string,
    password: string
}
export type UpdateUser = Partial<Omit<CreateUser, "password">>

export type CreateTask ={
    title:string,
    description:string
}


