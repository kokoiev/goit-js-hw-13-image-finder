import debounce from "./debounce-throttle"
import markUp from "./templates/template-image.hbs"

const buttonLoadMoreRef = document.querySelector('.load-more')
const galleryRef = document.querySelector(".main-gallery")
const inputRef = document.querySelector('#search-form')
const apiKey = '19435383-9ad0ec23cc9f9538427174dc8';
let pageNumber = 1;

const baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
console.log(galleryRef)
let searchingValue = `house`;
function makeMarkUp(array) {
    galleryRef.insertAdjacentHTML('beforeend', markUp(array))

};
const startSearch = debounce(400, event => {
    galleryRef.innerHTML = "";
    searchingValue = event.target.value;
    console.log(searchingValue)
    findImage();
    buttonLoadMoreRef.classList.remove("is-hidden")
    
});

inputRef.addEventListener('input', startSearch )

function findImage() {
    fetch(`${baseUrl}&q=${searchingValue}&page=${pageNumber}&per_page=12&key=${apiKey}`)
    .then(res => res.json())
    .then(res => makeMarkUp(res.hits))
    .catch(res => console.log(res))
};
buttonLoadMoreRef.addEventListener('click', () => {
    loadNextPage();
    console.log(document.documentElement.offsetHeight)
window.scrollTo({
  top: 100,
  behavior: 'smooth'
}); })

function loadNextPage() {
    pageNumber += 1;
    findImage();   
}
export default fetch;
const apiFindImg = {};


