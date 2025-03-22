let currentIndex = 0;
let isSwiping = false;
let touchStartX = 0;

const track = document.querySelector('.gallery-track');
const images = document.querySelectorAll('.gallery-image');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const gallery = document.querySelector('.gallery');

// Обновление позиции галереи
function updateGallery() {
  const containerWidth = gallery.offsetWidth;
  track.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
}

// Управление модальным окном
function openModal(index) {
  currentIndex = index;
  modal.style.display = 'block';
  modalImage.src = images[currentIndex].src;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Навигация кнопками
document.getElementById('prevButton').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGallery();
  }
});

document.getElementById('nextButton').addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateGallery();
  }
});

// Клик по изображениям
images.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => e.target === modal && closeModal());

// Свайпы для основной галереи (только мобильные)
gallery.addEventListener('touchstart', handleTouchStart);
gallery.addEventListener('touchmove', handleTouchMove);
gallery.addEventListener('touchend', handleTouchEnd);

// Обработчики касаний
function handleTouchStart(e) {
  if (window.innerWidth > 767) return;
  touchStartX = e.touches[0].clientX;
  isSwiping = true;
}

function handleTouchMove(e) {
  if (!isSwiping || window.innerWidth > 767) return;
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (!isSwiping || window.innerWidth > 767) return;
  isSwiping = false;
  handleSwipe(e.changedTouches[0].clientX, false);
}

// Свайпы для модального окна
modal.addEventListener('touchstart', handleModalTouchStart);
modal.addEventListener('touchmove', handleModalTouchMove);
modal.addEventListener('touchend', handleModalTouchEnd);

function handleModalTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  isSwiping = true;
}

function handleModalTouchMove(e) {
  if (!isSwiping) return;
  e.preventDefault();
}

function handleModalTouchEnd(e) {
  if (!isSwiping) return;
  isSwiping = false;
  handleSwipe(e.changedTouches[0].clientX, true);
}

// Обработка свайпов
function handleSwipe(endX, isModal) {
  const diff = touchStartX - endX;
  const swipeThreshold = 50;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentIndex < images.length - 1) currentIndex++;
    else if (diff < 0 && currentIndex > 0) currentIndex--;

    if (isModal) modalImage.src = images[currentIndex].src;
    else updateGallery();
  }
}

// Управление клавиатурой
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentIndex > 0) currentIndex--;
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) currentIndex++;
    modalImage.src = images[currentIndex].src;
  }
});

// Адаптация при ресайзе
window.addEventListener('resize', () => {
  updateGallery();
  if (window.innerWidth > 767 && modal.style.display === 'block') closeModal();
});

// Инициализация
updateGallery();