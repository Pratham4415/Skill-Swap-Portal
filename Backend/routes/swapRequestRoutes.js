const express = require('express');
const { verifyToken } = require('../middleware/authmiddleware');
const { createRequest, getsentrequests, getreceivedrequests, rejectacceptrequest, completerequest } = require('../controllers/skillSwapController');
const route = express.Router(); 
                    
route.post('/dorequest',verifyToken,createRequest )
route.get('/sent', verifyToken,getsentrequests )
route.get('/received', verifyToken,getreceivedrequests )
route.put('/acceptorreject/:id/respond', verifyToken, rejectacceptrequest)
route.put('/:id/complete', verifyToken, completerequest)

exports.route = route;
