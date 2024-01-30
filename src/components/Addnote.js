import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alerts/alertContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const context2 = useContext(alertContext)
    const {addnote} = context
    const {inalert} = context2

    const [note, setNote] = useState({title:"" , description:"" , tag:""})
    const handleClick = (e) => {
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
        setNote({title:"" , description:"" , tag:""})
        inalert("primary","Your note is added",true)
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
        
    }
    return (
        <div>
            <div className='container my-3'>
                <div className="my-3">
                    <h3>Add Notes</h3>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' minLength={1} required value={note.title} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" minLength={1} required name='description' value={note.description} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(note.title.length && note.description.length > 0)?handleClick:null}>ADD</button>
                    <button type="button" className="btn btn-secondary mx-3" onClick={()=>{setNote({title:"" , description:"" , tag:""})}}>Clear</button>
                </form>
            </div>
        </div>
    )
}

            export default Addnote
