import React, { useState, useEffect } from 'react';
import { store } from '../firebaseconfig';

const Formulario = () => {
    /** Generar estados */
    const [ idusuario, setIdUsuario ] = useState('')
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [error, setError] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [ modoedicion, setModoedicion ] = useState(null)

    /** funcionalidad del formulario */
    const setUsario = async (e) => {
        /** Para evitar que recargue el navgeador */
        e.preventDefault()

        /** Validación de los campos */
        if (!nombre.trim() && !telefono.trim()) {
            setError('Los campos son requeridos')
        } else if (!nombre.trim()) {
            setError('El campo nombre no puede estar vacio')
        } else if (!telefono.trim()) {
            setError('El campo telefono no puede estar vacio')
        } else {
            setError('')
        }
        /** Object  */
        const usuario = { nombre: nombre, telefono: telefono }
        /** Capturar posibles errores */
        try {
            /** crear la colección en el servicio */
            const data = await store.collection('agenda').add(usuario)
            console.log(data)
            const { docs } = await store.collection('agenda').get()
            const nuevoArray = docs.map(item => ({
                id: item.id,
                ...item.data()
            }))
            /** guardar la respueta en el estado de usuario */
            setUsuarios(nuevoArray)
        } catch (error) {
            console.log(error)
        }
        /** Setear los estados de los campos vacios nuevamente, para limpiarlos :)   */
        setNombre('')
        setTelefono('')
    }

    /** eliminar usuarios */
    const borrarUsuario  = async(id) => {
        try {
            await store.collection('agenda').doc(id).delete()
            const { docs } = await store.collection('agenda').get()
            const nuevoArray = docs.map(item => ({
                id: item.id,
                ...item.data()
            }))
            /** guardar la respueta en el estado de usuario */
            setUsuarios(nuevoArray)
        } catch (error) {
            console.log(error)
        }
    }

    /** Editar el usuario */
    const editar = async(id) => {
        try {
            const data = await store.collection('agenda').doc(id).get()
            const {  nombre, telefono } = data.data()
            setNombre(nombre)
            setTelefono(telefono)
            setIdUsuario( id )
            setModoedicion(true)
        } catch (error) {
            console.log(error)
        }
    }

    /** editar  */
    const setUpdate =  async(e) => {
        /** Para evitar que recargue el navgeador */
        e.preventDefault()

        /** Validación de los campos */
        if (!nombre.trim() && !telefono.trim()) {
            setError('Los campos son requeridos')
        } else if (!nombre.trim()) {
            setError('El campo nombre no puede estar vacio')
        } else if (!telefono.trim()) {
            setError('El campo telefono no puede estar vacio')
        } else {
            setError('')
        }
        const userupdate = {nombre: nombre, telefono: telefono }
        try {
            await store.collection('agenda').doc(idusuario).set( userupdate )
            const { docs } = await store.collection('agenda').get()
            const nuevoArray = docs.map(item => ({
                id: item.id,
                ...item.data()
            }))
            /** guardar la respueta en el estado de usuario */
            setUsuarios(nuevoArray)
        } catch (error) {
            console.log(error)
        }
        /** Setear los estados de los campos vacios nuevamente, para limpiarlos :)   */
        setNombre('')
        setTelefono('')
        setIdUsuario('')
        setModoedicion(false)
    }


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
            <div className="row mt-3">
                <div className="col-md-6">
                    <h2 className="text-center">Formulario de usuarios</h2>
                    <form onSubmit={ modoedicion ? setUpdate : setUsario } className="form-group mt-3">
                        {
                            error ? (
                                <div className="alert alert-danger" role="alert">
                                    <> { error} </>
                                </div>
                            ) : (<></>)
                        }
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input onChange={(e) => { setNombre(e.target.value) }} value={nombre} type="text" id="nombre" className="form-control" requerid="true" placeholder="Introduce el nombre" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero">Numero</label>
                            <input onChange={(e) => { setTelefono(e.target.value) }} value={telefono} type="tel" id="numero" className="form-control" requerid="true" placeholder="Introduce el numero" />
                        </div>
                        {
                            modoedicion ? ( 
                                <button type="submit" className="btn btn-block btn-info mt-3 mb-3">Editar</button>
                            ) : (
                                <button type="submit" className="btn btn-block btn-info mt-3 mb-3">Registrar</button>
                            )
                        }
                    </form>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center">Lista de tu agenda</h2>
                    <ul className="list-group">
                        {
                            usuarios.length !== 0 ?
                                (
                                    usuarios.map(item => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                                            <p className="float-left"> { item.nombre} - { item.telefono}</p>
                                           <div>
                                           <button onClick={ () => { editar( item.id ) }} className="ml-5 btn btn-info " title="Borrar">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button onClick={ () => { borrarUsuario( item.id ) }} className="btn btn-danger" title="Borrar">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                           </div>
                                        </li>
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
                </div>
            </div>
        </>
    )
}
export default Formulario;