
import usuarioRoute from './usuario.route'
import cargoRoute from './cargo.route'
import departamentoRoute from './departamento.route'
import centroCustoRoute from './centro-custo.route'
import initRoute from './init.route'
import socketRouter from './socket.route'
const prefix = '/api/v1'

const routerConfig = deps =>{
    const {app} = deps
    app.use(`/`, initRoute)
    app.use(`/`, socketRouter)
    app.use(`${prefix}/centro-custo`, centroCustoRoute)
    app.use(`${prefix}/cargo`, cargoRoute)
    app.use(`${prefix}/usuario`, usuarioRoute)
    app.use(`${prefix}/departamento`, departamentoRoute)

}

export default routerConfig