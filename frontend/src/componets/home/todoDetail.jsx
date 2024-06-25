'use client'

import { useContext } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { listDataContext } from "../../pages/Home";

export default function TodoDetail({HandleEditPopup, fetchData}) {
  const data = useContext(listDataContext)

  const handleClick = async (item) => {
    try {
      const response = await fetch (`http://localhost:4000/api/todo/${item._id}`, {
        method: 'DELETE'
      })
      
      if(!response.ok){
        console.log('Unable to delete the item')
      }
  
      fetchData()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      {data.length > 0 ? data.map(item => 
          <div key={item._id} className="todo-item">
            <h1>{item.title}</h1>
            <h3>Added: <span>{formatDistanceToNow(new Date (item.createdAt), {addSuffix: true})}</span></h3>
            {item.desc.length <= 100 ? 
              <p>{item.desc}</p> 
              : 
              <p>{item.desc.slice(0, 100)}...</p>}
            <div className="item-btn-row">
              <button className="btn btn-primary" onClick={() => HandleEditPopup(item)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleClick(item)}>Delete</button>
            </div>
          </div>
      ) : null}
    </>
  )
}