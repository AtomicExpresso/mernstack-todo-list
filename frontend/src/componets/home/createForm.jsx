'use client'
import { useState } from "react"

export default function CreateForm({formData, handleChange}) {

  const SubmitForm = async (e) => {
    e.preventDefault()

    const EnterFormData = {
      title: formData.title, 
      desc: formData.desc
    }

    const response = await fetch('http://localhost:4000/api/todo/', {
      method: 'POST',
      body: JSON.stringify(EnterFormData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response.body)
    // const json = await response.json()

    // if(!response.ok){
    //   console.log('an error occured:', json)
    // }
    // if(response.ok){
    //   console.log(json)
    // }
  }

  return (
    <div>
      <form onSubmit={(e) => SubmitForm(e)}>
        <label htmlFor="title">Title</label>
        <input type="text" 
          name="title" 
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="desc">Description</label>
        <textarea 
          name="desc" 
          onChange={(e) => handleChange(e)}>
        </textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}