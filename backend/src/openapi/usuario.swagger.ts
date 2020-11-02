let usuario = {
    id: {
        type: 'number',
        description: 'Código do usuário'
    },
    nome: {
        type: 'string',
        description: 'Nome do produto'
    }
}
export const findAll = {
    tags: ['Produto'],
    description: "Returna lista de todos os usuários ",
    operationId: 'findAll',
    security: [
        {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-access-token'
              }
        }
    ],
    responses: {
        "200": {          
            description: "Uma lista de usuários.",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: usuario
                    }
                }
            }
        }
    }
} 