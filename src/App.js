import React from "react";
import {firebase} from './firebase';

function App() {

  const [lista, setLista] = React.useState([])
  const [nombre, setNonbre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [id, setId] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)


  React.useEffect(()=>{
    const obtenerDatos = async ()=>{
      try {
        
        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData = data.docs.map((doc) => ({id:doc.id,...doc.data()})) 
        setLista(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])

  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      alert("Ingrese Nombre")
      return
    }
    if (!apellido.trim()) {
      alert("Ingrese Apeliido")
      return
    }
    try {
      const db = firebase.firestore()
      const nuevoUsu = {nombre, apellido}
      const dato = await db.collection('usuarios').add(nuevoUsu)
      //AGREGAR A LISTA
      setLista([
        ...lista,
        {...nuevoUsu,id:dato.id}
      ])
    } catch (error) {
      console.log(error)
    }
    //limpiar
    setApellido('')
    setNonbre('')
    
  }
  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listaFiltrada = lista.filter((elemento) =>elemento.id!==id)
      setLista(listaFiltrada)
    } catch (error) {
      console.log(error)
    }
  }

  const editar = (elemento) => {
    setModoEdicion(true)
    setNonbre(elemento.nombre)
    setApellido(elemento.apellido)
    setId(elemento.id)

  }

  const editarDatos = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      alert("Ingrese Nombre")
      return
    }
    if (!apellido.trim()) {
      alert("Ingrese Apeliido")
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).update({
        nombre,apellido
      })
      const listaEditada = lista.map((elemento)=>elemento.id===id ? {id,nombre,apellido}:elemento)
      setLista(listaEditada)
      setModoEdicion(false)
      setNonbre('')
      setApellido('')
      setId('')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">{modoEdicion ? 'Edicion De Usuario':'Registro De Usuarios'}</h2>
          <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
            <input type="text"
              placeholder="Ingrese Nombre"
              className="form-control mb-2" 
              onChange={(e)=>{setNonbre(e.target.value)}}
              value={nombre}/>
            <input type="text"
              placeholder="Ingrese Apellido"
              className="form-control mb-2" 
              onChange={(e)=>{setApellido(e.target.value)}}
              value={apellido}/>
            <div className="d-grid gap-2">
              {
                modoEdicion ? 
                <button className="btn btn-dark" type="submit">Editar</button>
                :
                <button className="btn btn-success" type="submit">Agregar</button>
              }
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Lista De Usuarios Registrados</h2>
          <ul className="list-group">
            {
              lista.map((elemento)=>(
                <li className="list-group-item " key={elemento.id}>{elemento.nombre} - {elemento.apellido}
                <button className="btn btn-danger float-end mx-2" onClick={()=>eliminar(elemento.id)}>Eliminar</button>
                <button className="btn btn-warning float-end mx-2"onClick={()=>editar(elemento)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
