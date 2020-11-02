import CentroCustoModel from "../../config/db/models/centro-custo.model";
import DepartamentoModel from "../../config/db/models/departamento.model";
import UsuarioModel from "../../config/db/models/usuario.model";

class CustomRepository {


    obterTodosDepartamentoPorCentroCusto(){
        return CentroCustoModel.findAll({
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