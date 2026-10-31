import jwt from "jsonwebtoken"
import AppError from "../middlewares/appError"
import env from "../config/env.js"

const JWT_SECRET = env.JWT_SECRET

export async function generateaccessToken(id:string, email:string) {
    if(!JWT_SECRET){
       return  new AppError("Please try again", 400)
    }
const accessToken = jwt.sign(
    {
        id:id,
        email:email,
        role:"ADMIN"
    },
    JWT_SECRET,
    {expiresIn: "1d"}
)
return accessToken
}