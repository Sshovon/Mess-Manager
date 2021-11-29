const roleChecker = async (req,res,next)=>{
    try{
        const role = req.user.role;
        //console.log(role);
        if(role !== 'manager') throw new Error();
        next()

    }catch(e){
        res.status(400).send({error : "Please sign-in as *MANAGER*"});
    }
}

module.exports = roleChecker