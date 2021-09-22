import React, { useEffect, useState } from 'react'
import { store } from '../firebaseconfig';

const Agenda = () => {

  const [usuarios, setUsuarios] = useState([])

  /** useEffect */
  useEffect(() => {
    /** funcicón de consultar los usuarios */
    const getUsuarios = async () => {
      /** resultado de la consulta  de tal objecto, desectruturar */
      const { docs } = await store.collection('agenda').get()
      const nuevoArray = docs.map(item => ({
        id: item.id,
        ...item.data()
      }))
      /** guardar la respueta en el estado de usuario */
      setUsuarios(nuevoArray)
    }
    getUsuarios()
  }, []);

  return (
    <>
      <h2 className="text-center">Lista de tu agenda</h2>
      <ul className="list-group">
      {
          usuarios.length !== 0 ?
            (
              usuarios.map(item => (
                <li className="list-group-item" key={ item.id  }> { item.nombre } - { item.telefono }</li>
              ))
            )
            :
            (
              <div className="text-center">
                <h2>No hay registros...</h2>
              </div>
            )
        }
      </ul>
    </>
  )
}
export default Agenda;