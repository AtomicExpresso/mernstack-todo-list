'use client'
import { useEffect, useState } from "react"

export default function EditPopup({itemInfo, closePopupNoSave, HandleEditChange, ClearForms, EditFormInfo, closePopupAfterSubmit, HandleFetchedData}) {
  
  //Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(`http://localhost:4000/api/todo/${itemInfo.id}`)
        let data = await response.json()
        HandleFetchedData(data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  }, [itemInfo.id])

  //Handles the form submit and sends a PATCH request to the Database 
  const HandleSubmit = async (e) => {
      e.preventDefault()

      const DataInfo = {
        title: EditFormInfo.title,
        desc: EditFormInfo.desc
      }

      const response = await fetch(`http://localhost:4000/api/todo/${itemInfo.id}`, {
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
              value={EditFormInfo?.title} 
              onChange={(e) => HandleEditChange(e)
            }></input>
            <label htmlFor="desc">Description</label>
            <textarea 
              name="desc" 
              placeholder="Description...."
              value={EditFormInfo?.desc}
              onChange={(e) => HandleEditChange(e)
            }></textarea>
            <div className="edit-btn-row">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button className="btn btn-danger" onClick={closePopupNoSave}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}