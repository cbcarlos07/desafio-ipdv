import { Router } from 'express'

const router = Router()
router.route( '/socket.io' ).get( (req, res, next) =>{
    res.send(req.params)
})

router.route( '/socket.io' ).post( (req, res, next) =>{
    res.send(req.body)
})

export default router
