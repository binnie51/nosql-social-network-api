const { Schema, model } = require('mongoose');

// Schema for User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref : 'User',
            }
        ]
    }
);

// Create a virtual property `friendCount` that retrieves the length of user's friends 
userSchema.virtual('friendCount')
    .get( function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;