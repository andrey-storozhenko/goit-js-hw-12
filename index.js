import{a as v,S,i}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const L=async(a,s)=>{const e=new URLSearchParams({per_page:15,page:s}),n=await v.get(`https://pixabay.com/api/?${e}`,{params:{key:"53600015-5f1ba847ab2f19cbbd3287585",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}});return{hits:n.data.hits,totalHits:n.data.totalHits}},w=document.querySelector(".gallery"),d=document.querySelector(".loader"),u=document.querySelector(".find-more");let B=new S(".gallery a",{captionsData:"alt"});const h=a=>{const s=a.map(e=>`<li class="item-gallery">
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
                </li>`).join("");w.insertAdjacentHTML("beforeend",s),B.refresh()};function y(){w.innerHTML=""}function b(){d.classList.add("showLoader"),d.classList.remove("hideLoader")}function m(){d.classList.remove("showLoader"),d.classList.add("hideLoader")}function q(){u.classList.add("showLoadMoreButton"),u.classList.remove("hideLoadMoreButton")}function c(){u.classList.remove("showLoadMoreButton"),u.classList.add("hideLoadMoreButton")}const g=document.querySelector("form"),M=document.querySelector(".find-more");let p="",o=1,l=0;g.addEventListener("submit",async a=>{a.preventDefault(),y(),c(),b();const s=g.elements["search-text"].value;if(!s.trim()){m(),i.show({message:"Type something!"});return}p!==s&&(o=1),p=s;try{const e=await L(s,o);if(l=Math.ceil(e.totalHits/15),l===1)return i.show({position:"topRight",message:"We're sorry, but you've reached the end of search results"}),c(),h(e.hits);if(!e.hits.length){y(),c(),i.show({message:"Sorry, there are no images matching your search query. Please try again!"});return}h(e.hits),o+=1,l>1&&o<=l&&q()}catch{i.show({message:"Something went wrong. Try again!"})}finally{m()}});M.addEventListener("click",async()=>{if(b(),o>l)return m(),c(),i.show({position:"topRight",message:"We're sorry, but you've reached the end of search results."});try{const a=await L(p,o);h(a.hits);let e=document.querySelector(".item-gallery").getBoundingClientRect();window.scrollBy({top:e.height*2,behavior:"smooth"}),o+=1}catch{i.show({message:"Problem with fetchind cards!"})}finally{m()}});
//# sourceMappingURL=index.js.map
