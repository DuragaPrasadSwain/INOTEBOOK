import noteContext  from "./noteContext";
import React, { useState } from 'react'



const NoteState = (props) => {

  const host ="http://localhost:5000/"

    const notestate = [
      ]

    const [notes, setnotes] = useState(notestate)
    const [auth, setauth] = useState("")
    console.log("auth = " + auth );

    //Fetchnote a Note
    const fetchnote = async() =>{
      //API Call
      const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setnotes(json)

    }

    //Add a Note
    const addnote = async(title,description,tag) => {
      //API Call
      const response = await fetch(`${host}api/notes/addnote`, {
        method: "POST",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type": "application/json"
        },body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json)

      const note = {
        "_id": "",
        "user": "",
        "title":title,
        "description":description,
        "tag":tag,
        "date": "",
        "__v": 0
      }

      setnotes(notes.concat(note))
    }

    //update a note
    const updatenote = async (id, title, description, tag) => {
      //API call
      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type": "application/json"
        },body: JSON.stringify({title,description,tag}),
      });
      const json = response.json();
      console.log(json)

      //Logic to update clint request

      const tempnotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < tempnotes.length; index++) {
        const element = tempnotes[index];
        console.log(element._id + "---"+id)
        if(element._id === id){
          setnotes([
          tempnotes[index].title = title,
          tempnotes[index].description = description,
          tempnotes[index].tag = tag
        ])
        console.log(tempnotes);
        setnotes(tempnotes)
        break;
        
        }
       }

    }

    //delete a note
    const deletenote = async(id) => {

      //API call
      const response = await fetch(`${host}api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      });
      const json = response.json();
      console.log(json)

      console.log("your note with this "+id+" is deleted")
      const NewNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(NewNotes)

    }

    return (
        <noteContext.Provider value = {{notes,addnote,updatenote,deletenote,fetchnote,setauth}}>
            {props.children}
        </noteContext.Provider>
    )
    
}


export default NoteState;