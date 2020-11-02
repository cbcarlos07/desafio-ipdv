
import GenericService from '../services/generic.service'
import { Request, Response } from "express";
import DepartamentoModel from '../../config/db/models/departamento.model';
import customService from '../services/custom.service';
let service: any

class DepartamentoController {    
    
    constructor(){
        service = new GenericService(DepartamentoModel)
    }

    create(req: Request, resp: Response){
        
        return service
                   .create( req.body )
                    .then( (response: any) =>{
                        resp.status(200).json( {msg: "Item salvo com sucesso!", id: response.id} )
                    }).catch( e => {
                    resp.status(204).json( {msg: "Falha ao tentar adicionar item!"} )
                    })
    }

    update( req: Request, resp: Response ){
        return service
                   .update( req.params.id, req.body )
                   .then( (response: any) =>{                       
                       
                        resp.status(200).json( {msg: "Item atualizado com sucesso!"} )
                    }).catch( e => {
                    resp.status(204).json( {msg: "Falha ao tentar atualizar item!"} )
                    })
    }

    delete( req: Request, resp: Response ){
        return service
                   .delete( req.params.id )
                   .then( (response: any) =>{
                        resp.status(200).json( {msg: "Item removido com sucesso!"} )
                    }).catch( e => {
                        resp.status(204).json( {msg: "Falha ao tentar remover item!"} )
                    })
    }

    findByPK(req: Request, resp: Response){
        return service
                   .findByPk( req.params.id )
                   .then( (response: any) =>{
                        resp.status(200).json( response )
                    }).catch( e => {
                        resp.status(204).json( {msg: "Falha ao tentar remover item!"} )
                    })
    }

    findAll( req: Request, resp: Response ){
        return service
                   .findAll( )
                   .then( (response: any) =>{
                        resp.status(200).json( response )
                    }).catch( e => {
                        resp.status(204).json( {msg: "Falha ao buscar item!"} )
                    })
    }

    localizarPorDepartamento(req: Request, resp: Response ){
        return customService
                .obterUsuarioPorDepartamento( Number( req.params.id ) )
                .then( (response: any) =>{
                    resp.status(200).json( response )
                }).catch( e => {
                    console.log(e);
                    
                    resp.status(204).json( {msg: "Falha ao buscar item!"} )
                })
    }

}


export default new DepartamentoController