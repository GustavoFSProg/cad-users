import jwt from 'jsonwebtoken'

export async function generateToken(data: any) {
  const { email, password } = data
  return jwt.sign({ email, password }, process.env.SECRET as string & { asBytes: true }, {
    expiresIn: '1d',
  })
}

export function verifyToken(token: any) {
  return (
    jwt.verify(token, process.env.SECRET as string & { asBytes: true }),
    (error: any, decode: any) => {
      if (error) return { error } as any
      return { decode } as any
    }
  )
}
