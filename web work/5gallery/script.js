
const images = document.querySelectorAll(".gallery img");
const slideshow = document.getElementById("slideshow");
const slideImage = document.getElementById("slideImage");
const autoBtn = document.getElementById("autoBtn");

let currentIndex = 0;
let autoPlay = null;

function openSlide(index) {
    currentIndex = index;
    slideImage.src = images[currentIndex].src;
    slideImage.alt = images[currentIndex].alt;
    slideshow.classList.add("active");
}

images.forEach((image, index) => {
    image.addEventListener("click", () => {
        openSlide(index);
    });
});

function changeSlide(direction) {
    currentIndex =
        (currentIndex + direction + images.length) % images.length;

    slideImage.src = images[currentIndex].src;
    slideImage.alt = images[currentIndex].alt;
}

function closeSlide() {
    slideshow.classList.remove("active");
    stopAutoPlay();
}

function toggleAutoPlay() {
    if (autoPlay) {
        stopAutoPlay();
    } else {
        autoPlay = setInterval(() => {
            changeSlide(1);
        }, 1000);

        autoBtn.textContent = "Stop Auto-play";
    }
}

function stopAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = null;
    autoBtn.textContent = "Start Auto-play";
}
