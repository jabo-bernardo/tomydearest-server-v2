import * as jwt from 'jsonwebtoken'

type JwtPayload = Parameters<typeof jwt.sign>[0];

const generateJwtToken = (jwtData: JwtPayload) => {
  const { JWT_SECRET_KEY } = process.env;
  
  if (!JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined')
  }
  
  return jwt.sign(jwtData, JWT_SECRET_KEY as string)
}

const verifyJwtToken = (token: string) => {
  const { JWT_SECRET_KEY } = process.env;
  
  if (!JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined')
  }
  
  return jwt.verify(token, JWT_SECRET_KEY as string)
}

export { generateJwtToken, verifyJwtToken }
