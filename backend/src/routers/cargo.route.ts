import { Router } from 'express'
import cargoController from '../api/controllers/cargo.controller'

const controller = cargoController

const cargoRouter = Router()

cargoRouter.route('/').post( controller.create )

cargoRouter.route('/:id').put( controller.update )

cargoRouter.route('/:id').delete( controller.delete )

cargoRouter.route('/:id').get( controller.findByPK )

cargoRouter.route('/').get( controller.findAll )

export default cargoRouter