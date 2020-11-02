import customRepository from "../repositories/custom.repository";

import * as jwt from 'jsonwebtoken'
import  md5 from 'md5'
import randtoken from 'rand-token'
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
                        resolve({token: token, refreshToken: refreshToken, status: true}) 
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
                const token = jwt.sign(user, env.JWT_SECRET, { expiresIn: '10s' })
                resolve({token: token, status: true}) 
              }
              else {
                resolve({msg: 'Sessão expirada', status: true}) 
              }
        })
    }
    

}

export default new CustomService