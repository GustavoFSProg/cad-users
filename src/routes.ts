import { Router } from 'express'
import userContnroller from './userController'
import { Request, Response } from 'express'
import { isAuthorized } from './authorize'

const route = Router()

route.get('/', (req: Request, res: Response) => {
  return res.send({ msg: ' 🍼 Api Running well!!' })
})

route.get('/get', isAuthorized, userContnroller.getAll)
route.post('/register', isAuthorized, userContnroller.register)
route.post('/login', userContnroller.Login)
route.put('/update/:id', isAuthorized, userContnroller.updateuser)
route.delete('/delete/:id', isAuthorized, userContnroller.remover)

export default route
