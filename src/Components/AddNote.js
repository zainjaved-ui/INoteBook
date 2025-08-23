import React, { useContext, useState } from 'react';
import noteContext from '../contexts/notes/noteContext';

export default function AddNote({ showAlert }) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    showAlert('Note Added successfully ✅', 'success');
  };

  return (
    <div className='container mt-4' style={{ maxWidth: '700px' }}>
      <div className='card shadow-lg border-0 p-4 rounded-3'>
        <h3 className='mb-4 text-center text-primary'>
          <i className="fa-solid fa-plus me-2"></i>Add a New Note
        </h3>
        <form>
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Title</label>
            <input
              type='text'
              className='form-control rounded-pill'
              name='title'
              value={note.title}
              onChange={handleChange}
              placeholder='Enter title'
              minLength={3}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label fw-semibold'>Description</label>
            <textarea
              className='form-control rounded-3'
              name='description'
              rows='3'
              value={note.description}
              onChange={handleChange}
              placeholder='Enter description'
              minLength={5}
              required
            ></textarea>
          </div>

          <div className='mb-3'>
            <label className='form-label fw-semibold'>Tag</label>
            <input
              type='text'
              className='form-control rounded-pill'
              name='tag'
              value={note.tag}
              onChange={handleChange}
              placeholder='Enter tag'
              required
            />
          </div>

          <button
            disabled={note.title.length < 3 || note.description.length < 5}
            className='btn btn-primary w-100 fw-bold rounded-pill'
            onClick={handleClick}
          >
            <i className="fa-solid fa-check me-1"></i> Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
