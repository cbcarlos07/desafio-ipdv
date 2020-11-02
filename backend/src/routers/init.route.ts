import { Router } from 'express'
const initRoute = Router()

initRoute.route('').get( (req, res) =>{
    res.json({msg: 'IPDV API'}).status(200)  
})

export default initRoute