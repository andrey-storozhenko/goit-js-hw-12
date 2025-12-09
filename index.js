import{a as v,S as B,i}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const g=async(a,s)=>{const e=new URLSearchParams({per_page:15,page:s}),n=await v.get(`https://pixabay.com/api/?${e}`,{params:{key:"53600015-5f1ba847ab2f19cbbd3287585",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}});return{hits:n.data.hits,totalHits:n.data.totalHits}},L=document.querySelector(".gallery"),l=document.querySelector(".loader"),c=document.querySelector(".find-more");let S=new B(".gallery a",{captionsData:"alt"});const h=a=>{const s=a.map(e=>`<li class="item-gallery">
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
                </li>`).join("");L.insertAdjacentHTML("beforeend",s),S.refresh()};function q(){L.innerHTML=""}function w(){l.classList.add("showLoader"),l.classList.remove("hideLoader")}function d(){l.classList.remove("showLoader"),l.classList.add("hideLoader")}function b(){c.classList.add("showLoadMoreButton"),c.classList.remove("hideLoadMoreButton")}function u(){c.classList.remove("showLoadMoreButton"),c.classList.add("hideLoadMoreButton")}function M(){let s=document.querySelector(".item-gallery").getBoundingClientRect();window.scrollBy({top:s.height*2,behavior:"smooth"})}const y=document.querySelector("form"),x=document.querySelector(".find-more");let m="",o=1,p=0;y.addEventListener("submit",async a=>{a.preventDefault(),q(),u(),w();const s=y.elements["search-text"].value;if(!s.trim()){d(),i.show({message:"Type something!"});return}m!==s&&(o=1),m=s;try{const e=await g(s,o);if(p=Math.ceil(e.totalHits/15),p===1)return i.show({position:"topRight",message:"We're sorry, but you've reached the end of search results"}),u(),h(e.hits);if(!e.hits.length){i.show({message:"Sorry, there are no images matching your search query. Please try again!"});return}h(e.hits),o+=1,o>1&&b()}catch{i.show({message:"Something went wrong. Try again!"})}finally{d()}});x.addEventListener("click",async()=>{if(w(),u(),o>p)return u(),d(),i.show({position:"topRight",message:"We're sorry, but you've reached the end of search results."});if(m===y.elements["search-text"].value)try{const a=await g(m,o);h(a.hits),M(),o+=1}catch{i.show({message:"Problem with fetchind cards!"})}finally{d(),b()}});
//# sourceMappingURL=index.js.map
