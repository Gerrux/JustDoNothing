let side = "LEFT";
let countClicks = 0;
let ideas_en = new Array(
  "Find a charity and donate to it",
  "Start a collection",
  "Learn a new programming language",
  "Go to a concert with some friends",
  "Learn to write with your nondominant hand",
  "Create a plan and follow it",
  "Go see a Broadway production",
  "Learn a new recipe",
  "Learn to sew on a button",
  "Conquer one of your fears",
  "Pot some plants and put them around your house",
  "Find a DIY to do",
  "Go swimming with a friend",
  "Write a short story",
  "Clean out your car",
  "Surprise your significant other with something considerate",
  "Do a jigsaw puzzle",
  "Paint the first thing you see",
  "Write a handwritten letter to somebody",
  "Pick up litter around your favorite park",
  "Shop at support your local farmers market",
  "Uninstall unused apps from your devices",
  "Visit a nearby museum",
  "Watch the sunset or the sunrise",
  "Create a personal website",
  "Organize your basement",
  "Learn how to use an Arduino",
  "Repaint a room in your house",
  "Take a bubble bath",
  "Go to an escape room",
  "Learn how to fold a paper crane",
  "Create a compost pile",
  "Start a daily journal",
  "Learn about a distributed version control system such as Git",
  "Hold a video game tournament with some friends",
  "Find a charity and donate to it",
  "Catch up with a friend over a lunch date",
  "Learn woodworking",
  "Go to a concert with local artists with some friends",
  "Contribute code or a monetary donation to an open-source software project",
  "Make homemade ice cream",
  "Watch a classic movie",
  "Learn GraphQL",
  "Make a new friend",
  "Make your own LEGO creation",
  "Do something you used to do as a kid",
  "Try a food you don't like",
  "Listen to a new music genre",
  "Learn Express.js",
  "Read a formal research paper on an interesting subject",
  "Go to a local thrift shop",
  "Take a class at your local community center that interests you",
  "Compliment someone",
  "Make a couch fort",
  "Make a simple musical instrument",
  "Write a handwritten letter to somebody",
  "Rearrange and organize your room",
  "Plant a tree",
  "Catch up with a friend over a lunch date",
  "Learn a new programming language",
  "Do yoga",
  "Meditate for five minutes",
  "Take a caffeine nap",
  "Learn how to iceskate or rollerskate",
  "Prepare a dish from a foreign culture",
  "Learn Kotlin",
  "Bake something you've never tried before",
  "Catch up with a friend over a lunch date",
  "Explore the nightlife of your city",
  "Clean out your closet and donate the clothes you've outgrown",
  "Learn Javascript",
  "Organize your music collection",
  "Go stargazing",
  "Uninstall unused apps from your devices",
  "Start a book you've never gotten around to reading",
  "Uninstall unused apps from your devices",
  "Go on a fishing trip with some friends",
  "Have a paper airplane contest with some friends",
  "Draw and color a Mandala",
  "Draw something interesting",
  "Go for a walk",
  "Learn calligraphy",
  "Start a band",
  "Explore the nightlife of your city",
  "Meditate for five minutes",
  "Clean out your garage",
  "Go to the gym",
  "Resolve a problem you've been putting off",
  "Learn the Chinese erhu",
  "Go to a concert with some friends",
  "Plan a trip to another country",
  "Write a handwritten letter to somebody",
  "Create a compost pile",
  "Go to a concert with local artists with some friends",
  "Learn about the Golden Ratio",
  "Organize a cluttered drawer",
  "Have a picnic with some friends",
  "Learn the NATO phonetic alphabet",
  "Start a blog for something you're passionate about",
  "Learn how to make an Alexa skill",
  "Watch a classic movie"
);

$(".container").on("click", function () {
  $(".card").toggleClass("flipped");
  genIdea();
});

function genIdea(){
  if (side == "LEFT") {
    document.querySelector('.front').innerHTML = "Loading...";
    document.querySelector('.back').innerHTML = ideas_en[randomIntFromInterval(0, 101)];
    side = "RIGHT";
  } else if (side == "RIGHT") {
    document.querySelector('.front').innerHTML = ideas_en[randomIntFromInterval(0, 101)];
    document.querySelector('.back').innerHTML = "Loading...";
    side = "LEFT";
  }  
}

function showNotification() {
  document.querySelector('.container-notification').style.display = "flex";
  document.querySelector('#notification h6').innerHTML = ideas_en[randomIntFromInterval(0, 101)];
  restartAnimation();
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


var notiBar = document.getElementById("notification");

function restartAnimation() {
    notiBar.classList.remove("animation");
    void notiBar.offsetHeight;
    notiBar.classList.add("animation");
}


document.querySelector('.animal').addEventListener("click", function(){
  if (countClicks % 1000 == 0 && countClicks !=0 ) {
    document.querySelector(".container-notification").style.display = "block";
    showNotification();
  }
  countClicks = countClicks + 1;
})

// document.addEventListener(".animal"). {}