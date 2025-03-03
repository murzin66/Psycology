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
  let startX = 0;
  let isSwiping = false;

  // Функция для обновления галереи
  function updateGallery() {
      const offset = -currentIndex * 100; // На мобильных устройствах смещаем на 100%
      galleryTrack.style.transform = `translateX(${offset}%)`;
  }

  // Обработка кнопок "влево" и "вправо"
  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateGallery();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
          currentIndex++;
          updateGallery();
      }
  });

  // Обработка свайпов
  galleryTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
  });

  galleryTrack.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      // Смещаем галерею во время свайпа
      galleryTrack.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diffX}px))`;
  });

  galleryTrack.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      // Определяем, был ли это свайп
      if (Math.abs(diffX) > 50) { // Минимальное расстояние для свайпа
          if (diffX > 0 && currentIndex < images.length - 1) {
              // Свайп влево
              currentIndex++;
          } else if (diffX < 0 && currentIndex > 0) {
              // Свайп вправо
              currentIndex--;
          }
      }

      // Обновляем галерею
      updateGallery();
      isSwiping = false;
  });

  // Открытие модального окна при клике на изображение
  images.forEach((image) => {
      image.addEventListener('click', () => {
          modal.style.display = 'block';
          modalImage.src = image.src;
      });
  });

  // Закрытие модального окна
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