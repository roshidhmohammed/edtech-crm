import type { Request, Response,NextFunction, RequestHandler } from "express"

function asyncCatchError(fn:RequestHandler) {
    return function(req:Request, res:Response, next:NextFunction) {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export default asyncCatchError