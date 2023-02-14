
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma'
import { compare } from 'bcryptjs'

export async function AuthUser(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({ where: { email: { equals: email } } });

    if(!user){
        return response.json({message:"email invalido"}).status(401);
    }

    const hashPassword = await compare(password, user.password)

    if(!hashPassword){
        return response.json({message:"password invalido"}).status(401);
    }
    const dataUser = {
        id: user.id,
        email:user.email,
        name:user.name
    }
    const token = jwt.sign(dataUser, "300ecbe3232782c3431fa9361e060333");

    request.headers['authorization'] = token;

    return response.json({dataUser, token}).status(200);

}