
 
const dataservice = require('../services/dataservice');

 

function getCustomers() {
    return new Promise(function(resolve,reject){
        dataservice.query("Select * FROM [bssltdDB].[dbo].[Customers] cust "+
        "INNER JOIN [bssltdDB].[dbo].[Addresses] addr "+
        "ON cust.CustomerNumber= addr.CustomerId "+
		"INNER JOIN [bssltdDB].[dbo].[RecordStatus] stat "+
		"ON cust.CustomerNumber = stat.Id "+
		"WHERE stat.IsDeleted =0 ")
        .then(response =>
            resolve(response))
        });

}


function newCustomer(newcustomer) {
    return new Promise(function(resolve,reject){
        const customer=newcustomer;
        var customerid;
        dataservice.query("INSERT INTO [bssltdDB].[dbo].[Customers] (Name) "+
       "VALUES ('"+customer.name +"' ) ")
        .then(res =>
           {
            dataservice.query("SELECT MAX([CustomerNumber]) "+
            "FROM [bssltdDB].[dbo].[Customers]")
            .then(
                data =>
               {
               var val= JSON.stringify(data.recordset[0]).replace('""','"value"');
                    console.log(data.recordset[0]);
                    customerid=JSON.parse(val)["value"];
                dataservice.query("INSERT INTO [bssltdDB].[dbo].[Addresses] (CustomerId,Street,City) " +
                "VALUES ('"+ customerid +"','"+ customer.street+"','"+customer.city +"')")
                .then(
                    data =>
                    {
                        dataservice.query("INSERT INTO [bssltdDB].[dbo].[RecordStatus] (Id,IsDeleted,Created,Updated) "+
                        "VALUES ("+customerid+",0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)")
                        .then(
                            data =>
                           resolve(data)
                           
        
                        )
                    }
                   

                )
            
            
            }
            )
           } 
        );
        })
        ;

}


function editCustomer(customer){

    //To do
//Update customer query


}

function deleteCustomer(customer){

    //To do
//Delete customer query


}
 

 



 
 module.exports.getCustomers = getCustomers;
 module.exports.newCustomer = newCustomer;
 module.exports.editCustomer = editCustomer;
 module.exports.deleteCustomer = deleteCustomer;