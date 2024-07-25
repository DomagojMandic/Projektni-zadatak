"use strict";

/* Event listener za prikaz aside bara na klik buttona */

const expandAsideBtn = document.getElementById("expandAsideEl");
const asideBar = document.querySelector(".aside__bar");
const contractAsideBtn = document.getElementById("closeAsideEl");

document.addEventListener("DOMContentLoaded", () => {
  /* Togglanje klasa vidljivosti */
  expandAsideBtn.addEventListener("click", () => {
    asideBar.classList.toggle("position__left--zero");
    contractAsideBtn.classList.toggle("hidden");
  });

  contractAsideBtn.addEventListener("click", () => {
    asideBar.classList.toggle("position__left--zero");
  });

  /* Short circuit u slučaju da se klikne unutar aside bara */

  document.addEventListener("click", (e) => {
    if (!asideBar.contains(e.target) && !expandAsideBtn.contains(e.target)) {
      asideBar.classList.remove("position__left--zero");
      console.log(e);
    }
  });
});

console.log(expandAsideBtn);
console.log(asideBar);
