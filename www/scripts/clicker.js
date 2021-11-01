"use strict"; 

const images = {
		"cat": "images/foods/fish.png",
    "korgi": "images/foods/bone.png",
    "panda": "images/foods/popcorn.png",
    "red_panda": "images/foods/berry.png",
    "koala": "images/foods/leaf.png",
    "sloth": "images/foods/pizza.png",
  };

const purchasedAnimalsClear = {
  "cat": true,
  "korgi": false,
  "panda": false,
  "red_panda": false,
  "koala": false,
  "sloth": false,
};

const purchasedUpgradesClear = {
  "cursor": 0,
  "box": 0,
  "container": 0,
  "railway_carriage": 0,
  "ship": 0,
  "warehouse": 0,
  "crown": 0
};

const costAnimals = {
  "cat": 0,
  "korgi": 20000,
  "panda": 750000,
  "red_panda": 80000000,
  "koala": 1500000000,
  "sloth": 100000000000,
};

const costUpgrades = {
  "cursor": 100,
  "box": 100,
  "container": 500,
  "railway_carriage": 1000,
  "ship": 5000,
  "warehouse": 10000,
  "crown": 50000,
};

const upgradeMoneyUp = {
  "cursor": 2.5,
  "box": 0.1,
  "container": 0.5,
  "railway_carriage": 1,
  "ship": 5,
  "warehouse": 10,
  "crown": 50,
}

let money;
let moneyUp;
let moneyUpAuto;
let purchasedAnimals;
let purchasedUpgrades;
let visibleAnimal;
let newPlayer;
let moneyOnDisplay;
let musicVolume;
let playerStorage = window.localStorage;
let music = new Audio();


function startMusic() {
  try {
    music.src = "audio/" + playerStorage.theme.replace("theme-", "") + ".mp3"
  } catch {
    music.src = "audio/light.mp3"
  }
  
  musicVolume = parseFloat(playerStorage.musicVolume);
  document.querySelector('.range_input').value = parseFloat(musicVolume);
  if (isNaN(musicVolume)) {
      musicVolume = 0.1;
  }
  music.volume = parseFloat(musicVolume);
  music.loop = true;
  music.play();
}

function changevolume(amount) {
  if (isNaN(amount)) {
      amount = 0.1;
  }
  musicVolume = amount;
  if (musicVolume == 0.01) {
    music.volume = 0;
    playerStorage.musicVolume = 0;
  }
  music.volume = parseFloat(musicVolume);
  playerStorage.musicVolume = parseFloat(musicVolume);
}



function renderData() {
  newPlayer = playerStorage.newPlayer;
  // console.log(newPlayer);
  if (newPlayer == undefined) {
    hardReset();
  } else if (playerStorage.money == undefined) {
    hardReset();
  };
  money = +playerStorage.money;
  moneyUp = +playerStorage.moneyUp;
  renderMoneyUpAuto();
  purchasedAnimals = JSON.parse(playerStorage.getItem('purchasedAnimals'));
  purchasedUpgrades = JSON.parse(playerStorage.getItem('purchasedUpgrades'));
  visibleAnimal = playerStorage.visibleAnimal;
  document.querySelector('.money').innerHTML = moneyOnDisplay;
  document.getElementById(visibleAnimal).style.display = "block";
};

function hardReset() {
  localStorage.clear();
  playerStorage.setItem('newPlayer', false);
  playerStorage.setItem('money', 0);
  playerStorage.setItem('moneyUp', 1);
  playerStorage.setItem('musicVolume', 0.7);
  playerStorage.setItem('purchasedAnimals', JSON.stringify(purchasedAnimalsClear));
  playerStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgradesClear));
  playerStorage.setItem('visibleAnimal', 'cat');
  location.reload();
};

function saveData() {
  playerStorage.setItem('money', money.toFixed(1));
  playerStorage.setItem('moneyUp', moneyUp);
  playerStorage.setItem('musicVolume', musicVolume);
  playerStorage.setItem('purchasedAnimals', JSON.stringify(purchasedAnimals));
  playerStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
  playerStorage.setItem('visibleAnimal', visibleAnimal);
};

