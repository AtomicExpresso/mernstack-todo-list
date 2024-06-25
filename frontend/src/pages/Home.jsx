'use client'
import CreateForm from "../componets/home/createForm";
import TodoDetail from "../componets/home/todoDetail";
import EditPopup from "../componets/popups/EditPopup";
import AddNewItemBtn from "../componets/home/addNewItemBtn";
import { useState, createContext, useEffect, useCallback } from "react"

//Context for todo list items
export const listDataContext = createContext({})

export default function Home() {
  const [data, setData] = useState([])
  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [formState, setFormState] = useState({title: '',desc: ''})

  //For editing a form
  const [formEditChangeState, setFormEditChangeState] = useState({title: '',desc: ''})
  const [showEditPopup, setShowEditPopup] = useState({show: false,id: ''})


  // Function to fetch data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/todo');
      const data = await response.json();

      if(!response.ok){
        console.log('An error occured while fetching the data')
      }

      setData(data);
    } catch (error) {
      console.log(error)
    }
  }, []);

  // Fetch data on initial render
  useEffect(() => {fetchData()}, [fetchData]);

  //Shows the popup for creating a new todo
  const showCreatePopupFn = () => setShowCreatePopup(prevState => !prevState)

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
  const HandleFetchedData = (obj) => setFormEditChangeState(obj)


  //Clear Both forms and removes the popups, after either of them are submitted
  const ClearForms = () => {
    setFormEditChangeState({title: '',desc: ''});
    setFormState({title: '',desc: ''});
    setShowCreatePopup(false)
    fetchData();
  }

  //Close the edit popup without saving the changes
  const closePopupNoSave = () => {
    setShowEditPopup({id: '', show: false})
    setShowCreatePopup(false)
    fetchData();
  }

  //Close the edit popup when user submits
  const closePopupAfterSubmit = () => {
    setShowEditPopup({...showEditPopup, show: !showEditPopup.show})
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
          <TodoDetail 
            HandleEditPopup={HandleEditPopup}
            fetchData={fetchData}
          />
        </listDataContext.Provider>
      </div>
    </div>
  )
}