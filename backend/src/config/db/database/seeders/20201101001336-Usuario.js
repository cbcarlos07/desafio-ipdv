
'use strict';
const md5 = require('md5')
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('usuario', [        
        {
          nome: 'Carlos Bruno',
          email: 'carlos@email.com',
          senha: md5('123'),
          cargo_id: 1,
          departamento_id: 1
        }
        
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('usuario', null, {});
    
  }
};