function closeModalShop() {
  document.querySelector("#modal-container-shop").classList.add("out");
  document.querySelector("#modal-container-shop").classList.remove("two");
  document.querySelector(".score").classList.remove("two");
  document.querySelector(".modal-shop #error-message").innerHTML = "  ";
  document.querySelector("#buy_animal_cat").style.display = "none";
  document.querySelector("#buy_animal_korgi").style.display = "none";
  document.querySelector("#buy_animal_panda").style.display = "none";
  document.querySelector("#buy_animal_red_panda").style.display = "none";
  document.querySelector("#buy_animal_koala").style.display = "none";
  document.querySelector("#buy_animal_sloth").style.display = "none";
};

function chooseAnimal(animal) {
  let purchasedAnimalRightNow;
  let id = "#buy_animal_" + animal;
  let aid = "#item_" + animal + " .cost";
  document.querySelector(".modal-shop .cost").innerHTML = document.querySelector(aid).innerHTML;
  document.querySelector(id).style.display = "block";
  document.querySelector(".modal-shop #hidden_value").innerHTML = animal;
  document.querySelector(".modal-shop .title-text").innerHTML = animal.toUpperCase().replace("_", " ");
  document.querySelector(".score").classList.add("two");
  document.querySelector("#modal-container-shop").classList.remove("out");
  document.querySelector("#modal-container-shop").classList.add("two");
};

function buyAnimal() {
  let animal = document.querySelector(".modal-shop #hidden_value").innerHTML;
  purchasedAnimals = JSON.parse(playerStorage.getItem('purchasedAnimals'));
  if (purchasedAnimals[animal]) {
    document.getElementById(visibleAnimal).style.display = "none";
    document.getElementById(animal).style.display = "block";
    visibleAnimal = animal;
    playerStorage.setItem('visibleAnimal', animal);
    clearCanvas();
    startCanvas();
    closeModalShop();
    loadIcons();
  } else if (money < costAnimals[animal]) {
    document.querySelector(".modal-shop #error-message").innerHTML = "You don't have enough food";
  } else {
    money = money - costAnimals[animal];
    purchasedAnimals[animal] = true;
    playerStorage.setItem('purchasedAnimals', JSON.stringify(purchasedAnimals));
    document.getElementById(visibleAnimal).style.display = "none";
    document.getElementById(animal).style.display = "block";
    visibleAnimal = animal;
    playerStorage.setItem('visibleAnimal', animal);
    document.querySelector("#modal-container-shop").classList.add("out");
    document.querySelector("#modal-container-shop").classList.remove("two");
    document.querySelector(".score").classList.remove("two");
    renderMoneyUpAuto();
    clearCanvas();
    startCanvas();
    saveData();
    loadIcons();
    closeModalShop();
  };
};

function chooseUpgrade(upgrade) {
  let purchasedAnimalRightNow;
  let id = "#buy_upgrade_" + upgrade;
  let aid = "#upgrade_" + upgrade + " .cost";
  document.querySelector(".modal-upgrade .cost").innerHTML = document.querySelector(aid).innerHTML;
  document.querySelector(id).style.display = "block";
  document.querySelector(".modal-upgrade #hidden_value").innerHTML = upgrade;
  document.querySelector(".modal-upgrade .title-text").innerHTML = upgrade.toUpperCase().replace("_", " ");
  document.querySelector(".score").classList.add("two");
  document.querySelector("#modal-container-upgrade").classList.remove("out");
  document.querySelector("#modal-container-upgrade").classList.add("two");
  document.querySelector(".title .count-upgrades").innerHTML = "x" + purchasedUpgrades[upgrade].toString();
};

