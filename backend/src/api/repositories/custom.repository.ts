import CentroCustoModel from "../../config/db/models/centro-custo.model";
import DepartamentoModel from "../../config/db/models/departamento.model";
import UsuarioModel from "../../config/db/models/usuario.model";
import DeptoCentroCustoModel from "../../config/db/models/depto-centro-custo.model";

class CustomRepository {
    inserirDeptoCentroCusto(prepareInsert: any) {
        return DeptoCentroCustoModel.bulkCreate( prepareInsert )
    }
    removerDeptoCentroCusto(remover: any, centroCusto: number) {
        return DeptoCentroCustoModel.destroy({
            where: {
                centro_custo_id: centroCusto,
                departamento_id: remover
            }
        })
    }

    getUsersWithCargo(){
        return UsuarioModel.findAll({
            attributes: {
                exclude: ['senha']
            },
            include: [
                {
                    association: '_cargo'
                },
                {
                    association: '_departamento'
                }
            ]
        })
    }


    obterTodosDepartamentoPorCentroCusto(){
        return CentroCustoModel.findAll({
            include: [
                {
                    association: '_departamento'
                }
            ]
        })
    }

    obterDepartamentoPorCentroCusto(id: number){
        return CentroCustoModel.findOne({
            where: {id},
            include: [
                {
                    association: '_departamento'
                }
            ]
        })
    }

    obterUsuarioPorDepartamento(id: number){
        return DepartamentoModel.findAll({
            where: { id },
            include: [
                {
                    association: '_users'
                }
            ]
        })
    }

    auth(email: string, senha: string){
        return UsuarioModel.findOne({
            where: {
                email, senha
            }
        })
    }

    

}


export default new CustomRepository