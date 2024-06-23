import CreateForm from "../componets/home/createForm"
import TodoDetail from "../componets/home/todoDetail"
import { useState } from "react"

export default function Home() {
  const [formState, setFormState] = useState({
    title: '',
    desc: ''
  })

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <CreateForm formData={formState} handleChange={HandleChange}></CreateForm>
      <TodoDetail formData={formState}/>
    </div>
  )
}