function buyUpgrade(countUpgrades) {
  let upgrade = document.querySelector(".modal-upgrade #hidden_value").innerHTML;
  purchasedUpgrades = JSON.parse(playerStorage.getItem('purchasedUpgrades'));
  let cost;
  if (upgrade == "cursor"){
    cost = costUpgrades[upgrade]*(4.7**(purchasedUpgrades[upgrade]+countUpgrades-1));
  } else {
    cost = costUpgrades[upgrade]*(1.1**(purchasedUpgrades[upgrade]+countUpgrades-1));
  }
  if (money < cost) {
    document.querySelector(".modal-upgrade #error-message").innerHTML = "You don't have enough food";
  } else {
    money = money - cost;
    purchasedUpgrades[upgrade] = purchasedUpgrades[upgrade] + countUpgrades;
    playerStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
    saveData();
    renderUpgrades();
    renderMoneyUpAuto();
    let aid = "#upgrade_" + upgrade + " .cost";
    document.querySelector(".modal-upgrade .cost").innerHTML = document.querySelector(aid).innerHTML;
    document.querySelector(".title .count-upgrades").innerHTML = "x" + purchasedUpgrades[upgrade].toString();
  };
};

function closeModalUpgrade() {
  document.querySelector("#modal-container-upgrade").classList.add("out");
  document.querySelector("#modal-container-upgrade").classList.remove("two");
  document.querySelector(".score").classList.remove("two");
  document.querySelector(".modal-upgrade #error-message").innerHTML = "  ";
  document.querySelector("#buy_upgrade_cursor").style.display = "none";
  document.querySelector("#buy_upgrade_box").style.display = "none";
  document.querySelector("#buy_upgrade_container").style.display = "none";
  document.querySelector("#buy_upgrade_railway_carriage").style.display = "none";
  document.querySelector("#buy_upgrade_ship").style.display = "none";
  document.querySelector("#buy_upgrade_warehouse").style.display = "none";
  document.querySelector("#buy_upgrade_crown").style.display = "none";
};


function bigCyphers(query) {
  let answer;
  let lengthQuery = String(query).length
  if (lengthQuery > 12) {
    answer = (query / 1000000000000).toFixed(2) + "T";
  } else if (lengthQuery > 9) {
    answer = (query / 1000000000).toFixed(2) + "B";
  } else if (lengthQuery > 6) {
    answer = (query / 1000000).toFixed(2) + "M";
  } else if (lengthQuery > 4) {
    answer = (query / 1000).toFixed(2) + "K";
  } else {
    answer = query;
  };
  return answer;
}

function renderMoneyUpAuto() {
  purchasedUpgrades = JSON.parse(playerStorage.getItem('purchasedUpgrades'));
  purchasedAnimals = JSON.parse(playerStorage.getItem('purchasedAnimals'));
  let count = (Object.values(purchasedAnimals)).filter(function(value){return value});
  let multiplayer = count.length - 1;
  moneyUpAuto = 0.1 * purchasedUpgrades["box"] + 0.5 * purchasedUpgrades["container"] + 1 * purchasedUpgrades["railway_carriage"] + 5 * purchasedUpgrades["ship"] + 10 * purchasedUpgrades["warehouse"] + 50 * purchasedUpgrades["crown"];
  moneyUpAuto = moneyUpAuto * (3 ** multiplayer);
}

