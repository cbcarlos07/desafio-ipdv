'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('depto_centro_custo', { 
        
        departamento_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do departamento',
          references: { model: 'departamento', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        centro_custo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Codigo do centro de custo',
          references: { model: 'centro_custo', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      });
      
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('users');
    
  }
};
