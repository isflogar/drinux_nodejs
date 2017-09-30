exports.list = function(req, res){
  req.getConnection(function(err,connection){
    query = connection.query('SELECT * FROM directory ',function(err,rows){
      if(err){
        console.log("Error Selecting : %s ",err );
      }
      res.render('list',{page_title:"Lista de Directory",data:rows});
    });
  });
};

exports.add = function(req, res){
  res.render('add',{page_title:"Registrar Directory"});
};

exports.save = function(req,res){
  input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function (err, connection){
    data = {
      nombre    : input.nombre,
      apellidos : input.apellidos,
      edad   : input.edad,
      direccion   : input.direccion,
      telefono   : input.telefono
    };

    query = connection.query("INSERT INTO directory set ? ",data, function(err, rows){
      if (err){
        console.log("Error inserting : %s ",err );
      }
      res.redirect('/');
    });
  });
};

exports.get = function(req, res){
  id = req.params.id;
  req.getConnection(function(err,connection){
    query = connection.query('SELECT * FROM directory WHERE id = ?',[id],function(err,rows){
      res.render('edit',{page_title:"Editar",data:rows});
      if (err){
        console.log("Error inserting : %s ",err );
      }
    });
  });
};

exports.edit = function(req,res){
  input = JSON.parse(JSON.stringify(req.body));
  id = req.params.id;

  req.getConnection(function (err, connection){
    data = {
      nombre    : input.nombre,
      apellidos : input.apellidos,
      edad   : input.edad,
      direccion   : input.direccion,
      telefono   : input.telefono
    };

    connection.query("UPDATE directory SET ? WHERE id = ? ",[data,id], function(err, rows)
    {
      res.redirect('/');
    });

  });
};


exports.delete = function(req,res){
  id = req.params.id;
  req.getConnection(function (err, connection) {
    connection.query("DELETE FROM directory  WHERE id = ? ",[id], function(err, rows){
      if(err){
        console.log("Error deleting : %s ",err );
      }
      res.redirect('/');
    });
  });
};


