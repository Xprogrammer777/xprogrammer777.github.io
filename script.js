document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const overlay = document.querySelector('.overlay');
    const enlargedImage = document.getElementById('enlargedImage');
    const authorName = document.getElementById('authorName');
    const description = document.getElementById('description');

    const imageFolder = 'images/';
    const imageCount = 2;
    const imageFiles = [];

    // Generate image filenames
    for (let i = 1; i <= imageCount; i++) {
        imageFiles.push(`image${i}.png`);
    }

    // Fetch the JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Create image elements
            imageFiles.forEach(function(imageFile) {
                const img = document.createElement('img');
                img.src = imageFolder + imageFile;
                img.alt = imageFile;
                gallery.appendChild(img);

                img.addEventListener('click', function() {
                    enlargedImage.src = img.src;

                    // Update author and description
                    const imageData = data[imageFile];
                    if (imageData) {
                        authorName.textContent = `Artist: ${imageData.author}`;
                        description.textContent = imageData.description;
                    } else {
                        authorName.textContent = 'Artist: Unknown';
                        description.textContent = 'No description available.';
                    }

                    overlay.classList.add('active');
                });
            });
        });

    // Hide the overlay when clicked
    overlay.addEventListener('click', function() {
        overlay.classList.remove('active');
    });
});
