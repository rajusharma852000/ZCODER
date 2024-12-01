const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        noteId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'note'
        },
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        dislikedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        data: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

const Comments = mongoose.model('comment', CommentSchema);

module.exports = Comments;