const urlParams= new URLSearchParams(window.location.search);
const showId=urlParams.get("q");

const formSelect=document.querySelector(".form-select");
const optionEl=document.createElement("option");

const cardContainer=document.querySelector(".card-container");

let allEpisods=[];


async function showEpisods() {
    try{

   const response=await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)


   if (!response.ok) {
    throw new Error(`Error:${response.status}`);
   }
    const data=await response.json()
    allEpisods=[];
    data.forEach(epi=>{
        
        allEpisods.push(epi);
    
            const optionEl=document.createElement("option");

            let episodeN=`${epi.season>=10?"S"+epi.season+"-" :"S0"+epi.season+"-"}`;
            let seasonN=`${epi.number>=10?"E"+epi.number:"E0"+epi.number}`;
            let episodeName=`${epi.name?epi.name:"N/A"}`;
            optionEl.value=epi.id;
            optionEl.textContent=`${seasonN}-${episodeN} ${episodeName}`;
            formSelect.append(optionEl);
         

    
    })


    makeEpisodCard(allEpisods)

   }   
catch(err){
console.log(err.message);
}}

showEpisods();




async function makeEpisodCard(episodName) {
    cardContainer.innerHTML='';
    episodName.forEach((episode) => {
        const link= episode.url;  
     const episodCard=document.createElement("div");
     
     episodCard.classList.add("episod-card");
     cardContainer.append(episodCard);
     episodCard.innerHTML=` <img src="${episode.image?episode.image.medium:"default.jpg"}" class="card-img-top" alt="${episode.name}">
          <div class="card-body">
          <div class="titleTag me-1"><span class="card-title">${episode.season>=10?"S"+episode.season+"-" :"S0"+episode.season+"-"}</span>
          <span class="card-title">${episode.number>=10?"E"+episode.number:"E0"+episode.number}</span>
           <span class="card-title">${episode.name?episode.name:"N/A"}</span>
           </div>
             <div class="iconeTag"><i class="bi bi-play-circle-fill"></i></div>
             </div>
           <div class="icones d-none">
          <i class="bi bi-linkedin socialIcon"></i>
          <i class="bi bi-github  socialIcon"></i>
          <i class="bi bi-telegram   socialIcon"></i>
          <i class="bi bi-instagram  socialIcon"></i>
          
          </div>
             <div class="summaryBox"><p>${episode.summary}</p></div>
          `

          const summaryBox=episodCard.querySelector(".summaryBox");
          episodCard.addEventListener("mouseover",(e)=>{
            summaryBox.style.display="flex";

          })



          episodCard.addEventListener("mouseout",(e)=>{
            summaryBox.style.display="none";
 
           })


          const play=episodCard.querySelector(".bi-play-circle-fill");
          play.addEventListener("click",(e)=>{
            window.location.href=link;
          
          })
     
      
     
     });
}



formSelect.addEventListener("change",async(e)=>{

const selectedEpi=Number(formSelect.value);
 

if (selectedEpi) {
    const filteredEpisodes= allEpisods.filter(ep=>ep.id===selectedEpi);
   await makeEpisodCard(filteredEpisodes);
  setTimeout(()=>{
document.querySelectorAll(".icones").forEach(icone=>{
    icone.classList.remove("d-none");
    icone.style.display="flex"; 

});

  },100);

}else{
   await makeEpisodCard(allEpisods);

    setTimeout(()=>{
document.querySelectorAll(".icones").forEach(icone=>{
          
            icone.style.display="none"; 
            icone.classList.add("d-none");
             
})
          },100)
   
}
})









