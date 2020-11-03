import customRepository from "../repositories/custom.repository";

import * as jwt from 'jsonwebtoken'
import  md5 from 'md5'
import randtoken from 'rand-token'
import schedule from "../../jobs/schedule";
const env = require('../../config/environments')


class CustomService{
    refreshTokens = {}
    obterTodosDepartamentoPorCentroCusto(){
        return customRepository.obterTodosDepartamentoPorCentroCusto()
    }

    obterUsuarioPorDepartamento(id: number){
        return customRepository.obterUsuarioPorDepartamento(id)
    }

    auth(email: string, senha: string){
        
        return new Promise((resolve, reject)=>{
            senha = md5( senha )
            return customRepository
                    .auth( email, senha )
                    .then( response =>{
                        if( !response ){
                            resolve({msg: 'Login ou senha incorretos', stauts: false})
                        }
                        const email = response.dataValues.email
                        const user = {
                            nome: response.dataValues.nome,
                            email
                        }
                        const token = jwt.sign(user, env.JWT_SECRET,  { expiresIn: "30s" })
                        const refreshToken = randtoken.uid(256)
                        this.refreshTokens[refreshToken] = email

                        schedule.configurarExpiracao( {data: new Date, email} )
                        resolve({token: token, refreshToken: refreshToken, status: true, user}) 
                    })

        })


    }

    refreshToken( _token: string, email: string, nome: string ){
        return new Promise((resolve, reject)=>{

            if((_token in this.refreshTokens) && (this.refreshTokens[_token] == email)) {
                const user = {
                    nome,
                    email
                }
                const token = jwt.sign(user, env.JWT_SECRET, { expiresIn: '60m' })
                resolve({token: token, status: true}) 
              }
              else {
                resolve({msg: 'Sessão expirada', status: true}) 
              }
        })
    }
    obterDepartamentoPorCentroCusto(id: number){
        return customRepository.obterDepartamentoPorCentroCusto(id)
    }

    salvarDeptoCentroCusto(centroCusto: number, depto: any){
        
        
        return new Promise(async (resolve, reject)=>{
            const cad: any = await this.cadastrados(centroCusto)
            
            
            let inserir = depto.filter(x => !cad.includes(x));
            
            let remover = cad.filter(x => !depto.includes(x));
            
            if( inserir.length == 0 && remover.length == 0 ){
                resolve({msg: 'Nada foi alterado', status: true})
            }

            let retorno = await this.removerInserir(inserir, remover, centroCusto)
            resolve(retorno)


        })
    }

    removerInserir(inserir, remover, centroCusto: number){
        return new Promise(async (resolve, reject)=>{
            let remove = await this.removerDados( remover, centroCusto )
            
            await this.inserirDados( inserir, centroCusto )
            resolve({msg: 'Dados inseridos', status: true})
        })
    }

    cadastrados(centroCusto: number){
        
        return new Promise(async (resolve, reject)=>{
            
            const getDepto = await this.obterDepartamentoPorCentroCusto( centroCusto )

            let deptos = getDepto._departamento.map( d => d.id)

            resolve( deptos )

        })  
    }

    removerDados(remover: any, centroCusto: number){
        return new Promise(async (resolve, reject)=>{
            if( remover.length > 0 ){
                let destroy = await customRepository
                                        .removerDeptoCentroCusto(remover, centroCusto)
                resolve(destroy)
            }else{
                resolve({})
            }
            
    
        })
    }

    inserirDados(inserir: any, centroCusto: number){
        return new Promise(async (resolve, reject)=>{
            if( inserir.length > 0 ){

                let prepareInsert = inserir.map( i =>{
                    return {
                        departamento_id: i,
                        centro_custo_id: centroCusto
                    }
                })

                let insert = await customRepository
                                        .inserirDeptoCentroCusto(prepareInsert)
                resolve(insert)
            }
    
        })
    }

    getUsersWithCargo(){
        return customRepository.getUsersWithCargo()
    }
    

}

export default new CustomService