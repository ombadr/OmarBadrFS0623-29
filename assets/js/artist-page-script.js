// ARTIST PAGE

const artistContainer = document.querySelector('#artist-container');
const goBackButton = document.querySelector('#go-back-button')

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Recupera il valore del parametro 'imageId' dalla query string dell'URL
let imageId = getParameterByName('imageId');
let photographerName = getParameterByName('photographer');
let image = getParameterByName('url');
let photographerPage = getParameterByName('photographer_url');

let imageDetails = {
    id: imageId,
    photographerName,
    image,
    photographerPage,

};

artistContainer.innerHTML = `

            <p>Photographer: ${imageDetails.photographerName}</p>
            <a href="${imageDetails.photographerPage}">${imageDetails.photographerPage}</a>
            
            <div>
            <img src="${imageDetails.image}" class="img-fluid w-50">
            </div>
         
        `;

goBackButton.addEventListener('click', () => {
    goBack()
})

function goBack() {
    window.history.back()
}


// BACKGROUND COLOR ARTIST PAGE

const imageDownload = document.querySelector('img')
console.log(imageDownload.src)
// function to fetch and convert image to Base64
async function loadImageAndCalculateAverageColor(imageSrc) {
    try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            const img = new Image();

            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                let totalRed = 0;
                let totalGreen = 0;
                let totalBlue = 0;

                for (let i = 0; i < data.length; i += 4) {
                    totalRed += data[i];
                    totalGreen += data[i + 1];
                    totalBlue += data[i + 2];
                }

                const pixelCount = data.length / 4;
                const avgRed = Math.round(totalRed / pixelCount);
                const avgGreen = Math.round(totalGreen / pixelCount);
                const avgBlue = Math.round(totalBlue / pixelCount);

                const averageColor = `rgb(${avgRed}, ${avgGreen}, ${avgBlue})`;
                console.log('Average Color:', averageColor);
                document.body.style.backgroundColor = averageColor;

            };
            img.src = base64data;
        };
    } catch (error) {
        console.error('Error fetching the image:', error);
    }
}

// Usage example
const imageURL = imageDownload.src;
loadImageAndCalculateAverageColor(imageURL);


