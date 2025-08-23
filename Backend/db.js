const mongoose = require('mongoose');

const mongoURl = 'mongodb+srv://zain:zain@cluster.oqdowvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'; 

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURl);
        console.log("✅ Connected to Mongo Successfully");
    } catch (error) {
        console.error("❌ Failed to connect to Mongo:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
