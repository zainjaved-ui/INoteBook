const express = require('express');
const router = express.Router();
const Fetchuser = require('../middleware/Fetchuser');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


//Route1:  get all nots using  GET: "/api/note/fetchallnotes" Doesn't req auth
router.get('/fetchallnotes',Fetchuser ,async (req,res)=>{
    try {
        const notes= await  Note.find({user:req.user.id});
    res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
})

//Route2:  Add a new nots using  post: "/api/note/addnotes" Doesn't req auth
router.post('/addnotes',Fetchuser , [
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Password must be atleast 5 character').isLength({min:5}),
    ] ,async (req,res)=>{

        try {
            const{title, description,tag}= req.body;
            //if there are errors, return bad req and error
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            } 
            const notes = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNotes= await notes.save()
            res.json(savedNotes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
        
})

//Route3:  Updae  an existing  note using  Put: "/api/note/updatenotes" Doesn't req auth
router.put('/updatenotes/:id',Fetchuser , [
    ] ,async (req,res)=>{
        const{title, description, tag} = req.body;
        //Create a new obj
        const newNote ={};
        if(title){newNote.title =title};
        if(description){newNote.description = description};
        if(tag){newNote.tag =tag};
        //Find the note to be updated
        // check is the real user is updating it or not
        let note= await Note.findById(req.params.id);
        //Find the note to be updated
        if(!note){res.status(404).send("Not found")}
        // check is the real user is updating it or not
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true}),
        res.json({note});

    })

//Route4:  Delete  an existing  note using  DELETE: "/api/note/deletenoes" Doesn't req auth
router.delete('/deletenotes/:id',Fetchuser , [
    ] ,async (req,res)=>{

        try {
               //Find the note to be updated
        let note= await Note.findById(req.params.id);
        //Find the note to be delete
        if(!note){res.status(404).send("Not found")}
        // check is the real user is deleting it or not
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id),
        res.json({"Success": "Note has been deleted", note : note});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })


module.exports = router