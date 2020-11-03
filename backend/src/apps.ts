import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import routerConfig from './routers'
import jwtMiddleware from './utils/jwt';
import * as swaggerUi from 'swagger-ui-express'
const environments = require('./config/environments')
import { swaggerDocument } from './openapi/swagger'
import CargoModel from './config/db/models/cargo.model';
import GenericService from './api/services/generic.service';
import realtime from './api/subscribe/realtime';
import schedule from './jobs/schedule'

class Application{
    app: express.Application
    port: any
    connection: any

    constructor(){
        this.app = express()
        this.port = environments.SERVER_PORT
        this.connection = new GenericService( CargoModel )
    }

    listen(){

        

        require('./config/db/database')
        let http = require("http").Server(this.app);
        let io = require("socket.io")(http);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded( { extended:false } ));
        realtime(io)
        schedule.setRealtime( io )
        this.connection
            .testConnection()
            .then(() => {
                this.enableCors()
                this.security()
                this.routes(  )
                http.listen( this.port, () =>{
                    console.log(`Api rodando da porta ${this.port}`);
                    
                })
                
            })
    }

    enableCors(){

        const options: cors.CorsOptions = {
            methods: 'GET, OPTIONS, POST, PUT, DELETE',
            origin: '*'
        }

        this.app.use(cors(options));

    }

    security(){
        const blocks = [
         
        ]
        this.app.use( jwtMiddleware( { blocks } ) )
    }


    routes(  ){
        let deps = {
            app: this.app
            
        }
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        routerConfig( deps )
    }
}

export default new Application