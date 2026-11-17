document.addEventListener('DOMContentLoaded', () => {
  // 1. Глобальное мягкое свечение за курсором + локальный Spotlight на карточках
  const cursorGlow = document.getElementById('cursorGlow');
  const glassCards = document.querySelectorAll('.glass-card');

  window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    glassCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 2. Интерактивный 3D-параллакс банковской карты Aurelia Titanium
  const tiltCard = document.getElementById('tiltCard');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const rotateY = x * 16;
      const rotateX = -y * 16;
      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 3. Плавное появление элементов при скролле (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4. Модальное окно открытия счёта
  const modal = document.getElementById('accountModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const onboardingForm = document.getElementById('onboardingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (modal) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeModalBtns.forEach((btn) => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  if (onboardingForm && formSuccess) {
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      onboardingForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    });
  }

  // 5. Фильтрация кейсов на странице cases.html
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (filterButtons.length > 0 && filterItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');

        // Обновляем активный стиль кнопок
        filterButtons.forEach((b) => {
          b.classList.remove('bg-[#D4AF37]', 'text-[#0B0B0C]');
          b.classList.add('bg-white/5', 'text-[#8E8E93]', 'border', 'border-white/10');
        });
        btn.classList.remove('bg-white/5', 'text-[#8E8E93]', 'border', 'border-white/10');
        btn.classList.add('bg-[#D4AF37]', 'text-[#0B0B0C]');

        // Показываем/скрываем карточки
        filterItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'flex';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(12px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }
});