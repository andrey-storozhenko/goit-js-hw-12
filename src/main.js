import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from "./js/render-functions";
import { showLoader, hideLoader } from "./js/render-functions";
import { showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';


const form = document.querySelector("form");
const fetchCardsBtn = document.querySelector(".find-more");
let lastQuery = "";
let page = 1;
let totalPages = 0; 

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    const query = form.elements['search-text'].value;
   
    if (!query.trim()) {
        hideLoader();
        iziToast.show({ message: "Type something!" });
        return;
    }
    if (lastQuery !== query) {
        page = 1;
    }
    lastQuery = query;
    try {
        const cards = await getImagesByQuery(query, page);
        totalPages = Math.ceil(cards.totalHits / 15);
        if (totalPages === 1) {
            iziToast.show({  position: "topRight", message: "We're sorry, but you've reached the end of search results" });
            hideLoadMoreButton();
            return createGallery(cards.hits);
        }
        if (!cards.hits.length) {
            clearGallery();
            hideLoadMoreButton();
            iziToast.show({ message: "Sorry, there are no images matching your search query. Please try again!" });
            return;
        }
        createGallery(cards.hits); 
        page += 1;

        if (totalPages > 1 && page <= totalPages) {
            showLoadMoreButton();
        }
    } catch(error){
          iziToast.show({ message: "Something went wrong. Try again!" });
    } finally {
        hideLoader();
    }
});

fetchCardsBtn.addEventListener("click", async () => {
    showLoader();
    if (page > totalPages) {
        hideLoader();
        hideLoadMoreButton();
        return iziToast.show({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results."
        });
    } 
        try {
            const moreCards = await getImagesByQuery(lastQuery, page);
            createGallery(moreCards.hits);

            let elem = document.querySelector(".item-gallery");
            let rect = elem.getBoundingClientRect();
            window.scrollBy({
                top: rect.height * 2,
                behavior: 'smooth',
            });

            page += 1;
        } catch(error){
             iziToast.show({ message: "Problem with fetchind cards!" });
        } finally {
            hideLoader();
        }
    
});



