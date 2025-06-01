var slideIndex = 1;//номер слайда
showSlides(slideIndex);

// переход к след слайду
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// показ слайда
function currentSlide(n) {
  showSlides(slideIndex = n);
}
//отображение слайдов
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}//если n больше одного, то устанавливается первый слайд
  if (n < 1) {slideIndex = slides.length}//если n меньше одного то устанавливается последний слайд
  for (i = 0; i < slides.length; i++) {//чтобы все слайды были скрыты
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");//все точки не активны
  }
  slides[slideIndex-1].style.display = "block";//отображение слайда
  dots[slideIndex-1].className += " active";//для точки
}
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.carousel')) {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');

    let autoSlideInterval;

    function showSlide(n) {
      if (n >= slides.length) slideIndex = 0;
      if (n < 0) slideIndex = slides.length - 1;

      slides.forEach(slide => slide.style.display = "none");
      dots.forEach(dot => dot.classList.remove('active'));

      slides[slideIndex].style.display = "block";
      dots[slideIndex].classList.add('active');
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        showSlide(++slideIndex);
      }, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    prevBtn.addEventListener('click', () => showSlide(--slideIndex));
    nextBtn.addEventListener('click', () => showSlide(++slideIndex));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        slideIndex = index;
        showSlide(slideIndex);
      });
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    showSlide(slideIndex);
    startAutoSlide();
  }

  if (document.querySelector('.gallery')) {
    const galleryImages = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');

    galleryImages.forEach(img => {
      img.addEventListener('click', function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
})




document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Очистка сообщений об ошибках
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  let isValid = true;

  // Проверка e-mail
  const email = document.getElementById('email');
  if (!email.value) {
      document.getElementById('emailError').textContent = 'Пожалуйста, введите ваш e-mail.';
      isValid = false;
  }

  // Проверка телефона
  const phone = document.getElementById('phone');
  const phonePattern = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  if (!phonePattern.test(phone.value)) {
      document.getElementById('phoneError').textContent = 'Пожалуйста, введите корректный номер телефона.';
      isValid = false;
  }

  // Проверка имени
  const name = document.getElementById('name');
  if (!name.value) {
      document.getElementById('nameError').textContent = 'Пожалуйста, введите ваше имя.';
      isValid = false;
  }

  // Проверка согласия
  const consent = document.getElementById('consent');
  if (!consent.checked) {
      document.getElementById('consentError').textContent = 'Вы должны согласиться на обработку персональных данных.';
      isValid = false;
  }

  // Если форма валидна, отправляем и очищаем
  if (isValid) {
      alert('Форма отправлена!');
      document.getElementById('contactForm').reset();
  }
});