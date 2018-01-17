let server = require("../server");
let connection = require("../connection");

/*
   Melding{
     overskrift: '',
     tekst: '',
     skrevet_av_bruker: '' //Bruker id

     //Option til bruker
     sendt_til_bruker: '' //Bruker id

     //Option til kollektiv
     sendt_til_kollektiv: '' //Kollektiv id
   }
*/

// Sende melding til bruker eller kollektiv
server.post('rest/melding',function(req,res,next){
  let melding = Object.assign({}, req.body);
  if('sendt' in melding)
    melding.sendt = new Date(melding.sendt).getTime();

  connection.query("INSERT INTO Melding SET ?", [melding], function(err, rows, fields){
    res.send(err ? err : rows);
    return next();
  });
});

// Hent meldinger skrevet av en bruker
server.get('rest/melding/sendt/bruker/:skrevet_av_bruker',function(req, res, next){
  connection.query("SELECT * FROM Melding WHERE skrevet_av_bruker=?", [req.params.skrevet_av_bruker], function(err, rows, fields){
    for(let melding of rows){
      if('sendt' in melding)
        melding.sendt = new Date(melding.sendt);
    }
    res.send(err ? err : rows);
    return next();
  });
});

// Hent meldinger til en bruker
server.get('rest/melding/motta/bruker/:sendt_til_bruker',function(req, res, next){
  connection.query("SELECT * FROM Melding WHERE sendt_til_bruker=?", [req.params.sendt_til_bruker], function(err, rows, fields){
    res.send(err ? err : rows);
    return next();
  });
});

// Hente meldinger til et kollektiv
server.get('rest/melding/motta/kollektiv/:sendt_til_kollektiv',function(req, res, next){
  connection.query("SELECT * FROM Melding WHERE sendt_til_kollektiv=? ORDER BY sendt DESC", [req.params.sendt_til_kollektiv], function(err, rows, fields){
    for(let melding of rows){
      if('sendt' in melding)
        melding.sendt = new Date(melding.sendt);
    }
    res.send(err ? err : rows);
    return next();
  });
});
//Slette en melding
