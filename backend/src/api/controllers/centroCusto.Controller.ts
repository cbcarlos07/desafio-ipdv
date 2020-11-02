

import { Request, Response } from "express";
import customService from "../services/custom.service";


class CentroCustoController {    
    

    obterTodosDepartamentoPorCentroCusto(req: Request, resp: Response){
        return customService
                   .obterTodosDepartamentoPorCentroCusto()
                    .then( (response: any) =>{
                        resp.status(200).json( response )
                    }).catch( e => {
                        resp.status(204).json( {msg: "Falha ao tentar buscar item!"} )
                    })
    }

    
}


export default new CentroCustoController