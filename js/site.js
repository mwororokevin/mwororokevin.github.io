/**
 *  Returns the current year in the copy right section of 
 *  the page.
 */

function returnCurrentYear() {
    document.getElementById("year-span").innerHTML = new Date().getFullYear();
}

window.onload = returnCurrentYear;

/**
 * Handle the mobile menu 
 * 
 */

let mobileMenu = document.getElementById("mobile-section-menu");

function toggleMobileMenu() {
    let displayValue = mobileMenu.style.display;

    if(displayValue == 'none') {
        mobileMenu.style.display = "block";
    } else {
        mobileMenu.style.display = "none";
    }
}


/**
 * Canvas Section
 * 
 */

let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLletiables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLletiables.length; i++) {
        sParameterName = sURLletiables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

let field = document.getElementById("field");
let f = field.getContext("2d");

let stars = {};
let starIndex = 0;
let numStars = 0;
let acceleration = 1;
let starsToDraw = (field.width * field.height) / 200;

if (getUrlParameter("stars")) {
  starsToDraw = getUrlParameter("stars");
}

if (getUrlParameter("accel")) {
  acceleration = getUrlParameter("accel");
} 


function Star() {
    this.X = field.width / 2;
    this.Y = field.height / 2;

    this.SX = Math.random() * 10 - 5;
    this.SY = Math.random() * 10 - 5;

    let start = 0;

    if (field.width > field.height)
        start = field.width;
    else
        start = field.height;

    this.X += this.SX * start / 10;
    this.Y += this.SY * start / 10;

    this.W = 1;
    this.H = 1;

    this.age = 0;
    this.dies = 500;

    starIndex++;
    stars[starIndex] = this;

    this.ID = starIndex;
    this.C = "#f5deb3";
}

Star.prototype.Draw = function () {
    this.X += this.SX;
    this.Y += this.SY
    
    this.SX += this.SX / (50 / acceleration);
  	this.SY += this.SY / (50 / acceleration);

    this.age++;

    if (this.age == Math.floor(50 / acceleration) | this.age == Math.floor(150 / acceleration) | this.age == Math.floor(300 / acceleration)) {
        this.W++;
        this.H++;
    }

    if (this.X + this.W < 0 | this.X > field.width |
        this.Y + this.H < 0 | this.Y > field.height)
      {
        delete stars[this.ID];
        numStars--;
			}
  
    f.fillStyle = this.C;
    f.fillRect(this.X, this.Y, this.W, this.H);
}

field.width = window.innerWidth;
field.height = window.innerHeight;

function draw() {
  	if (field.width != window.innerWidth)
      	field.width = window.innerWidth;
  	if (field.height != window.innerHeight)
      	field.height = window.innerHeight;
  
  	// Play with the "a" value to create streams...it's fun!
    f.fillStyle = "rgba(0, 0, 0, 0.8)";
    f.fillRect(0, 0, field.width, field.height);

    for (let i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
    }

    for (let star in stars) {
        stars[star].Draw();
    }
}

// Original timing of the screensaver
setInterval(draw, 40);


/**
 * Handles the scroll to top button
 * 
 */

let scrollToTopBtn = document.getElementById("scroll-to-top");

function scrollToTop() {
    if(document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

window.onscroll = function() {
    scrollToTop();
}

function toTheTop() {
    // document.body.scrollTop = 0; 
    // document.documentElement.scrollTop = 0;

    window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 * Handles the popup modal
 * 
 */

// let popupBtn = document.getElementById("tzagents");
// let modal = document.getElementById("popup");
// let closeBtn = document.getElementById("close");

// popupBtn.onclick = function(event) {
//     modal.style.display = "block";
// }

// window.onclick = function(event) {
//     if(event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// closeBtn.onclick = function(event) {
//     modal.style.display = "none";
// }

/**
 *  Handles the carousel
 * 
 */

// The Images list
let imageCarouseltzagents = ["images/tzagents/hometzagents.png", 
                            "images/tzagents/abouttzagents.png", 
                            "images/tzagents/forsaletzagents.png", 
                            "images/tzagents/dartzagents.png", 
                            "images/tzagents/contactzagents.png"];
let imageCarouselcegkenya = [];

let arrowLeft = document.getElementById("next-btn"),
    arrowRight = document.getElementById("prev-btn"),
    current = 0;

// Clear all images
function reset(imageCarouseltzagents) {
  for (let i = 0; i < imageCarouseltzagents.length; i++) {
    imageCarouseltzagents[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  imageCarouseltzagents[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  imageCarouseltzagents[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  imageCarouseltzagents[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }

  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }

  slideRight();
});

startSlide(); 
