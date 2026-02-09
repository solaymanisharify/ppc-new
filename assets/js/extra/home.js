// ------------------------------------

window.addEventListener("scroll", (event) => {
  const scrolled = window.scrollY;
  if (scrolled <= 75) {
    $("#navBg").css({
      backgroundColor: "",
    });
  }
  if (scrolled >= 75) {
    $("#navBg").css({
      backgroundColor: "black",
    });
  }
});

// ---------------- sub category page------------------------
window.addEventListener("scroll", (event) => {
  const scrolled = window.scrollY;
  if (scrolled <= 75) {
    $("#nav_sub_bg").css({
      backgroundColor: "",
    });
    $(".changeSVG-sub-icon").css({
      filter: "",
    });
    $(".changeFontColorOnHover").css({
      color: "black",
    });
  }
  if (scrolled >= 75) {
    $("#nav_sub_bg").css({
      backgroundColor: "black",
    });
    $(".changeSVG-sub-icon").css({
      filter:
        "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
    });
    $(".changeFontColorOnHover").css({
      color: "white",
    });
    $("#hover-spinner").toggleClass("whitespinner");
  }
});

// -----------------------------------------------

function navDropdown(num) {

  if(num == "0"){
    document.body.style.overflowY = 'visible';
    document.body.style.overflowX = 'hidden';
  }else{
    document.body.style.overflow = 'hidden';
  }
  
 
  $('.golink').removeClass(' active');
  $('#golink-'+num).addClass(' active');
  $("#nav-dropdown-left").toggleClass("nav-dropdown-ht");
  $("#nav-dropdown-right").toggleClass("nav-dropdown-ht");
}

function navDropdownMobile(num) {
  if(num == "0"){
    document.body.style.overflowY = 'visible';
    document.body.style.overflowX = 'hidden';
  }else{
    document.body.style.overflow = 'hidden';
  }
  $("#nav-dropdown-first").toggleClass("nav-dropdown-ht");
}

function topDropdownRightChange(id) {
  if (id == 1) {
    $("#data_management_mobile").toggleClass("nav-dropdown-wd");
  }
  if (id == 2) {
    $("#Sponsored_mobile").toggleClass("nav-dropdown-wd");
  }
  if (id == 3) {
    $("#Digital_Marketing_mobile").toggleClass("nav-dropdown-wd");
  }
  if (id == 4) {
    $("#Website_Development_mobile").toggleClass("nav-dropdown-wd");
  }
  if (id == 5) {
    $("#Creative_Graphics_mobile").toggleClass("nav-dropdown-wd");
  }
  if (id == 6) {
    $("#Customer_Support_mobile").toggleClass("nav-dropdown-wd");
  }
  if (id == 7) {
    $("#multichannel_softwares_mobile").toggleClass("nav-dropdown-wd");
  }
}

// ------------------------------------------

var dheader = document.getElementById("nav-dropdown");
// var dbtns = dheader.getElementsByClassName("dropdown-btn");

// for (var i = 0; i < dbtns.length; i++) {
//   dbtns[i].addEventListener("click", function () {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }


// ------------------------------------------

var subheader = document.getElementById("nav-dropdown-menu");
// var subbtns = subheader.getElementsByClassName("dropdown-btn-sub");

// for (var i = 0; i < subbtns.length; i++) {
//   subbtns[i].addEventListener("click", function () {
//     console.log(subbtns);
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }

// -----------------------------------

// const txts = document.querySelector(".animate-text").children,
//   txtsLen = txts.length;
// let index = 0;
// const textInTimer = 3000,
//   textOutTimer = 2800;

// function animateText() {
//   for (let i = 0; i < txtsLen; i++) {
//     txts[i].classList.remove("text-in", "text-out");
//   }
//   // console.log(index);
//   if (index == 0) {
//     const myElement = document.getElementById("back");
//     myElement.style.background =
//       "linear-gradient(45deg, #6502D5 , #5C10D9, #0B83FE)";
//   }
//   if (index == 1) {
//     const myElement = document.getElementById("back");
//     myElement.style.background =
//       "linear-gradient(45deg, #5808FB , #5C10D9, #AB0BFE)";
//   }
//   if (index == 2) {
//     const myElement = document.getElementById("back");
//     myElement.style.background = "linear-gradient(45deg, #A521E9, #FF9147)";
//   }
//   if (index == 3) {
//     const myElement = document.getElementById("back");
//     myElement.style.background = "linear-gradient(45deg, #F2934E , #AE2CD7)";
//   }
//   if (index == 4) {
//     const myElement = document.getElementById("back");
//     myElement.style.background = "linear-gradient(45deg, #AA03DA, #1A31DB)";
//   }
//   if (index == 5) {
//     const myElement = document.getElementById("back");
//     myElement.style.background = "linear-gradient(45deg,  #0118FE, #039AFE)";
//   }
//   if (index == 6) {
//     const myElement = document.getElementById("back");
//     myElement.style.background = "linear-gradient(45deg, #028EDE,  #2DE592)";
//   }

//   txts[index].classList.add("text-in");

//   setTimeout(function () {
//     txts[index].classList.add("text-out");
//   }, textOutTimer);

//   setTimeout(function () {
//     if (index == txtsLen - 1) {
//       index = 0;
//     } else {
//       index++;
//     }
//     animateText();
//   }, textInTimer);
// }

// //  window.onload=animateText;
// window.addEventListener("load", animateText);

//  --------------------------------------------------------------

// var myCarousel = document.querySelector("#Award");
// var carousel = new bootstrap.Carousel(myCarousel, {
//   interval: 3000,
//   //   wrap: false
// });

