import createHttpError from 'http-errors'
import { Request, Response, NextFunction } from "express"

export const hostOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === 'host') {
    next()
  } else {
    next(createHttpError(403, 'Hosts only!'))
  }
}
