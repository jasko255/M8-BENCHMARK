import createHttpError from 'http-errors'
import { verifyJWT } from './tools.js'
import UserModel from '../services/user/schema.js'

export const JWTMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(createHttpError(401, 'Header not found'))
  } else {
    try {
      const token = req.headers.authorization.replace('Bearer ', '')
      // console.log('Token from TOKEN.JS', token)

      const decodedToken = await verifyJWT(token)

      // console.log('decodedToken from TOKEN.JS', decodedToken)

      const user = await UserModel.findById(decodedToken._id)

      if (user) {
        req.user = user
        next()
      } else {
        next(createHttpError(404, 'User not found'))
      }
    } catch (err) {
      console.log(err)
      next(createHttpError(401, 'Token not found!'))
    }
  }
}
