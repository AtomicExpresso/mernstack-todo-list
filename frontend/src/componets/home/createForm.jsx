'use client'
export default function CreateForm({formData, handleChange, ClearForms}) {

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

    ClearForms()
  }

  return (
    <div className="todo-form-container">
      <div className="todo-form">
        <form onSubmit={(e) => SubmitForm(e)}>
          <label htmlFor="title">Title</label>
          <input type="text" 
            name="title" 
            onChange={(e) => handleChange(e)}
            placeholder="What do you need to do?"
          ></input>
          <label htmlFor="desc">Description</label>
          <textarea 
            name="desc" 
            onChange={(e) => handleChange(e)}
            placeholder="Description.....">
          </textarea>
          <button className="btn btn-success" type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}