const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },

    description : {
        type: String
    },

    image: {
        url: String,
        filename: String
    },

    price: Number,

    location: String,

    country: String,
    
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    geometry: {
        type: {     //Mongoose GeoJSON 
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
});

listingSchema.post("findOneAndDelete", async (listing) => { //to delete reviews when corresponding listing is deleted
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;