import React, { useContext, useState,useMemo} from "react"
import axios from "axios";

const BASE_URL = "http://localhost:3000/notes/";


const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)

  
    
    const createNote = async (content) => {
        const response = await axios.post(`${BASE_URL}`, content)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getNotes()
    }

    const getNotes = async () => {
        const response = await axios.get(`${BASE_URL}`)
        setNotes(response.data)
        console.log(response.data)
    }

    const deleteNote = async (id) => {
        await axios.delete(`${BASE_URL}${id}`)
        getNotes()
    }
    const updateNote = async (id,content) => {
        const updatedNote = await axios.put(`${BASE_URL}${id}`,content)
        console.log(updatedNote);
        getNotes()
    }

    useMemo(() => {
        getNotes()
        console.log(notes);
    }, [])

    
    return (
        <GlobalContext.Provider value={{
            getNotes,
            createNote,
            deleteNote,
            updateNote,
            notes,
            setNotes,
            setError,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}