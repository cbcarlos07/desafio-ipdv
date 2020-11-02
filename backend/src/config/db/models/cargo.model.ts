import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class CargoModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING           
        }, { 
            tableName: 'cargo',
            sequelize 
        })
    }



}



export default CargoModel