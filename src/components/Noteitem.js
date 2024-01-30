import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alerts/alertContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const context2 = useContext(alertContext)                                           //1400 x 
    const { deletenote } = context                                                      //765        
    const {inalert} = context2
    const { note, updateNote } = props
    return (
    
        <div className='col-md-3 my-3'>
            <div className="card text-bg-light mb-3" style={{width:" 18rem",marginLeft:"2rem"}}>
                <div className="card-body">
                    <div className="d-flex">
                    <h5 className="card-title me-auto p-2 notes">{note.title}</h5>
                    <button type="button" className="btn btn-light btn-sm"><i className="fa-solid fa-pen p-2" onClick={()=>{updateNote(note)}}></i></button>
                    <button type="button" className="btn btn-light btn-sm"><i className="fa-solid fa-trash p-2" onClick={()=>{deletenote(note._id) 
                                                                                                                             inalert("danger","Your note is deleted",false)}}></i></button>
                    
                    </div>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
