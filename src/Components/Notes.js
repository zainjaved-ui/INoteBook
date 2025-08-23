import React, { useContext, useState, useEffect, useRef } from 'react';
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes({ showAlert }) {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/Login');
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Updated successfully ✅", "success");
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Hidden trigger for modal */}
      <button ref={ref} type='button' className='d-none btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        Launch modal
      </button>

      {/* Modal */}
      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content border-0 shadow-lg rounded-4'>
            <div className='modal-header bg-primary text-white rounded-top-4'>
              <h5 className='modal-title'>Edit Note</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label className='form-label fw-semibold'>Title</label>
                  <input type='text' className='form-control rounded-pill' name='etitle' value={note.etitle} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-semibold'>Description</label>
                  <textarea className='form-control rounded-3' rows="3" name='edescription' value={note.edescription} onChange={handleChange} required></textarea>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-semibold'>Tag</label>
                  <input type='text' className='form-control rounded-pill' name='etag' value={note.etag} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button ref={refClose} type='button' className='btn btn-outline-secondary' data-bs-dismiss='modal'>Close</button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleClick} className='btn btn-primary'>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className='container mt-5'>
        <h2 className='mb-4 text-center text-secondary'>Your Notes</h2>
        <div className='row'>
          {notes.length === 0 && <p className='text-center text-muted'>No notes to display</p>}
          {notes.map((note) => <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />)}
        </div>
      </div>
    </>
  );
}

export default Notes;
