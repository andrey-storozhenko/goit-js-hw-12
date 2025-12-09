import axios from "axios";

export const getImagesByQuery = async (query, page) => {
    const params = new URLSearchParams({
        per_page:15,
        page: page
    });
    const response = await axios.get(`https://pixabay.com/api/?${params}`, {
        params: {
            key: "53600015-5f1ba847ab2f19cbbd3287585",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        }
    })
     return {
        hits: response.data.hits,
        totalHits: response.data.totalHits
    };
};