import{a as B,S as q,i}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function e(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=e(t);fetch(t.href,a)}})();const w=async(r,s)=>{const e=new URLSearchParams({per_page:15,page:s}),l=await B.get(`https://pixabay.com/api/?${e}`,{params:{key:"53600015-5f1ba847ab2f19cbbd3287585",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}});return{hits:l.data.hits,totalHits:l.data.totalHits}},b=document.querySelector(".gallery"),u=document.querySelector(".loader"),m=document.querySelector(".find-more");let M=new q(".gallery a",{captionsData:"alt"});const f=r=>{const s=r.map(e=>`<li class="item-gallery">
                    <a href=${e.largeImageURL}>
                        <img src=${e.webformatURL} alt=${e.tags} />
                    </a>
                    <ul class="stats">
                        <li class="item-stats">
                            <p class="text-stats">Likes</p>
                            <p class="info-stats">${e.likes}</p>
                        </li>
                        <li class="item-stats">
                            <p class="text-stats">Views</p>
                            <p class="info-stats">${e.views}</p>
                        </li>
                        <li class="item-stats">
                            <p class="text-stats">Comments</p>
                            <p class="info-stats">${e.comments}</p>
                        </li>
                        <li class="item-stats">
                            <p class="text-stats">Downloads</p>
                            <p class="info-stats">${e.downloads}</p>
                        </li>
                    </ul>
                </li>`).join("");b.insertAdjacentHTML("beforeend",s),M.refresh()};function p(){b.innerHTML=""}function v(){u.classList.add("showLoader"),u.classList.remove("hideLoader")}function c(){u.classList.remove("showLoader"),u.classList.add("hideLoader")}function S(){m.classList.add("showLoadMoreButton"),m.classList.remove("hideLoadMoreButton")}function d(){m.classList.remove("showLoadMoreButton"),m.classList.add("hideLoadMoreButton")}const y=document.querySelector("form"),P=document.querySelector(".find-more");let g="",o=1,n=0,L=0;y.addEventListener("submit",async r=>{r.preventDefault(),p(),d(),v();const s=y.elements["search-text"].value;if(!s.trim()){c(),i.show({message:"Type something!"});return}g!==s&&(o=1),g=s;try{const e=await w(s,o);if(o===1&&(L=e.hits.length),n=Math.ceil(e.totalHits/L),n===1)return i.show({position:"topRight",message:"We're sorry, but you've reached the end of search results"}),d(),c(),f(e.hits);if(!e.hits.length){p(),i.show({message:"Sorry, there are no images matching your search query. Please try again!"});return}f(e.hits),n>1&&o<=n&&S(),o+=1}catch{i.show({message:"Something went wrong. Try again!"})}finally{c()}});P.addEventListener("click",async()=>{if(d(),v(),o>n)return c(),d(),i.show({position:"topRight",message:"We're sorry, but you've reached the end of search results."});try{const r=await w(g,o);if(!r.hits||r.hits.length===0){d(),i.show({position:"topRight",message:"No more images found"});return}f(r.hits);let e=document.querySelector(".item-gallery").getBoundingClientRect();window.scrollBy({top:e.height*2,behavior:"smooth"}),o+=1,o<=n?S():i.show({position:"topRight",message:"You've reached the end of search results"})}catch{i.show({message:"Problem with fetchind cards!"})}finally{c()}});
//# sourceMappingURL=index.js.map
