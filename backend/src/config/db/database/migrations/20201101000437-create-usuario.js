'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('usuario', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: 'ID da tabela'
        },
        nome: {
          type: Sequelize.STRING( 100 ),
          allowNull: false,
          comment: 'Nome do usuário'
        },
        email: {
          type: Sequelize.STRING( 100 ),
          allowNull: false,
          comment: 'Email do usuário'
        },
        senha: {
          type: Sequelize.STRING( 255 ),
          allowNull: false,
          comment: 'Senha do usuário'
        },
        cargo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do cargo',
          references: { model: 'cargo', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        departamento_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do departamento',
          references: { model: 'departamento', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('users');
    
  }
};
