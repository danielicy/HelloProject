const router = require('express').Router();
const formidable = require('formidable'); 

const Joi = require('joi');
const { response } = require('express');
const customerManager = require('../../modules/customersManager');

 

router.get('/customers',function (req,res,next) {
  customerManager.getCustomers()
.then(customers =>
  res.end(JSON.stringify(customers)))
  .catch(next);

});



 
 
  router.post('/customer',function(req,res,next) {
    customerManager.newCustomer(req.body)
.then(customers =>
  res.end(JSON.stringify(customers)))
  .catch(next);

})

router.put('/customer',function(req,res,next) {
  customerManager.editCustomer(req.body)
.then(customers =>
res.end(JSON.stringify(customers)))
.catch(next);

})


router.delete('/customer',function(req,res,next) {
  customerManager.deleteCustomer(req.body)
.then(customers =>
res.end(JSON.stringify(customers)))
.catch(next);

})



  module.exports = router;