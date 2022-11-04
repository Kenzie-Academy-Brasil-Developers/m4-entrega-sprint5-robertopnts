import { Request, Response, NextFunction } from "express";

const ensureCommercialTimeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const hourValidate = new Date(`${req.body.date} ${req.body.hour}`).getHours()
    if(hourValidate < 8 || hourValidate >= 18){
        return res.status(400).json({
            message: "You can schedule a visit only between 8h and 18h"
        })
    }

    const dateValidate = new Date(`${req.body.date} ${req.body.hour}`).getDay()
    if(dateValidate < 1 || dateValidate > 5){
        return res.status(400).json({
            message: "You can schedule a visit only between monday and friday"
        })
    }

    return next()
}

export default ensureCommercialTimeMiddleware