import { Request, Response } from "express";
import { prisma } from '../utils/prisma';
import { hash } from 'bcryptjs'


export async function CreateUser(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if(name == ""||email==""|| password==""){
        return response.json({ message: "campo com dados inválido" }).status(401);

    }

    const user = await prisma.user.findFirst({ where: { email: { equals: email } } });


    if (user) {
        return response.json({ message: "email ja cadastrado" }).status(401);
    }

    const hashPassword = await hash(password, 8);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashPassword
        }
    });

    return response.json({ message: "usuário criado" }).status(201);
}