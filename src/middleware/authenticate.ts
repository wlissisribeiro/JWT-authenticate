import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


export async function Authenticate(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (authorization) {
        const token = authorization?.split(" ")[1] || "";

        jwt.verify(token, "300ecbe3232782c3431fa9361e060333", (err, user) => {
            if (err) {
                return response.status(403).json({ message: "token invalido" })
            }
            request.user = user;

            next();
        })
    }else{
        return response.status(403).json({ message: "voce nao está autenticado" })
    }
}