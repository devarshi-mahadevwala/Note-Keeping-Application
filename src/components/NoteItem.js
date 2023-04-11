import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            {/* {note.title}
        {note.description} */}
            <div className="col-md-4" >
                <div className="card h-100" >
                    <div className="card-body" >
                        <h5 className="card-title" >{note.title}</h5>
                        <p className="card-text" >{note.description}</p>
                        <div className='goDown' >
                            <i  className="fa-solid fa-file-pen mx-2" onClick={() => {
                                updateNote(note);
                            }}></i>
                            <i  className="fa-solid fa-trash mx-2" onClick={() => {
                                deleteNote(note._id);
                                props.showAlert("Note Deleted Successfully", "success")
                            }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem