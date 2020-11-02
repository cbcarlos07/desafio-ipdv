import { DataTypes} from 'sequelize'
import { Model } from 'sequelize-typescript'
class UsuarioModel extends Model {

    static init( sequelize ){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            cargo_id: DataTypes.INTEGER,
            departamento_id: DataTypes.INTEGER,
        }, { 
            tableName: 'usuario',
            sequelize 
        })
    }



}



export default UsuarioModel