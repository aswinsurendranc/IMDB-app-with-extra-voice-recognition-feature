
let search=document.querySelector("#search");
search.addEventListener("keyup",(e)=>{
    let searchText=e.target.value;
    SearchMovies(searchText);
    //when key press hide text and h1
    let formText=document.getElementById("divBlock");
    formText.style.display="none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey_formBlock");
});
//speech recognition api
let speechSearch=document.getElementById("speechIcon");
speechSearch.addEventListener("click",()=>{
    let formText=document.getElementById("divBlock");
    formText.style.display="none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey_formBlock");

    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition=new SpeechRecognition();
    let p=document.createElement("p");
    recognition.interimResults=true;


    


    recognition.addEventListener("result",(e)=>{
        let transcript=[...e.results]
            .map((result)=>result[0])
            .map((result)=>result.transcript)
            .join("");


            search.value=transcript;
            if(e.results[0].isFinal){
                p=document.createElement("p");
                p.innerHTML=transcript;
                let searchText=transcript;
                SearchMovies(searchText);
                // console.log(SearchMovies);
            }
        
    });
    recognition.start();
});



function SearchMovies(searchText){
   
    const imdbAPI=`http://www.omdbapi.com/?s=${searchText}&apikey=f056e2f7`;
    window.fetch(imdbAPI)
       .then((data)=>{
           data.json().then((movieData)=>{
               let movies=movieData.Search;
               let output= [];
               for (let movie of movies){
                   
                   let defaultImg=
                     movie.Poster==="N/A"
                       ?"https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg"
                           :movie.Poster;
                   output += ` 
                    <div>
                        <img src="${defaultImg}"/>
                        <h1>${movie.Title}</h1>
                        <p>${movie.Year}</p>
                        <a href="http://www.imdb.com/titile/${movie.imdbID}/" target="_blank">Movie Details</a>
                    </div>
                   `;
                }

                document.getElementById("template").innerHTML=output;

           }).catch((err)=>console.log(err));
       })
       .catch((err)=>console.log(err));

}


           