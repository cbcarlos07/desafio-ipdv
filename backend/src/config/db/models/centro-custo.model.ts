import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class CentroCustoModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING           
        }, { 
            tableName: 'centro_custo',
            sequelize 
        })
    }



}



export default CentroCustoModel