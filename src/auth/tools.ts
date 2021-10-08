import jwt from 'jsonwebtoken'
import UserModel from '../services/user/schema.js'

const generateJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2w' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  )

 

// const generateRefreshJWT = (payload) =>
//   new Promise((resolve, reject) =>
//     jwt.sign(
//       payload,
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: '1 week' },
//       (err, token) => {
//         if (err) reject(err)
//         resolve(token)
//       }
//     )
//   )

export const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )

// export const verifyRefreshJWT = (token) =>
//   new Promise((resolve, reject) =>
//     jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decodedToken) => {
//       if (err) reject(err)
//       resolve(decodedToken)
//     })
//   )

export const JWTAuthenticate = async (user) => {
  console.log('user HEEEERE', user)
  const accessToken = await generateJWT({ _id: user._id, role: user.role })
  // const refreshToken = await generateRefreshJWT({ _id: user._id })
  // console.log('refreshToken on tooooools', refreshToken)

  // user.refreshToken = refreshToken
  // await user.save()

  return { accessToken }
}

// export const refreshTokens = async (actualRefreshToken) => {
//   try {
//     const decodedRefreshToken = await verifyRefreshJWT(actualRefreshToken)

//     const user = await UserModel.findById(decodedRefreshToken._id)

//     if (!user) throw new Error('User not found')

//     if (user.refreshToken === actualRefreshToken) {
//       const { accessToken, refreshToken } = await JWTAuthenticate(user)
//       return { accessToken, refreshToken }
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }
