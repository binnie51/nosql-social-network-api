const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length : 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

//  Create a virtual property `responses` that retrieves the length of the thought's reactions
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);    

module.exports = Thought;