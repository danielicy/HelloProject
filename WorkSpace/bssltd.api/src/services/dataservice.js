
const mssql = require('mssql');
//const config = require('config');



//var sqlConfig = config.get('sql');

// More here -> https://www.npmjs.com/package/mssql
var sql = require('mssql/msnodesqlv8');
var config = {
  connectionString: 'Driver=SQL Server;Server=.\;Database=bssltdDB;Trusted_Connection=true;'
};

sql.connect(config, err => {
  new sql.Request().query('', (err, result) => {
    
    if(err) { // SQL error, but connection OK.
      console.log("SQL Connectio Exception: "+ err);
    } else { // All is rosey in your garden.
      console.dir(result);
    };
  });
});
sql.on('error', err => { // Connection borked.
  console.log("Opps..." + err);
   
});

function query(qry){
return new Promise(function(resolve,reject){
  sql.query(qry,  function(err,result)  {

    if(err){ 
      console.log("query error " + err)
      throw err}
    
    
    resolve(result);

  })
})
}





module.exports.query = query;