// ---------------------------

var technology_1 = document.getElementById("technology-logo-1");
var technology_2 = document.getElementById("technology-logo-2");
var technology_3 = document.getElementById("technology-logo-3");
var technology_4 = document.getElementById("technology-logo-4");
var technology_5 = document.getElementById("technology-logo-5");
var technology_6 = document.getElementById("technology-logo-6");
var technology_7 = document.getElementById("technology-logo-7");
var technology_8 = document.getElementById("technology-logo-8");
var technology_9 = document.getElementById("technology-logo-9");
var bg_left = document.getElementById("bg-left");

window.addEventListener("load", (e) => {
  technology_1.style.animation = "tech-logo-1 3s";
  technology_2.style.animation = "tech-logo-2 3s";
  technology_3.style.animation = "tech-logo-3 3s";
  technology_4.style.animation = "tech-logo-4 3s";
  technology_5.style.animation = "tech-logo-5 3s";
  technology_6.style.animation = "tech-logo-6 3s";
  technology_7.style.animation = "tech-logo-7 3s";
  technology_8.style.animation = "tech-logo-8 3s";
  technology_9.style.animation = "tech-logo-9 3s";
  bg_left.style.animation = "tech-bg 4s";
});

window.addEventListener("scroll", (event) => {
  // const scrollable = document.documentElement.scrollHeight -window.innerHeight;
  const scrolled = window.scrollY;

  // console.log(scrolled);

  if (scrolled <= 22900) {
    technology_1.style.animation = "";
    technology_2.style.animation = "";
    technology_3.style.animation = "";
    technology_4.style.animation = "";
    technology_5.style.animation = "";
    technology_6.style.animation = "";
    technology_7.style.animation = "";
    technology_8.style.animation = "";
    technology_9.style.animation = "";
    bg_left.style.animation = "";
  }

  if (scrolled >= 22900) {
    technology_1.style.animation = "tech-logo-1 3s";
    technology_2.style.animation = "tech-logo-2 3s";
    technology_3.style.animation = "tech-logo-3 3s";
    technology_4.style.animation = "tech-logo-4 3s";
    technology_5.style.animation = "tech-logo-5 3s";
    technology_6.style.animation = "tech-logo-6 3s";
    technology_7.style.animation = "tech-logo-7 3s";
    technology_8.style.animation = "tech-logo-8 3s";
    technology_9.style.animation = "tech-logo-9 3s";
    bg_left.style.animation = "tech-bg 4s";
  }
});

// --------------------------------------------

function dropdownRightChange(id) {
  if (id === 1) {
    $(".dropdown-body-1").css({ display: "block" });
    $(".dropdown-body-2").css({ display: "none" });
    $(".dropdown-body-3").css({ display: "none" });
    $(".dropdown-body-4").css({ display: "none" });
    $(".dropdown-body-5").css({ display: "none" });
    $(".dropdown-body-6").css({ display: "none" });
    $(".dropdown-body-7").css({ display: "none" });
  } else if (id === 2) {
    $(".dropdown-body-1").css({ display: "none" });
    $(".dropdown-body-2").css({ display: "block" });
    $(".dropdown-body-3").css({ display: "none" });
    $(".dropdown-body-4").css({ display: "none" });
    $(".dropdown-body-5").css({ display: "none" });
    $(".dropdown-body-6").css({ display: "none" });
    $(".dropdown-body-7").css({ display: "none" });
  } else if (id === 3) {
    $(".dropdown-body-1").css({ display: "none" });
    $(".dropdown-body-2").css({ display: "none" });
    $(".dropdown-body-3").css({ display: "block" });
    $(".dropdown-body-4").css({ display: "none" });
    $(".dropdown-body-5").css({ display: "none" });
    $(".dropdown-body-6").css({ display: "none" });
    $(".dropdown-body-7").css({ display: "none" });
  } else if (id === 4) {
    $(".dropdown-body-1").css({ display: "none" });
    $(".dropdown-body-2").css({ display: "none" });
    $(".dropdown-body-3").css({ display: "none" });
    $(".dropdown-body-4").css({ display: "block" });
    $(".dropdown-body-5").css({ display: "none" });
    $(".dropdown-body-6").css({ display: "none" });
    $(".dropdown-body-7").css({ display: "none" });
  } else if (id === 5) {
    $(".dropdown-body-1").css({ display: "none" });
    $(".dropdown-body-2").css({ display: "none" });
    $(".dropdown-body-3").css({ display: "none" });
    $(".dropdown-body-4").css({ display: "none" });
    $(".dropdown-body-5").css({ display: "block" });
    $(".dropdown-body-6").css({ display: "none" });
    $(".dropdown-body-7").css({ display: "none" });
  } else if (id === 6) {
    $(".dropdown-body-1").css({ display: "none" });
    $(".dropdown-body-2").css({ display: "none" });
    $(".dropdown-body-3").css({ display: "none" });
    $(".dropdown-body-4").css({ display: "none" });
    $(".dropdown-body-5").css({ display: "none" });
    $(".dropdown-body-6").css({ display: "block" });
    $(".dropdown-body-7").css({ display: "none" });
  }
   else if (id === 7) {
    $(".dropdown-body-1").css({ display: "none" });
    $(".dropdown-body-2").css({ display: "none" });
    $(".dropdown-body-3").css({ display: "none" });
    $(".dropdown-body-4").css({ display: "none" });
    $(".dropdown-body-5").css({ display: "none" });
    $(".dropdown-body-6").css({ display: "none" });
    $(".dropdown-body-7").css({ display: "block" });
  }
}
