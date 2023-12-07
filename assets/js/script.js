const cardsContainer = document.querySelector('#cards-container');
const loadImagesButton = document.querySelector('#load-images')
const loadSecondaryImagesButton = document.querySelector('#load-secondary-images')
const searchForm = document.querySelector('#search-form');


let fetchedContent = []

loadImagesButton.addEventListener('click', (e) => {
    e.preventDefault();
    getImages('nature')
})

loadSecondaryImagesButton.addEventListener('click', (e) => {
    e.preventDefault();
    getImages('sun')
});




searchForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const searchValue = document.getElementById('search-input').value
    getImages(searchValue)

})



async function getImages(query) {
    try {
        const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=9`, {
            method: 'GET',
            headers: {
                'Authorization': 'Fr06xcux7PUpVDussvqlLCDUIZ4PTZuLRAtVpOqqKZdlpXPcutqeAkIz'
            }
        })
        const response = await data.json()
        const photos = await response.photos
        fetchedContent = photos
        console.log(fetchedContent)
        displayImages(photos)

    } catch (e) {
        console.log(e)
    }
}

function displayImages(photos) {
    cardsContainer.innerHTML = ''

    photos.forEach((photo) => {
        cardsContainer.innerHTML += ` <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                 <img src="${photo.src.original}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;" alt="${photo.alt}">
                <div class="card-body">
                  <h5 class="card-title">${photo.alt}</h5>
                  <p class="card-text">
                   <a href="artist-page.html?imageId=${photo.id}&url=${photo.src.original}&photographer=${photo.photographer}&photographer_url=${photo.photographer_url}">
                                ${photo.photographer}
                            </a>
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        onclick="removeCardImage(event)"
                      >
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">${photo.id}</small>
                  </div>
                </div>
              </div>
            </div>`
    })
}

function removeCardImage() {
    event.target.closest('.col-md-4').remove()
}


