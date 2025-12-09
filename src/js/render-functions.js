import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const fetchCardsBtn = document.querySelector(".find-more");

let gallerySLB = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
});
export const createGallery = images => {
   
    const markup = images.map(photo => {
        return `<li class="item-gallery">
                    <a href=${photo.largeImageURL}>
                        <img src=${photo.webformatURL} alt=${photo.tags} />
                    </a>
                    <ul class="stats">
                        <li class="item-stats">
                            <p class="text-stats">Likes</p>
                            <p class="info-stats">${photo.likes}</p>
                        </li>
                        <li class="item-stats">
                            <p class="text-stats">Views</p>
                            <p class="info-stats">${photo.views}</p>
                        </li>
                        <li class="item-stats">
                            <p class="text-stats">Comments</p>
                            <p class="info-stats">${photo.comments}</p>
                        </li>
                        <li class="item-stats">
                            <p class="text-stats">Downloads</p>
                            <p class="info-stats">${photo.downloads}</p>
                        </li>
                    </ul>
                </li>`
    })  
        .join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    gallerySLB.refresh();
};


export function clearGallery(){
    gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.add("showLoader");
    loader.classList.remove("hideLoader");
}
export function hideLoader() {
    loader.classList.remove("showLoader");
    loader.classList.add("hideLoader");
}
export function showLoadMoreButton() {
    fetchCardsBtn.classList.add("showLoadMoreButton");
    fetchCardsBtn.classList.remove("hideLoadMoreButton");
}
export function hideLoadMoreButton() {
    fetchCardsBtn.classList.remove("showLoadMoreButton");
    fetchCardsBtn.classList.add("hideLoadMoreButton");
}

export function scrollBy() {
    let elem = document.querySelector(".item-gallery");
    let rect = elem.getBoundingClientRect();
    window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
    });
}