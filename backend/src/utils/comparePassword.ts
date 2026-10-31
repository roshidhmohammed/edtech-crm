import bcrypt from "bcrypt";

export async function comparePassword(password:string, hashedPassword:string) {
    const isPasswordExist = await bcrypt.compare(password, hashedPassword)
    return isPasswordExist
}