function renderUpgrades() {
  purchasedUpgrades = JSON.parse(playerStorage.getItem('purchasedUpgrades'));
  let cost_cursor = (costUpgrades["cursor"] * (4.7 ** purchasedUpgrades["cursor"])).toFixed(0);
  let cost_box = (costUpgrades["box"] * (1.1 ** purchasedUpgrades["box"])).toFixed(0);
  let cost_container = (costUpgrades["container"] * (1.1 ** purchasedUpgrades["container"])).toFixed(0);
  let cost_railway_carriage = (costUpgrades["railway_carriage"] * (1.1 ** purchasedUpgrades["railway_carriage"])).toFixed(0);
  let cost_ship = (costUpgrades["ship"] * (1.1 ** purchasedUpgrades["ship"])).toFixed(0);
  let cost_warehouse = (costUpgrades["warehouse"] * (1.1 ** purchasedUpgrades["warehouse"])).toFixed(0);
  let cost_crown = (costUpgrades["crown"] * (1.1 ** purchasedUpgrades["crown"])).toFixed(0);
  document.querySelector("#upgrade_cursor .cost").innerHTML = bigCyphers(cost_cursor);
  document.querySelector("#upgrade_box .cost").innerHTML = bigCyphers(cost_box);
  document.querySelector("#upgrade_container .cost").innerHTML = bigCyphers(cost_container);
  document.querySelector("#upgrade_railway_carriage .cost").innerHTML = bigCyphers(cost_railway_carriage);
  document.querySelector("#upgrade_ship .cost").innerHTML = bigCyphers(cost_ship);
  document.querySelector("#upgrade_warehouse .cost").innerHTML = bigCyphers(cost_warehouse);
  document.querySelector("#upgrade_crown .cost").innerHTML = bigCyphers(cost_crown);
  document.querySelector("#upgrade_cursor .count-upgrades").innerHTML = "x" + purchasedUpgrades["cursor"].toString();
  document.querySelector("#upgrade_box .count-upgrades").innerHTML = "x" + purchasedUpgrades["box"].toString();
  document.querySelector("#upgrade_container .count-upgrades").innerHTML = "x" + purchasedUpgrades["container"].toString();
  document.querySelector("#upgrade_railway_carriage .count-upgrades").innerHTML = "x" + purchasedUpgrades["railway_carriage"].toString();
  document.querySelector("#upgrade_ship .count-upgrades").innerHTML = "x" + purchasedUpgrades["ship"].toString();
  document.querySelector("#upgrade_warehouse .count-upgrades").innerHTML = "x" + purchasedUpgrades["warehouse"].toString();
  document.querySelector("#upgrade_crown .count-upgrades").innerHTML = "x" + purchasedUpgrades["crown"].toString();  
}

function autoClick() {
  money = money + moneyUpAuto;
	if (moneyUpAuto == 0){
    document.querySelector('.money').innerHTML = bigCyphers(money.toFixed(0));
  } else {
    document.querySelector('.money').innerHTML = bigCyphers(money.toFixed(0)) + " <br>(+" + bigCyphers(moneyUpAuto.toFixed(1)) + " Food/s)";
  }
}

function loadIcons() {
  const imgs = ["money__icon", "cost_icon1", "cost_icon2", 
  "cost_icon3", "cost_icon4", "cost_icon5", 
  "cost_icon6", "cost_icon7", "cost_icon8", 
  "cost_icon9", "cost_icon10", "cost_icon11", 
  "cost_icon12", "cost_icon13", "cost_icon14", 
  "cost_icon15"];
 
  imgs.forEach(function(elementId){
    document.getElementById(elementId).src = images[playerStorage.visibleAnimal];
  });
}

window.addEventListener("load", loadIcons(), false);

document.addEventListener("DOMContentLoaded", startMusic());

renderData();
renderUpgrades();
document.querySelector('.animal').addEventListener("click", function(){
  money = money + moneyUp * (upgradeMoneyUp["cursor"] ** purchasedUpgrades["cursor"]);
  if (moneyUpAuto == 0){
    document.querySelector('.money').innerHTML = bigCyphers(money.toFixed(0));
  } else {
    document.querySelector('.money').innerHTML = bigCyphers(money.toFixed(0)) + " <br>(+" + bigCyphers(moneyUpAuto.toFixed(1)) + " Food/s)";
  }
	
})

document.querySelector('#shop-deny').addEventListener("click", function(){
  closeModalShop();
})

document.querySelector('#upgrade-deny').addEventListener("click", function(){
  closeModalUpgrade();
})

document.querySelector('#about_us').addEventListener("click", function(){
  if (money.toFixed(0) == 13) {
    money = money + 100000000000;
  }
})

setInterval(saveData, 30000);
setInterval(autoClick, 1000);