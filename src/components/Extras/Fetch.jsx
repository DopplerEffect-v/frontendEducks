import React, {useState, useEffect} from 'react'
import url from '../../config'

const Fetch = () => {
    const [facultades,setFacultades] = useState([])
    const [facultad,setFacultad] = useState({
        "correoElectronicoFacultad":"test@pucp.pe",
        "fidCoordinadorAcredFacultad": 1,
        "siglaFacultad": "PE3",
        "nombreFacultad": "Facultad de TEST",  
        "activo": 1
    })

    useEffect(()=>{
        const fetchFacultades = async () =>{
            try{
                let res = await fetch(`${url}/facultad`)
                let data = await res.json()
                setFacultades(data)
            }catch(error){
                console.log('error')
            }
        }
        fetchFacultades()
    },[])

    const handleSubmit = async e => {
        e.preventDefault() //prevents browser refresh
        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'CSRF':'csrf-token', TOKEN
                },
                body: JSON.stringify(facultad)                
            }
            fetch(`${url}/facultad`, config) 
        }catch(error){
            console.log('error')
        }
    }


    return(
        <div>
            <h1>FETCH DATA</h1>
            {facultades.map((facultad)=>{
                return(
                    <div key={facultad.idFacultad}>{facultad.sigla}</div>
                )
            })}
            <div>             
                <button onClick={handleSubmit}>CLICK ME</button>
            </div>
        </div>
    )
    
}

export default Fetch
