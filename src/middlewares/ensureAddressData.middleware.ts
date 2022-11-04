import { Request, Response, NextFunction } from "express"

const ensureAddressDataMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.address.state.length > 2 || req.body.address.zipCode.length > 8){
        return res.status(400).json({
            message: "State shouldn't have more than 2 digits and zipCode shouldn't have more than 8 digits"
        })
    }

    return next()
}

export default ensureAddressDataMiddleware