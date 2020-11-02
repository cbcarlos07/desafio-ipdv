import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class DeptoCentroCustoModel extends Model {

    static init( sequelize ){
        super.init({
            departamento_id: DataTypes.INTEGER,
            centro_custo_id: DataTypes.INTEGER,
        }, { 
            tableName: 'depto_centro_custo',
            sequelize 
        })
    }



}



export default DeptoCentroCustoModel