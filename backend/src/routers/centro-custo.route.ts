import { Router } from 'express'
import centroCustoController from '../api/controllers/centroCusto.Controller'

const router = Router()

router.route('/').get( centroCustoController.obterTodosDepartamentoPorCentroCusto )


export default router