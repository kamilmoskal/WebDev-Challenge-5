const toggler = document.querySelector(".toggler");
const nav = document.querySelector(".nav__list");

// Toggle Burger & Nav on mobile
toggler.addEventListener("click", function() {
  this.classList.toggle("toggler--active");
  nav.classList.toggle("nav__list--active");
});

// Mobile Nav Link, hiding menu on click
nav.addEventListener("click", function(e) {
  if (e.target.classList.contains("nav__link")) {
    toggler.classList.remove("toggler--active");
    nav.classList.remove("nav__list--active");
  }
});

window.addEventListener("scroll", function() {
  // Scale Logo on scrollPosition === 0
  if (this.scrollY === 0) {
    document.querySelector(".logo__link").classList.remove("noTop");
  } else {
    document.querySelector(".logo__link").classList.add("noTop");
  }

  // Display 'slide-up' button on scrollPosition > window.innerHeight
  if (this.scrollY > this.innerHeight) {
    document.querySelector(".slide-up").style.right = "5%";
  } else {
    document.querySelector(".slide-up").removeAttribute("style");
  }
});

const addBtn = document.querySelector("#work-btn");
const workGrid = document.querySelector("#work .work__grid");

addBtn.addEventListener("click", function() {
  // Check window.innerWidth and set iteration
  let iteration = 1;
  if (window.innerWidth >= 1200) {
    iteration = 3;
  } else if (window.innerWidth < 1200 && window.innerWidth >= 768) {
    iteration = 2;
  }

  // Append to work__grid X random work projects depending on iteration variable
  for (let i = 1; i <= iteration; i++) {
    const randomImg = Math.floor(Math.random() * 6 + 1);
    const workItem = document.createElement("figure");
    workItem.classList.add("work__item");
    workItem.setAttribute("data-aos", "fade-up");
    workItem.setAttribute("data-category", "all");
    workItem.innerHTML = `
        <img
          src="./img/work_${randomImg}.jpg"
          alt="Work preview ${randomImg}"
          class="work__img"
        />
        <figcaption class="work__content">
          <h3 class="work__title">Macankumbang</h3>
          <p class="work__disc">
            This is Photoshop's version of Lorem Ipsum. Proin gravida nibh
            vel velit auctor aliquet. Aenean sollicitudin, lorem quis
            bibendum auctor, nisi elit consequat
          </p>
          <a href="javascript:void(0)"
            ><span class="work__icon icon-eye"></span
          ></a>
        </figcaption>
    `;
    workGrid.appendChild(workItem);
  }
});

const workBtns = document.querySelectorAll(".work__btn");

// Category filter btns on click, in work__grid
workBtns.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    const workItems = document.querySelectorAll("[data-category]");

    // Add active class && display work__item depending on category
    function toggle(target, category) {
      workBtns.forEach(function(btn) {
        btn.classList.remove("work__btn--active");
      });
      target.classList.add("work__btn--active");

      workItems.forEach(function(item) {
        if (item.getAttribute("data-category").includes(category) ||
        item.getAttribute("data-category") === category) {
          item.style.display = "block";
          item.classList.add('aos-init');
          item.classList.add('aos-animate');
        } else {
          item.style.display = "none";
        }
      });
    }

    // Check which category was clicked
    if (e.target.getAttribute("data-control") === "web") {
      toggle(e.target, "web");
    } else if (e.target.getAttribute("data-control") === "print") {
      toggle(e.target, "print");
    } else if (e.target.getAttribute("data-control") === "all") {
      toggle(e.target, "all");
    }
  });
});

// Carouzel & Controls in testimonials section
const carouzel = new Siema({
  selector: ".carousel",
  duration: 1000,
  easing: "ease",
  perPage: 1,
  startIndex: 0,
  draggable: true,
  multipleDrag: true,
  threshold: 100,
  loop: true,
  rtl: false,
  onInit: () => {
    setInterval(() => carouzel.next(), 7000);
  },
  onChange: () => {
    // Add class to specific control on change slide
    controls.forEach(control => {
      control.classList.remove("carousel-controls__dot--active");
      if (
        parseInt(control.getAttribute("data-control")) - 1 ===
        carouzel.currentSlide
      ) {
        control.classList.add("carousel-controls__dot--active");
      }
    });
  }
});

const controls = document.querySelectorAll(".carousel-controls__dot");
// Carouzel Controls, on click change slide
controls.forEach(function(control) {
  control.addEventListener("click", function(e) {
    carouzel.goTo(parseInt(e.target.getAttribute("data-control")) - 1);
  });
});

// Initialize Animation On Scroll library
AOS.init({
  delay: 100
});




















