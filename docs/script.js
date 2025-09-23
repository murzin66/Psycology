window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (sec.getAttribute('id') === link.getAttribute('href').substring(1)) {
          link.classList.add('active');
        }
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Находим все контейнеры с текстом отзывов
  const textContainers = document.querySelectorAll('.review__text-container');
  const expandButtons = document.querySelectorAll('.review__expand-btn');

  // Проверяем каждый отзыв
  textContainers.forEach((container, index) => {
    const textElement = container.querySelector('.review__text');
    const button = expandButtons[index];

    // Проверяем, нужно ли ограничивать текст
    if (textElement.scrollHeight <= container.clientHeight) {
      // Если текст помещается полностью - скрываем кнопку
      button.classList.add('hidden');
    }
  });

  // Добавляем обработчики клика на кнопки
  expandButtons.forEach(button => {
    button.addEventListener('click', function() {
      const container = this.previousElementSibling;

      container.classList.toggle('expanded');

      if (container.classList.contains('expanded')) {
        this.textContent = 'Свернуть';
      } else {
        this.textContent = 'Развернуть';
      }
    });
  });
});