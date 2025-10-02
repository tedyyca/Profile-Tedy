document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.querySelector('.modal-caption');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let allImages = [];
let currentIndex = 0;

function updateImageList() {
  allImages = [];
  document.querySelectorAll('.photo-item').forEach((item, index) => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.photo-overlay');
    allImages.push({
      src: img.src,
      alt: img.alt,
      caption: overlay ? overlay.textContent : img.alt
    });
    item.addEventListener('click', () => openModal(index));
  });
}

function openModal(index) {
  currentIndex = index;
  updateModal();
  modal.style.display = 'flex';
}

function updateModal() {
  if (allImages[currentIndex]) {
    modalImg.src = allImages[currentIndex].src;
    modalImg.alt = allImages[currentIndex].alt;
    modalCaption.textContent = allImages[currentIndex].caption;
  }
}

function closeModal() {
  modal.style.display = 'none';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % allImages.length;
  updateModal();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  updateModal();
}

closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  updateImageList();
});