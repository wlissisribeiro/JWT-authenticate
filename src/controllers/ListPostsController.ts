import { Request, Response } from "express";
import { prisma } from '../utils/prisma'

export async function ListPosts(request:Request, response:Response) {
    const posts = await prisma.post.findMany();

    return response.json(posts).status(200);
}