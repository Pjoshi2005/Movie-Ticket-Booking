import Movie from "../models/movie.js";
import Show from "../models/show.js";


export const getNowPlayingMovies = async(req , res) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing` , {
            headers :{Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
        }) ;

        const movies = data.results;

        res.json({success : true , movies : movies} )
        
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
        
    }
}

export const addShow = async(req , res) => {
    try {
        const {movieId , showsInput } = req.body
    
        let movie = await Movie.findbyId(movieId)
    
        if(!movie){
            const [movieDetailResponse , movieCreditResponse] = new Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/{movieId}` , {
                    headers :{Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
                }) ,
                axios.get(`https://api.themoviedb.org/3/movie/{movieId}/credits` , {
                    headers :{Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
                })
            ])
    
            const movieApiData = movieDetailResponse.data;
            const movieCreditData = movieCreditResponse.data
    
            const movieDetails = {
                _id:movieId,
                title:movieApiData.title,
                overview:movieApiData.overview,
                poster_path:movieApiDat.poster_patha,
                backdrop_path:movieApiData.backdrop_path,
                genre:movieApiData.genre,
                casts:movieCreditData.casts,
                released_data:movieApiData.released_data,
                original_language:movieApiData.original_language,
                tagline:movieApiData.tagline || "",
                vote_average:movieApiData.vote_average,
                runtime:movieApiData.runtime,
            }
    
            movie = await Movie.create(movieDetails)
        }

        const showsToCreate = []

        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time)=>{
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie:movieId,
                    showDateTime:dateTimeString,
                    showPrice,
                    occupied_seats:{}

                })
            })
            
        });

        if(showsToCreate.length > 0){
            await Show.insertMany(showsToCreate)
        }
        res.json({success : true , message : "Show Added Successfully"})
    } catch (error) {
        
    }
}