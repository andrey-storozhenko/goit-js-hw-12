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
let perPage = 0;

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
        if (page === 1) {
            perPage = cards.hits.length;
        }
        totalPages = Math.ceil(cards.totalHits / perPage);

        if (totalPages === 1) {
            iziToast.show({  position: "topRight", message: "We're sorry, but you've reached the end of search results" });
            hideLoadMoreButton();
            hideLoader();
            return createGallery(cards.hits);
        }
        
        if (!cards.hits.length) {
            clearGallery();
            iziToast.show({ message: "Sorry, there are no images matching your search query. Please try again!" });
            return;
        }
        createGallery(cards.hits); 
    
        if (totalPages > 1 && page <= totalPages) {
            showLoadMoreButton();
        }
        page += 1;
    } catch(error){
          iziToast.show({ message: "Something went wrong. Try again!" });
    } finally {
        hideLoader();
    }
});

fetchCardsBtn.addEventListener("click", async () => {
    hideLoadMoreButton();
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
            if (!moreCards.hits || moreCards.hits.length === 0) {
                hideLoadMoreButton();
                iziToast.show({
                    position: "topRight",
                    message: "No more images found"
                });
                return;
            }
            createGallery(moreCards.hits);

            let elem = document.querySelector(".item-gallery");
            let rect = elem.getBoundingClientRect();
            window.scrollBy({
                top: rect.height * 2,
                behavior: 'smooth',
            });

            page += 1;
            if (page <= totalPages) {
                showLoadMoreButton();
            } else {
                iziToast.show({
                    position: "topRight",
                    message: "You've reached the end of search results"
                });
            }
        } catch(error){
             iziToast.show({ message: "Problem with fetchind cards!" });
        } finally {
            hideLoader();
        }
});



