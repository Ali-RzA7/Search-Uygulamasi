const formWrapper = document.querySelector(".form-Wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();
function runEventListeners(){

    searchButton.addEventListener("click", search);
    clearButton.addEventListener("click", clear);

}

function clear(){
    searchInput.value = '';

    Array.from(imageListWrapper.children).forEach((child) => child.remove())

}

function search(e){

    const value = searchInput.value.trim();
    if(imageListWrapper.children){
        clear();
    }

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: `Client-ID GdDt7KcwbTY77wh00Zz8j5uL9WRwz7iqKYV6zXPF-2E` 
        }
    })
    .then((res) => res.json())
    .then((data) => {
        Array.from(data.results).forEach((image) => {
            addImageToUI(image.urls.small); 
        })
    })
    .catch((err) => console.log(err));

    e.preventDefault();
}

function addImageToUI(url){
    // <div class="card">
    //     <img src="" alt="">
    // </div>
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height = '300';
    img.width = '300';

    div.append(img);
    imageListWrapper.append(div);
}