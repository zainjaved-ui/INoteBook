import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  // const host = 'http://192.168.1.15:5000'; // your PC IP    for connecting on mobile

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //  get all notes
  const getNotes = async () => {
    // TODO: API CALl

    // API call
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET', // updating means PUT
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'), // put your token here
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //  Add a note
  // const addNote = async (title, description, tag) => {

  //   const response = await fetch(`${host}/api/note/addnotes`, {
  //     method: "POST", //
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem('token'), // put your token here
  //     },
  //     body: JSON.stringify({ title, description, tag }),
  //   });

  //   const note = {
  //     _id: "68a6c2762e5ee5d74e2b10ca",
  //     user: "68a6c1b82e5ee5d74e2b10c5",
  //     title: title,
  //     description: description,
  //     tag: tag,
  //     date: "2025-08-18T15:46:26.915Z",
  //     __v: 0,
  //   };
  //   setNotes(notes.concat(note));
  // };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json(); // ✅ get the actual saved note from backend
    setNotes(notes.concat(note)); // ✅ store real note (with DB id)
  };

  //  Delete
  const deleteNote = async (id) => {
    //TODO :Api call
    const response = await fetch(`${host}/api/note/deletenotes/${id}`, {
      method: 'DELETE', // updating means PUT
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'), // put your token here
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/note/updatenotes/${id}`, {
      method: 'PUT', // updating means PUT
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'), // put your token here
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
