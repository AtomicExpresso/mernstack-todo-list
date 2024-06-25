import CreateForm from "../componets/home/createForm";
import TodoDetail from "../componets/home/todoDetail";
import EditPopup from "../componets/popups/EditPopup";
import { useState } from "react"

export default function Home() {
  const [formState, setFormState] = useState({
    title: '',
    desc: ''
  })

  //For editing a form
  const [formEditChangeState, setFormEditChangeState] = useState({
    title: '',
    desc: ''
  })

  const [showEditPopup, setShowEditPopup] = useState({
    show: false,
    id: ''
  })

  //Handles form state for creating new items
  const HandleChange = (e) => {
    const { name, value } = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //Handles editing changes from the edit popup
  const HandleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEditChangeState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //Displays the edit popup and sets the ID to be the mongodb id from the item
  const HandleEditPopup = (item) => {
    setShowEditPopup({...showEditPopup, 
      show: !showEditPopup.show, 
      id: item._id
    })
  }

  //Clear Both forms, after either of them are submitted
  const ClearForms = () => {
    setFormEditChangeState({
      title: '',
      desc: ''
    });
    setFormState({
      title: '',
      desc: ''
    })
  }

  //Close the edit popup without saving the changes
  const closePopupNoSave = () => {
    setShowEditPopup({...showEditPopup, 
      show: !showEditPopup.show
    })
  }

  //Close the edit popup when user submits
  const closePopupAfterSubmit = () => {
    setShowEditPopup({...showEditPopup, 
      show: !showEditPopup.show
    })
  }

  return (
    <div>
      {showEditPopup.show ? 
      <EditPopup 
        closePopupNoSave={closePopupNoSave} 
        itemInfo={showEditPopup}
        HandleEditChange={HandleEditChange}
        ClearForms={ClearForms}
        EditFormInfo={formEditChangeState}
        closePopupAfterSubmit={closePopupAfterSubmit}
        /> 
      : null}
      <CreateForm 
        formData={formState} 
        handleChange={HandleChange}
        ClearForms={ClearForms}
        ></CreateForm>
      <div className="todo-item-container">
        <TodoDetail formData={formState} HandleEditPopup={HandleEditPopup}/>
      </div>
    </div>
  )
}