import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class DepartamentoModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING
        }, { 
            tableName: 'departamento',
            sequelize 
        })
    }



}



export default DepartamentoModel