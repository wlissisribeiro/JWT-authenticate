import { Request, Response } from "express";
import { prisma } from '../utils/prisma'

export async function ListPostsUser(request: Request, response: Response) {
    const { user } = request;
    console.log(user.id)
    const posts = await prisma.post.findMany({ where: { user_id: { equals: user.id } } })
    return response.json(posts).status(200)

}