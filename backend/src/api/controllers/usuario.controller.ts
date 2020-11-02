
import GenericService from '../services/generic.service'
import { Request, Response } from "express";
import UsuarioModel from '../../config/db/models/usuario.model';
import customService from '../services/custom.service';
let service: any

class UsuarioController {    
    
    constructor(){
        service = new GenericService(UsuarioModel)
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
                       console.log(response);
                       
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

    auth(req: Request, resp: Response ){
        const { email, senha } = req.body
        
        return customService
                   .auth( email, senha )
                   .then( (response: any) =>{
                        resp.status(200).json( response )
                    }).catch( e => {
                        console.log(e);
                        
                        resp.status(204).json( {msg: "Falha ao buscar item!"} )
                    })
    }

    refreshToken( req: Request, resp: Response ){
        const { refreshToken, email, nome } = req.body
        return customService
                   .refreshToken( refreshToken, email, nome )
                   .then( (response: any) =>{
                        resp.status(200).json( response )
                    }).catch( e => {
                        resp.status(204).json( {msg: "Falha ao atualizar token!"} )
                    })
    }

}


export default new UsuarioController