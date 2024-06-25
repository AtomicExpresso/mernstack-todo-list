import { useState, useEffect } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function TodoDetail({formData, HandleEditPopup}) {
  const [itemList, setItemList] = useState([])

  //Fetch data from API
  useEffect(() => {
    fetch('http://localhost:4000/api/todo')
      .then(res => res.json())
      .then(data => setItemList(data))
  }, [])

  const handleClick = (item) => {
    fetch (`http://localhost:4000/api/todo/${item._id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  //Send a patch request
  // const handleEdit = (item) => {
  //   const FetchFormData = {
  //     title: formData.title,
  //     desc: formData.desc
  //   }

  //   fetch (`http://localhost:4000/api/todo/${item._id}`, {
  //     method: 'PATCH',
  //     body: JSON.stringify(FetchFormData),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => console.log(res.body))
  // }

  return (
    <>
      {itemList.length > 0 ? itemList.map(item => 
          <div key={item._id} className="todo-item">
            <h1>{item.title}</h1>
            <h3>Added: <span>{formatDistanceToNow(new Date (item.createdAt), {addSuffix: true})}</span></h3>
            <p>{item.desc}</p>
            <div className="item-btn-row">
              <button className="btn btn-primary" onClick={() => HandleEditPopup(item)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleClick(item)}>Delete</button>
            </div>
          </div>
      ) : null}
    </>
  )
}