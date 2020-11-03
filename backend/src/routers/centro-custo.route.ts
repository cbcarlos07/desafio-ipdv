import { Router } from 'express'
import centroCustoController from '../api/controllers/centroCusto.Controller'

const router = Router()

router.route('/').get( centroCustoController.obterTodosDepartamentoPorCentroCusto )

router.route('/').post( centroCustoController.create )

router.route('/:id').put( centroCustoController.update )

router.route('/:id').delete( centroCustoController.delete )

router.route('/:id').get( centroCustoController.findByPK )

router.route('/').get( centroCustoController.findAll )


router.route('/:id/depto').get( centroCustoController.obterDepartamentoPorCentroCusto )
router.route('/:id/depto/save').post( centroCustoController.salvarDeptoCentroCusto )

export default router