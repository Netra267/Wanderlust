const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../../models/listing.js");

const Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then( () => {
    console.log("Connected to DB");
}).catch ( (err) => {
    console.log(err);
});

async function main () {
    await mongoose.connect(Mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map( (obj) => ({...obj, owner: "65d067c6d88413d626191fb9"}) );    //NOTE: map() will not make changes in origianl array but it will make changes in new copied array and inserts the current property in new array
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();