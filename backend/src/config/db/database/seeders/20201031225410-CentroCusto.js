
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('centro_custo', [        
        {
          nome: 'Laboratório de Desenvolvimento'
        }
        
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('centro_custo', null, {});
    
  }
};