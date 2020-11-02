import { Router } from 'express'

import departamentoController from '../api/controllers/departamento.controller'

const controller = departamentoController

const departamentoRouter = Router()

departamentoRouter.route('/').post( controller.create )

departamentoRouter.route('/:id').put( controller.update )

departamentoRouter.route('/:id').delete( controller.delete )

departamentoRouter.route('/:id').get( controller.findByPK )

departamentoRouter.route('/').get( controller.findAll )

departamentoRouter.route('/users/:id').get( controller.localizarPorDepartamento )

export default departamentoRouter