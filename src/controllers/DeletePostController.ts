import { Request, Response } from "express";
import { prisma } from '../utils/prisma'
export async function DeletePost(request: Request, response: Response) {
    const { post_id } = request.params;
    const { id } = request.user;

    //procura o post a ser deletado
    const post = await prisma.post.findFirst({ where: { id: { equals: post_id } } });

    //verifica se o usuário é o autor do post
    if (id != post?.user_id) {
        return response.json("delete post nao autorizado").status(401);
    }

    await prisma.post.delete({where:{id:post_id}});
    
    return response.json("post deletado").status(202);
}