const express = require('express');
const router = express.Router();
const Comments = require('../models/Comment.models.js');
const fetchuser = require('../middleware/fetchuser.middleware.js');



//ROUTE 0: Find a comment by its id: get /api/comment/findcomment/:id
router.get('/findCommentsByNoteId/:id', async (req, res) => {
    try {
        const comments = await Comments.find({noteId: req.params.id});
        if (!comments) {
            return res.status(400).send({ success: false, message: "No Comment found" });
        }
        return res.status(200).send({ success: true, comments: comments });
    }
    catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});


//ROUTE 1: add a comment
router.post('/addcomment', fetchuser, async (req, res) => {
    try {
        let comment = await Comments.create(
            {
                userId: req.user.id,
                noteId: req.body.noteId,
                username: req.body.username,
                data: req.body.data,
            }
        )
        if (!comment) {
            return res.status(400).send({ success: false, message: "data insufficient" });
        }
        return res.status(200).send({ success: true, comment: comment });
    }
    catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});


//ROUTE 2: Edit a comment: put /api/comment/editcomment 
router.put('/updatecomment/:id', fetchuser, async (req, res) => {
    try {
        let comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({ success: false, message: "Comment not found" })
        }

        //allow only if user owns the comment
        if (req.user.id !== comment.userId.toString()) {
            return res.status(401).send({ success: false, error: "Not Allowed"});
        }

        const {data} = req.body;
        const newComment = {};
        if (data) newComment.data = data;

        comment = await Comments.findByIdAndUpdate(req.params.id, { $set: newComment }, { new: true });
        return res.status(200).send({ success: true, comment });
    }
    catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

//ROUTE 3: Edit a comment: put /api/comment/updatecommentengagement
router.put('/updatecommentengagement/:id', async (req, res) => {
    try {
        let comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({ success: false, message: "Comment not found" })
        }

        const {likes, dislikes, likedBy, dislikedBy} = req.body;
        if (likes) comment.likes = likes;
        if (dislikes) comment.dislikes = dislikes;
        if (likedBy) comment.likedBy = likedBy;
        if (dislikedBy) comment.dislikedBy = dislikedBy;

        comment = await Comments.findByIdAndUpdate(req.params.id, { $set: comment }, { new: true });
        return res.status(200).send({ success: true, comment });
    }
    catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

//ROUTE 4: Delete a comment ; delete /api/comment/deletecomment
router.delete('/deletecomment/:id', fetchuser, async (req, res) => {
    try {
        let comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({ success: false, message: "Comment not found" })
        }

        //allow only if use owns the comment
        if (req.user.id !== comment.userId.toString()) {
            return res.status(401).send({ success: false, error: "Not Allowed" });
        }

        comment = await Comments.findByIdAndDelete(req.params.id);
        return res.status(200).send({ success: true, comment: comment });

    }
    catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
})

module.exports = router;