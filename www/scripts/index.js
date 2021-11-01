showIdeas = function() {
  document.querySelector(".clicker").style.display = "none";
  document.querySelector(".shop").style.display = "none";
  document.querySelector(".idea").style.display = "flex";
}

showClicker = function() {
  document.querySelector(".clicker").style.display = "block";
  document.querySelector(".shop").style.display = "none";
  document.querySelector(".idea").style.display = "none";
}

showShop = function() {
  document.querySelector(".clicker").style.display = "none";
  document.querySelector(".shop").style.display = "flex";
  document.querySelector(".idea").style.display = "none";
}

showAnimalShop = function() {
  document.querySelector(".shop-animals").style.display = "flex";
  document.querySelector(".shop-upgrades").style.display = "none";
}

showUpgradeShop = function() {
  document.querySelector(".shop-animals").style.display = "none";
  document.querySelector(".shop-upgrades").style.display = "flex";
}

showContactsInfo = function() {
  document.querySelector("#modal-container .modal").style.display = "none";
  document.querySelector(".contacts").style.display = "flex";
}


/* MODAL WINDOWS OPEN */
$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})

$('.modal #deny').click(function(){
  $('#modal-container').addClass('out');
  $('body').removeClass('modal-active');
});

$('.modal #accept').click(function(){
  $('#modal-container').addClass('out');
  $('body').removeClass('modal-active');
});


$('.contacts #deny').click(function(){
  $('#modal-container').addClass('out');
  document.querySelector(".contacts").style.display = "none";
  $('body').removeClass('modal-active');
  setTimeout(function(){
    document.querySelector("#modal-container .modal").style.display = "flex";
  }, 500);
});
/* MODAL WINDOWS CLOSE */

/* SWITCH COLOR THEME OPEN */
 // function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
    document.querySelector("#lamp").style.display = "none";
    startMusic();
  } else {
    setTheme('theme-dark');
    document.querySelector("#lamp").style.display = "block";
    startMusic();
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    document.getElementById('slider').checked = false;
    document.querySelector("#lamp").style.display = "block";
  } else {
    setTheme('theme-light');
    document.getElementById('slider').checked = true;
    document.querySelector("#lamp").style.display = "none";
  }
})();
/* SWITCH COLOR THEME CLOSE */
