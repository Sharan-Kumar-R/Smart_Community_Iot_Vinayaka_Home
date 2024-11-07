let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
    fetchData();
    
});
async function fetchData() {
  const airurl = "https://api.thingspeak.com/channels/2731561/feeds.json?results=1";
  const response = await fetch(airurl);
  const data = await response.json();

  const gas = parseFloat(data.feeds[0].field6);
  const distance = parseFloat(data.feeds[0].field5);
  const fire = parseFloat(data.feeds[0].field3);
  const motion = parseFloat(data.feeds[0].field4);
  const humidity = parseFloat(data.feeds[0].field2);
  const temperature = parseFloat(data.feeds[0].field1);

  if (gas > 800) {
      document.getElementById("gas").innerText = "Smoke percentage is high";
  } else {
      document.getElementById("gas").innerText = "";
  }

  if (motion === 1) {
      document.getElementById("motion").innerText = "Motion detected";
  } else {
      document.getElementById("motion").innerText = "";
  }

  if (distance > 30) {
      document.getElementById("distance").innerText = "Parking slot is available";
  } else {
      document.getElementById("distance").innerText = "";
  }

  if (fire === 1) {
      document.getElementById("fire").innerText = "Fire detected";
  } else {
      document.getElementById("fire").innerText = "";
  }

  if (temperature > 28) {
      document.getElementById("temperature").innerText = "Temperature is high";
  } else {
      document.getElementById("temperature").innerText = "Temperature is cool";
  }

  if (humidity > 60) {
      document.getElementById("humidity").innerText = "Humidity level is high";
  } else {
      document.getElementById("humidity").innerText = "";
  }
}



// Initial fetch
fetchData();
formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});