import { Request, Response, NextFunction } from "express";

const ensureUpdateDataMiddleware = async( req: Request, res: Response, next: NextFunction) => {
      
    if(req.body.id !== undefined || req.body.isAdm !== undefined || req.body.isActive !== undefined) {
        return res.status(401).json({
            message: "You can't update some given infos"
        })
    }

    return next()
}

export default ensureUpdateDataMiddleware