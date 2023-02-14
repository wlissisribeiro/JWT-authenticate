import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

type DecodeType =  {
    id: string;
    email:string;
    name:string,
    iat: number
 }

export async function Authenticate(request: Request, response: Response, next: NextFunction) {
     const {authorization} = request.headers;

    const token = authorization?.split(" ")[1] || "";

    try {
        const decoder =  jwt.verify(token,"300ecbe3232782c3431fa9361e060333")
        console.log(decoder)
        request.user = decoder
        next()
    } catch (error) {
        return response.json({message:error})
    }
}