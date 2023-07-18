const databaseFunctions = {
    async inDB(model,id){
        const response = await model.findById(id);
        if(!response)return false;
        return true;
    }
}

module.exports = databaseFunctions;