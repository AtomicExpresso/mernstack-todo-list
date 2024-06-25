'use client'

import CreateForm from "../componets/home/createForm";
import TodoDetail from "../componets/home/todoDetail";
import EditPopup from "../componets/popups/EditPopup";
import AddNewItemBtn from "../componets/home/addNewItemBtn";
import { useState, createContext, useEffect } from "react"

//Context for todo list items
export const listDataContext = createContext({})

export default function Home() {
  const [data, setData] = useState([])
  const [showCreatePopup, setShowCreatePopup] = useState(false)
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

  //Fetch data from the DB
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/api/todo')
      const data = await response.json()
      setData(data)
    }

    fetchData()
  }, [data])

  //Shows the editpopup
  const showCreatePopupFn = () => {
    setShowCreatePopup(prevState => !prevState)
  }

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

    document.body.classList.add('noscroll')
  }

  //Handle Fetched data for the edit popup
  const HandleFetchedData = (obj) => {
    setFormEditChangeState(obj)
  }

  //Clear Both forms and removes the popups, after either of them are submitted
  const ClearForms = () => {
    setFormEditChangeState({
      title: '',
      desc: ''
    });
    setFormState({
      title: '',
      desc: ''
    });

    setShowCreatePopup(false)
  }

  //Close the edit popup without saving the changes
  const closePopupNoSave = () => {
    setShowEditPopup({...showEditPopup, 
      show: false
    }) //We're spreading this one to save the id
    setShowCreatePopup(false)
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
          HandleFetchedData={HandleFetchedData}
          /> 
      : null}
      <AddNewItemBtn
        showCreatePopupFn={showCreatePopupFn}
      />
      {showCreatePopup ?
        <CreateForm 
        formData={formState} 
        handleChange={HandleChange}
        ClearForms={ClearForms}
        closePopupNoSave={closePopupNoSave}
        />
      : null}
      <div className="todo-item-container">
        <listDataContext.Provider value={data}>
          <TodoDetail formData={formState} HandleEditPopup={HandleEditPopup}/>
        </listDataContext.Provider>
      </div>
    </div>
  )
}