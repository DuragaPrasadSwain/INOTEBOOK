import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import alertContext from '../context/alerts/alertContext'

const Note = () => {
  const context = useContext(noteContext)
  const context2 = useContext(alertContext)
  const { notes, fetchnote, updatenote } = context
  const { inalert } = context2
  useEffect(() => {
    fetchnote()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const [note, setnote] = useState({ id: "", title: "", description: "", tag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setnote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
  }

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = () => {
    // console.log(note)
    updatenote(note.id, note.title, note.description, note.tag)
    inalert("success", "Your note is updated", false)
  }


  return (
    <>
      <div className="container">
        <Addnote />

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3 ">
          <h3>Yours Notes</h3>
          <div className="container text-center fs-1 ">
            {notes.length === 0 ? "Empty Note List" : ""}
          </div>

          {/* <div className=" d-flex align-content-start flex-nowrap row my-3 "> */}
          {notes.map((note) => {

            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
          })}
          {/* </div> */}


        </div>
      </div>
    </>
  )
}

export default Note
