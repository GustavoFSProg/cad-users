import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from './Token'

const prisma = new PrismaClient()

async function register(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).json({ msg: 'Success!!!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.user.findMany({
      take: Number(4),
      // skip: 1,

      orderBy: {
        creatAt: 'desc',
      },
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ msg: 'Error!!' })
  }
}

async function updateuser(req: Request, res: Response) {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
      },
    })

    return res.status(201).json({ msg: 'Success - Editado!!!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function remover(req: Request, res: Response) {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    })

    return res.status(201).json({ msg: 'Success - APAGADO!!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function Login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const data = { email, password }

    const user = await prisma.user.findFirst({
      where: { email: email, password: md5(req.body.password) },
    })

    if (!user) return res.status(401).send({ msg: 'User not Found!!' })

    const token = await generateToken(data)

    return res.status(200).json({ msg: 'Login in Success!!', token })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

export default { register, Login, remover, getAll, updateuser }
