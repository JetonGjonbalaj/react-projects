const apiKey = '7gfOArzlpf_15YZAGQbhqi_4oQZQ5u_4j_Eu2Rra7gaCl9Q5SwLeWIjjub4S7DbNxSoHqvZ9hl2tjIe4OYytvS4vKCxT-_nwSMuYZD0Hjb3S_jv4hpFAxXMi1MtwXXYx';

const Yelp = {
    search: function(term, location, sortBy) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&term=${term}&location=${location}&sort_by=${sortBy}`;
        return fetch(
            url,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                } 
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(jsonResponse => {
            if (typeof jsonResponse === 'object' && jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories.alias,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                });
            } else return [];
        });
    }
}

export default Yelp;