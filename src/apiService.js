import debounce from "./debounce-throttle"
import markUp from "./templates/template-image.hbs"

const buttonLoadMoreRef = document.querySelector('.load-more')
const galleryRef = document.querySelector(".main-gallery")
const inputRef = document.querySelector('#search-form')
const apiKey = '19435383-9ad0ec23cc9f9538427174dc8';
const baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
let searchingValue;
let pageNumber = 1;

const findImgApp = {
scrollBottom() { if (pageNumber !== 1) { window.scrollTo({
    top: (document.documentElement.offsetHeight - 1400),
    behavior: "smooth"
});} return},
makeMarkUp(array) {
    galleryRef.insertAdjacentHTML('beforeend', markUp(array))
},
startSearch: debounce(400, event => {
    if (event.target.value === "") {
        buttonLoadMoreRef.classList.add("is-hidden")
        galleryRef.innerHTML = "";
        return
    }
    pageNumber = 1;
    galleryRef.innerHTML = "";
    searchingValue = event.target.value;
    console.log(searchingValue)
    findImgApp.findImage();
    buttonLoadMoreRef.classList.remove("is-hidden")

    
}),
loadNextPage() {
    pageNumber += 1;
   this.findImage();
},
findImage() {
    fetch(`${baseUrl}&q=${searchingValue}&page=${pageNumber}&per_page=12&key=${apiKey}`)
    .then(res => res.json())
        .then(res => this.makeMarkUp(res.hits))
        .then(res => this.scrollBottom())          
    .catch(res => console.log(res))
},
};

inputRef.addEventListener('input', findImgApp.startSearch )
buttonLoadMoreRef.addEventListener('click', () => { findImgApp.loadNextPage() });

export default findImgApp;
