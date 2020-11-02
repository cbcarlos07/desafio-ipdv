
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('depto_centro_custo', [        
        {
          departamento_id: 1,
          centro_custo_id: 1
        }
        
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('depto_centro_custo', null, {});
    
  }
};