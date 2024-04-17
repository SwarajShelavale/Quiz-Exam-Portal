
/* Write down Video Names Here */
const videoUrls = [
    '/videos/Cartoon.mp4',
    '/videos/Doctor.mp4',
    '/videos/checkup.mp4',
    '/videos/minecraft.mp4',
    '/videos/cartoon.mp4',
    '/videos/doctor.mp4',
    '/videos/checkup.mp4',
    '/videos/minecraft.mp4'
];






    


const container = document.getElementById('videoContainer');

for (let i = 0; i < videoUrls.length; i++) {
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.src = videoUrls[i];

    const figureElement = document.createElement('figure');
    const figcaptionElement = document.createElement('figcaption');

    // Extract the filename without extension from the video URL
    const filenameWithoutExtension = videoUrls[i].split('/').pop().split('.').slice(0, -1).join('');

    figcaptionElement.textContent = filenameWithoutExtension;

    figureElement.appendChild(videoElement);
    figureElement.appendChild(figcaptionElement);

    container.appendChild(figureElement);
}
