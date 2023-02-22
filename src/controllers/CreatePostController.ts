import { Request, Response } from "express";
import { prisma } from '../utils/prisma';
import { hash } from 'bcryptjs'


export async function CreatePost(request: Request, response: Response) {
    const { title, content } = request.body;
    const { id } = request.user
    // const user = await prisma.user.findFirst({ where: { id: { equals: user_id } } });

    if (title == "" || content == "") {
        return response.json({ message: "campo ausente" }).status(201);
    }

    if (!id) {
        return response.json({ message: "author invalido" }).status(201);
    }

    await prisma.post.create({
        data: {
            title,
            content,
            user_id: id
        }
    });

    return response.json({ message: "post criado" }).status(201);
}