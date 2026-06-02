import s from './App.module.css'
import { useEffect, useState } from 'react'
import { api } from './constants/api'

import logo from '/logo.png'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState()

  useEffect(() => {
    api.get(`/character`).then((response) => {
        setData(response.data.results)
    }).catch((error) => {
      console.error("Deu ruim!!!", error)
    })
  }, [page])
  

  return (
    <>
    <div>
      <label>Digite uma página</label>
      <input type="number" placeholder='1/42' value={page} onChange={(e) => setPage(e.target.value)} /> 
    </div>
      <img className={s.logo} src={logo} alt="Logo" />
      <main>
        {data.map((item, index) => {
          return(
            <div key={index}>
                <img src={item.image} alt={item.name} />
                <h4>Name: {item.name}</h4>
                <p>Species: {item.species}</p>
                {item.status === "Dead" ? "Status:🧟" : item.status === "Alive" ? "Status: 😊" : <p>Status: {item.status}</p>}
                <p>Origin: {item.origin.name}</p>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
