import { findAll } from './usuario.swagger';

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Backend IPDV',
        description: 'Documentação de rota',
        termsOfService: '',
        contact: {
            name: 'Carlos Bruno',
            email: 'cbcarlos07@gmail.com',
            url: 'https://github.com/cbcarlos07'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: 'http://localhost:3334/api/v1',
            description: 'Local server'
        },
    ],
    components: {
        schemas: {},
        securitySchemes: {
            ApiKeyAuth: {
                type: "apiKey",
                name: "x-access-token",
                in: "header"
            }
        }
    },
    tags: [
        {
            name: 'Usuários'
        }
    ],
    paths: {
        "/usuario": {
            get: findAll
        },
        

        
    }
}