const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { validationResult, body } = require('express-validator');


//ROUTE 1 - get all the notes using: GET '/api/notes/fetchallnotes'. login required

router.get('/fetchallnotes', fetchUser,
    [body('title', 'Please enter title').notEmpty(),
    body('description', 'please write description').notEmpty()

    ], async (req, res) => {

        try {
            const notes = await Notes.find({ user: req.user.id })
            res.json(notes);
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Internal server error occured')
        }


    });


//ROUTE 2 - add a new note using: post '/api/notes/addnote'. login required

router.post('/addnote', fetchUser, async (req, res) => {

    try {
        //if there errors, return bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { title, description, tag } = req.body;

        const notes = new Notes({
            tag, title, description,user : req.user.id
        })

        const savedNotes = await notes.save()

        res.json(savedNotes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error occured')
    }


});



//ROUTE 3 - upadte note using: put '/api/notes/updatenote/id:'. login required



router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        
        const {title,description,tag} = req.body;

        //create a new note object

        const newNote = {}

        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //find note to be updated and update it

        let notes = await Notes.findById(req.params.id)
        if(!notes){return res.status(400).send("not found")}




        //check the user is updating his/her contenet or not

        if(notes.user.toString() !== req.user.id){
            return res.status(400).send("not found")
        }

        notes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

        res.json({notes})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error occured')
    }


});






//ROUTE 4 - delete note using: delete '/api/notes/deletenote/:id'. login required



router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        
        const {title,description,tag} = req.body;

    
        //find note to be deleted and delete it

        let notes = await Notes.findById(req.params.id)
        if(!notes){return res.status(400).send("not found")}


        //check the user is deleting his/her contenet or not

        if(notes.user.toString() !== req.user.id){
            return res.status(400).send("not found")
        }

        notes = await Notes.findByIdAndDelete(req.params.id)

        res.json({"success":"note has been deleted",notes:notes})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error occured')
    }


});

module.exports = router;