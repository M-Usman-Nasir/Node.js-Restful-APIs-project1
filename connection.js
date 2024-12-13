const mongoose = require("mongoose");
// async function connectMongoDb(url) {
//       return mongoose.connect(url);
// }

// module.exports = { 
//     connectMongoDb,
//   };

const connectMongoDb = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds before timing out
    });
    console.log("Mongo Database Connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectMongoDb };