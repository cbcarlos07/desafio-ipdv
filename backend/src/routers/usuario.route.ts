import { Router } from 'express'

import UsuarioController from '../api/controllers/usuario.controller'






const usuarioRouter = Router()

usuarioRouter.route('/').post( UsuarioController.create )

usuarioRouter.route('/:id').put( UsuarioController.update )

usuarioRouter.route('/:id').delete( UsuarioController.delete )

usuarioRouter.route('/:id').get( UsuarioController.findByPK )

usuarioRouter.route('/').get( UsuarioController.findAll )

usuarioRouter.route('/auth/logar').post( UsuarioController.auth )

usuarioRouter.route('/auth/renew-token').post( UsuarioController.refreshToken )

export  default usuarioRouter