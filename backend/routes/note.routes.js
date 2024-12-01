const express = require('express');
const router = express.Router();
const Notes = require('../models/Note.models.js');
const User = require('../models/User.models.js');
const fetchuser = require('../middleware/fetchuser.middleware.js');
const { body, validationResult } = require('express-validator');


//ROUTE -1: Find a note by its id: get /api/note/findnote : Login required != undefined
router.get('/findnote/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Notes.find({ _id: id });
        res.status(200).send({ message: "Note found", note: note, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
});

//ROUTE 0:  Get All Public Notes: get /api/note/fetchpublicnotes : Login required
router.get('/fetchpublicnotes', async (req, res) => {
    try {
        const notes = await Notes.find({ visibility: true });
        res.status(200).send({ message: "Notes fetched successfully", notes: notes, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
});

//ROUTE 1:  Get All Notes: get /api/note/fetchallnotes : Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.status(200).send({ message: "Notes fetched successfully", notes: notes, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
})

//ROUTE 2: add Note : post /api/note/createnote : Login required
router.post('/addnote', fetchuser, [
    body('question', "question cannot be empty").exists(),

], async (req, res) => {
    try {
        //validating the notes
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).send({ message: "question cannot be empty", error: error.message, success: false });
        }


        let note = await Notes.create(
            {
                user: req.user.id,
                question: req.body.question,
                description: req.body.description,
                code: req.body.code,
                language: req.body.language || "C++",
                companyTag: req.body.companyTag,
                link: req.body.link,
                visibility: req.body.visibility,
                name: req.body.name,
            }
        );
        if (!note) {
            return res.status(400).send({ message: "Provide the neccessary details", error: "Insufficient Data", success: false });
        }

        res.status(200).send({ message: "Note added successfully", note: note, success: true });

    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }


});

// ROUTE 3: Update Note: post '/api/note/updatenote' : Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        //check if note exists
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ message: "error: Note doesn't exist", error: "Note note found", success: false });
        }

        //Allow update only if  the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ message: "Invalid request", error: "Not Allowed", success: false });
        }

        //create note
        const { question, description, companyTag, code, language, link, visibility } = req.body;
        const newNote = {};
        if (question != undefined) newNote.question = question;
        if (description != undefined) newNote.description = description;
        if (companyTag != undefined) newNote.companyTag = companyTag;
        if (code != undefined) newNote.code = code;
        if (language != undefined) newNote.language = language;
        if (link != undefined) newNote.link = link;
        if (visibility != undefined) newNote.visibility = visibility;

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.status(200).send({ message: "Updated successfully", UpdatedNote: note, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
})

//ROUTE 4: Delete a Note : delete /api/note/deletenote : Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // check if the note exists
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ message: "error: Note doesn't exist", error: "Note note found", success: false });
        }

        //Allow only if user own the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ message: "Invalid request", error: "Not Allowed", success: false });
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: "Note deleted successfully", note: note, success: true, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }

});

// ROUTE 5: Delete all Notes : delete /api/note/deleteall : Login required
router.delete('/deleteall', fetchuser, async (req, res) => {
    try {
        const deleteResult = await Notes.deleteMany();
        if (deleteResult.deletedCount === 0) {
            return res.status(404).send({ message: "Already deleted", error: "empty", deleteCount: 0, success: false });
        }

        res.status(200).send({ message: "All notes were deleted successfully", deleteCount: deleteResult.deletedCount, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
})

//ROUTE 6: add a comment id, to the existing array (basically update the exsiting array)
router.put('/addcommentid/:id', fetchuser, async (req, res) => {
    try {
        //note on which comment has been made should exist
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ message: "error: Note doesn't exist", error: "Note note found", success: false });
        }


        //comment id should be valid i.e. ID is not null/undefined
        const { commentId } = req.body;
        if (!commentId) {
            return res.status(400).send({ message: "comment ID is undefined", error: "comment ID is not valid", success: false });
        }

        // Convert Mongoose document to plain object
        let newNote = { ...note.toObject() };
        if (!newNote.comment) {
            newNote.comment = []; // Initialize the comment array if it doesn't exist
        }
        newNote.comment.push(commentId); // Add commentId to the comment array


        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.status(200).send({ message: "commentId added successfully", note: note, success: true })
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
})

//ROUTE 7: delete a comment id, to the existing array (basically update the exsiting array)
router.put('/deletecommentid/:id', fetchuser, async (req, res) => {
    try {
        //note on which comment has been made should exist
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ message: "error: Note doesn't exist", error: "Note note found", success: false });
        }


        //comment id should be valid i.e. ID is not null/undefined
        const { commentId } = req.body;
        if (!commentId) {
            return res.status(400).send({ message: "comment ID is undefined", error: "comment ID is not valid", success: false });
        }

        // Convert Mongoose document to plain object
        let newNote = { ...note.toObject() };
        if (!newNote.comment) {
            return res.send(404).send({ message: "comment not found", error: "comment array is empty", success: false })
        }

        //find the commentId in the array and remove it
        for (let i = 0; i < newNote.comment.length; i++) {
            const cmntId = newNote.comment[i].toString();
            if (cmntId === commentId) {
                newNote.comment.splice(i, 1);
                break;
            }
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: { comment: newNote.comment } }, { new: true });
        res.status(200).send({ message: "commentId added successfully", note: note, success: true })
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
})

//ROUTE 8:  Get All revision Notes: get /api/note/getrevisionnotes : Login required
router.get('/getrevisionnotes', fetchuser, async (req, res) => {
    try {
        const data = await User.findOne({ _id: req?.user?.id }).populate('importantNotes').exec();
        return res.status(200).send({ message: "Notes fetched successfully", notes: data?.importantNotes, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
});

//ROUTE 9:  Get All revision Notes: get /api/note/getrevisionnotes : Login required
router.get('/getsavednotes', fetchuser, async (req, res) => {
    try {
        const data = await User.findOne({ _id: req?.user?.id }).populate('savedNotes').exec();
        return res.status(200).send({ message: "Notes fetched successfully", notes: data?.savedNotes, success: true });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Issue", error: error.message, success: false });
    }
});


module.exports = router;