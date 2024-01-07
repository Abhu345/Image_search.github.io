const access="P9X1upXRHOT-8VmXJSqR2eyf_F_OciNWC2vO_GgLxDs"

const form=document.querySelector("form");
const input=document.getElementById("search-input");
const search=document.querySelector(".image");
const show=document.getElementById("btn");

let inputdata="";
let page=1;

 async function searchimage(){
    inputdata=input.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${access}`;

    const response=await fetch(url);
    const data=await response.json();

    const results=data.results;

    if(page===1){
        search.innerHTML="";
    }

    results.map((result)=>{
       const imagewrapper=document.createElement('div');
       imagewrapper.classList.add("img1");
       const imga=document.createElement('img');
       imga.src=result.urls.small;
       imga.alt=result.alt_description;
       const imagelink=document.createElement("a");
       imagelink.href=result.links.html;
       imagelink.target="_blank";
       imagelink.textContent=result.alt_description;

       imagewrapper.appendChild(imga);
       imagewrapper.appendChild(imagelink);
       search.appendChild(imagewrapper);
    });
    page++;
    if(page>1){
         show.style.display="block";
    }
}
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchimage();
    input.value="";
});
show.addEventListener("click",()=>{
    searchimage();
});