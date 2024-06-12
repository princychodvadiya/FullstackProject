const mongoose = require('mongoose');

const connectDB = async () => {
    
    try {
        await mongoose.connect('mongodb+srv://chodvadiyaprinci:princy6354@cluster0.gbuuhgc.mongodb.net/ecommerce')
            .then(() => { console.log("mongoDB connect succsesfully.") })
            .catch((error) => {
                console.log("mongoDB is connaction error" + error);
            })
    } catch (error) {
        console.log('mongoDB is connaction error.' + error);
    }
}

module.exports = connectDB