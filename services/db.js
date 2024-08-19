const mongoose=require('mongoose');
require('dotenv').config();
async function dbConnection()
{
    try{
await mongoose.connect(process.env.MONGODO_URL);
console.log("MongoDB connection is established");
    }
    catch(err){
console.log(err);
    }

}
module.exports={dbConnection};
