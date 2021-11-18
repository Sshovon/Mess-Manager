const ownerChecker = async (req, res, next) => {
    try {
        const result = req.user.expenses.find(expense => {
            return expense._id.toString() === req.params.id
        })
        if(result) next()
        else throw new Error()
    } catch (e) {
        res.status(400).send({error : "this user dont have the authority to modify this item"});
    
    }

}
module.exports = ownerChecker;