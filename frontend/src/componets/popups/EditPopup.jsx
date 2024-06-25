'use client'
import { useEffect, useState } from "react"

export default function EditPopup({itemInfo, closePopupNoSave, HandleEditChange, ClearForms, EditFormInfo, closePopupAfterSubmit}) {
  const [fetchedFormData, setFetchedFormData] = useState([])
  
  //Fetch Data
  useEffect(() => {
    function fetchData() {
      try {
        let response = fetch(`http://localhost:4000/api/todo/${itemInfo.id}`)
        response = response.json()
        setFetchedFormData(response)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  //Handles the form submit and sends a PATCH request to the Database 
  const HandleSubmit = (e) => {
      e.preventDefault()

      const DataInfo = {
        title: EditFormInfo.title,
        desc: EditFormInfo.desc
      }

      fetch(`http://localhost:4000/api/todo/${itemInfo.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(DataInfo)
      })

      ClearForms(); //Clears the form
      closePopupAfterSubmit()
  }
  
  return (
    <div className="edit-popup-container">
      <div className="edit-popup-content">
        <h1>Edit</h1>
        <div>
          <form onSubmit={HandleSubmit}>
            <label htmlFor="title">Title</label>
            <input 
              name="title" 
              placeholder="Name of todo"
              value={itemInfo.title} 
              onChange={(e) => HandleEditChange(e)
            }></input>
            <label htmlFor="desc">Description</label>
            <textarea name="desc" 
              placeholder="Description...."
              value={itemInfo.desc} 
              onChange={(e) => HandleEditChange(e)
            }></textarea>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button className="btn btn-danger" onClick={closePopupNoSave}>Close</button>
          </form>
        </div>
      </div>
    </div>
  )
}