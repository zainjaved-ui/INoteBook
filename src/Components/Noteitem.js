import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import "./Noteitem.css"; // external CSS

const Noteitem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(noteContext);
  const [showFull, setShowFull] = useState(false);

  // Trim description if longer than 100 chars
  const description =
    note.description.length > 100 && !showFull
      ? note.description.substring(0, 100) + "..."
      : note.description;

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-0 h-100 note-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title text-primary">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-pen-to-square text-warning mx-2 cursor-pointer"
                onClick={() => updateNote(note)}
                title="Edit Note"
              ></i>
              <i
                className="fa-solid fa-trash text-danger mx-2 cursor-pointer"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Deleted successfully ✅", "success");
                }}
                title="Delete Note"
              ></i>
            </div>
          </div>

          <p className="card-text mt-2">
            {description}
            {note.description.length > 100 && (
              <button
                className="btn btn-link p-0 ms-2 text-decoration-none show-more-btn"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Show Less" : "Show More"}
              </button>
            )}
          </p>

          <span className="badge bg-light text-dark px-2 py-1">
            <i className="fa-solid fa-tag me-1"></i> {note.tag || "General"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
