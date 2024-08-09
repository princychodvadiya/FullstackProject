const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_DEMO_URL)
            .then(() => { console.log("mongoDB connect succsesfully.") })
            .catch((error) => {
                console.log("mongoDB is connaction error" + error);
            })
    } catch (error) {
        console.log('mongoDB is connaction error.' + error);
    }
}

module.exports = connectDB