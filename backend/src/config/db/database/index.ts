import AssociationsTable from "../models/associate.model"
import CargoModel from "../models/cargo.model"
import CentroCustoModel from "../models/centro-custo.model"
import DepartamentoModel from "../models/departamento.model"
import UsuarioModel from "../models/usuario.model"

const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const connection = new Sequelize( dbConfig )

CargoModel.init( connection )
CentroCustoModel.init( connection )
DepartamentoModel.init( connection )
UsuarioModel.init( connection )

AssociationsTable.associateMany(DepartamentoModel, CentroCustoModel, 'depto_centro_custo', 'departamento_id','_centro_custo')
AssociationsTable.associateMany(CentroCustoModel, DepartamentoModel , 'depto_centro_custo', 'centro_custo_id','_departamento')
AssociationsTable.associate( UsuarioModel, DepartamentoModel, 'departamento_id', '_departamento' )
AssociationsTable.associate( UsuarioModel, CargoModel, 'cargo_id', '_cargo' )
AssociationsTable.associateHasMany( DepartamentoModel, UsuarioModel, 'departamento_id', '_users' )


export default connection