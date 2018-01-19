let fs = require('fs');
let sql_statements = fs.readFileSync('backend/test/clearDB.sql','utf8');
let connection = require('../REST/connection_test');

module.exports = function(callback){
  // Ekstra sikkerhetssjekk - ikke clear basen hvis vi ikke har valgt testbasen.
  // Det kan være at prod-basen er valgt ved en feil.
  if(connection.config.database === 'oddbjool'){
    connection.query(sql_statements, [], (err, rows, fields) => {
      callback();
    });
  }
};

