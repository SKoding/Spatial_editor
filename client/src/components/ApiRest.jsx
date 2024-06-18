import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ApiRest() {
const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/administrative/')
      .then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div>ApiRest</div>
  )
}

export default ApiRest