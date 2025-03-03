// Анимация появления элементов при скролле
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

fadeElements.forEach((element) => {
  observer.observe(element);
});


document.addEventListener('DOMContentLoaded', () => {
  const galleryTrack = document.querySelector('.gallery-track');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const images = document.querySelectorAll('.gallery-image');
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const closeModal = document.querySelector('.close');

  let currentIndex = 0;

  function updateGallery() {
      const offset = -currentIndex * (100 / 3);
      galleryTrack.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateGallery();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentIndex < images.length - 3) {
          currentIndex++;
          updateGallery();
      }
  });

  images.forEach((image, index) => {
      image.addEventListener('click', () => {
          modal.style.display = 'block';
          modalImage.src = image.src;
      });
  });

  closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  modalImage.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});