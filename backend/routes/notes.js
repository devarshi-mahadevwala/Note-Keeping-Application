const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/FetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes: GET "api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json({ notes: notes })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Create notes: POST "api/notes/addnote". Login Required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Atleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const { title, description,tag} = req.body;
            // iff there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id, email:req.user.email
            })
            const savedNote = await note.save()
            res.json({ notes: savedNote })

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// Route 3: Update an existing notes: PUT "api/notes/updatenote/:id". Login Required, note required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ Note_updated: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4: delete an existing notes: DELETE "api/notes/deletenote/:id". Login Required, note required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion if the user owns this
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ Success: "The note has been deleted" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    // Find the note to be deleted and delete it
}
)


module.exports = router