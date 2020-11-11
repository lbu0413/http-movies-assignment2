import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'


const initialForm = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}



const UpdateMovie = (props) => {

    const { push } = useHistory()
    const [movie, setMovie] = useState(initialForm)
    const { id } = useParams()

   

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
           console.log(res)
           setMovie(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const changeHandler = (event) => {
        event.persist()
        
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res.data)
            setMovie(res.data)
            push(`/movies/${id}`)
        })
        .catch(err => console.log(err))
        

    }

    

    return(
        <div>
           <form onSubmit={submitHandler}>
               <input 
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
               />

               <input 
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
               />

               <input 
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
               />

                <button>Update</button>
           </form>
        </div>
    )
}

export default UpdateMovie