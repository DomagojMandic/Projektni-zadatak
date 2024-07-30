"use strict";

/* Event listener za prikaz aside bara na klik buttona */

const expandAsideBtn = document.getElementById("expandAsideEl");
const asideBar = document.querySelector(".aside__bar");
const contractAsideBtn = document.getElementById("closeAsideEl");
const mainContainer = document.getElementById("mainContainer");
const dashboardPodcasts = [
  ...document.querySelectorAll("podcast__flex--anchor"),
];

/* Event listeneri za aside bar i funkcionalnost buttona za proširenje i smanjenje
Aside bara */

document.addEventListener("DOMContentLoaded", () => {
  /* Togglanje klasa vidljivosti */
  expandAsideBtn.addEventListener("click", () => {
    asideBar.classList.toggle("position__left--zero");
    contractAsideBtn.classList.toggle("hidden");
    mainContainer.classList.toggle("background__content--visibility");
  });

  contractAsideBtn.addEventListener("click", () => {
    asideBar.classList.toggle("position__left--zero");
    mainContainer.classList.toggle("background__content--visibility");
  });

  /* Short circuit u slučaju da se klikne unutar aside bara */

  document.addEventListener("click", (e) => {
    if (!asideBar.contains(e.target) && !expandAsideBtn.contains(e.target)) {
      asideBar.classList.remove("position__left--zero");
      mainContainer.classList.remove("background__content--visibility");

      console.log(e);
    }
  });
});

console.log(expandAsideBtn);
console.log(asideBar);

/* Carousel za 1280px za podcast anchore - funkcija primjenjiva na više stvari
po ID-u */

/* const dashboardPodcastCarousel = document.getElementById("podcastCarousel");
const dashboardFeaturedCarousel = document.getElementById("featuredCarousel");
const dashboardCategoriesCarousel =
  document.getElementById("categoriesCarousel"); */

const horizontalScrollArgs = [
  "podcastCarousel",
  "featuredCarousel",
  "categoriesCarousel",
];

function enableHorizontalScroll(carouselId) {
  const carousel = document.getElementById(carouselId);

  if (!carousel) return;

  const anchors = [...carousel.children];
  anchors.forEach((anchor) => {
    anchor.addEventListener("dragstart", (e) => e.preventDefault());
  });
  console.log(anchors);

  let pressDown = false;
  let startScrollX;
  let scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    anchors.forEach((anchor) => {
      anchor.classList.add("disable__pointers");
    });
    pressDown = true;
    startScrollX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    anchors.forEach((anchor) => {
      anchor.classList.remove("disable__pointers");
    });
    pressDown = false;
  });

  carousel.addEventListener("mouseup", () => {
    anchors.forEach((anchor) => {
      anchor.classList.remove("disable__pointers");
    });
    pressDown = false;
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!pressDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const move = x - startScrollX;
    carousel.scrollLeft = scrollLeft - move;
  });
}

horizontalScrollArgs.forEach(enableHorizontalScroll);

/* Kontroliranje pozicije offline i online elemenata anchora za podcaste  - 

Media Query 992px*/

const listaDashboardPodcasts = [...dashboardPodcasts];

listaDashboardPodcasts.forEach((podcastsListItem) => {
  const widthPodcastsItem = window.getComputedStyle(podcastsListItem).width;

  if (parseFloat(widthPodcastsItem) > 308) {
    const onlineContainer = podcastsListItem.querySelector(".flex__row--start");
    console.log(onlineContainer);

    onlineContainer.style.justifySelf = "flex-end";
    onlineContainer.style.marginRight = "10px";
  }
});

/* Trenutno na rezoluciji od 420px kreirano dinamično input polje */

const mainSearchBar = document.getElementById("search");

function handleInputFocus(event) {
  event.target.style.width = "200px";
  event.target.style.maxWidth = "200px";
}

function handleInputBlur(event) {
  event.target.style.width = "42px";
}

// Prati promjene u veličini zaslona

function updateSearchBarBehavior() {
  if (window.matchMedia("(max-width:600px)").matches) {
    mainSearchBar.placeholder = "";

    mainSearchBar.addEventListener("focus", handleInputFocus);
    mainSearchBar.addEventListener("blur", handleInputBlur);
  } else {
    mainSearchBar.placeholder = "Search anything here";

    mainSearchBar.removeEventListener("focus", handleInputFocus);
    mainSearchBar.removeEventListener("blur", handleInputBlur);
  }
}

updateSearchBarBehavior();
window.addEventListener("resize", updateSearchBarBehavior);

/* Na 420px također iz headera mičemo pojedine informacije i ubacujemo ih u dropdown
koji funkcionira na svim veličinama*/

const headerDropdownBtn = document.getElementById("profileDropdown");
const headerDropdown = document.getElementById("headerDropdown");
console.log(headerDropdown);

headerDropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  headerDropdown.classList.toggle("nav__dropdown--visibility");
});

document.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    headerDropdown.classList.contains("nav__dropdown--visibility") &&
    !headerDropdown.contains(e.target)
  ) {
    headerDropdown.classList.toggle("nav__dropdown--visibility");
  }
});

const soundButton = document.getElementById("soundButton");
const soundBar = document.getElementById("soundBar");
console.log(soundButton, soundBar);

soundButton.addEventListener("click", (e) => {
  e.stopPropagation();
  soundBar.classList.toggle("full__volume--visible");
});
