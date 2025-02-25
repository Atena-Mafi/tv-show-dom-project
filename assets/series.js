










const moviesContainer=document.querySelector(".movies-container");




const allSeries=[];


async function getSeries() {
    try{


    const response=await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.tvmaze.com/shows?page=1"),{
      
    headers:{

        "Content-Type":"application/json"
    }
    })
     if (!response.ok) {

        throw new Error(`Error : ${response.status}`);
     }

     const result = await response.json();
         console.log(result);
         
     const data = JSON.parse(result.contents);

     
     limitedMovies=data.slice(0,20);
    limitedMovies.forEach((film)=>{

      allSeries.push(film);
      
    })
     
    makingCards(allSeries);


    }

catch(err){

    console.log(err.message);
    
}
}


getSeries();



function makingCards(series) {
    moviesContainer.innerHTML="";

   series.forEach(movie => {

        const movieCard=document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML=`
          <img
               src="${movie.image?movie.image.medium: "default.jpg"}"
               class="img-fluid small-card-image"
               alt="${movie.name?movie.name:"N/A"}"
             />
 
             <div class="small-card-img-overlay">
               <h5 class="small-card-title">${movie.name?movie.name:"N/A"}</h5>
               <p class="card-text genres-text">
               ${movie.genres}
               </p>
               <p class="card-text"><small>${movie.rating?.average || "N/A"}:</small></p>
             </div>
        
        `
              moviesContainer.append(movieCard);



              movieCard.addEventListener("click",(e)=>{
              window.location.href=`./pages/episods.html?q=${movie.id}`;
            
              })
           
      });



}


/////////////////////////////////////////

const searchForm=document.querySelector(".search-form");
const searchBoxInput=document.querySelector(".search-box");
const searchBtn=document.querySelector(".search-btn");




searchBoxInput.addEventListener("input",(e)=>{

const search=searchBoxInput.value.toLowerCase();
 const filteredSeries=allSeries.filter(movie=>movie.name.toLowerCase().includes(search));

 makingCards(filteredSeries);
})


////////////////////////////////////////////
