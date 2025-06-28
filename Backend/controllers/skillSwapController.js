const skillswapmodel = require('../models/skillswaprequestModel');

exports.createRequest = async(req,res) => {
    try{
        const requestObject = {...req?.body};
        requestObject.fromUser = req?.user?._id; 
        if(!requestObject.toUser || !requestObject.skillOffered || !requestObject.skillWanted)
        {
            return res.status(400).json({ error: 'toUser, skillOffered, and skillWanted are required fields.' });
        }
        const createRequest = new skillswapmodel(requestObject);
        res.status(201).json({ message: 'Swap request created successfully', data: createRequest });
    }catch(err)
    {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getsentrequests = async(req,res) => {
    console.log("get sent requests called");
}

exports.getreceivedrequests = async(req,res) => {
    console.log("get received requests called");
};

exports.rejectacceptrequest = async(req,res) => {
    console.log("reject or accept request called");
}

exports.completerequest = async(req,res) => {
    console.log("complete request called");
}