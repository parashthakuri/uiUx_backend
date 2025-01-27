
const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Favorite', favoriteSchema);

