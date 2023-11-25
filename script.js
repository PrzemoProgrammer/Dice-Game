const rollBtn = document.querySelector(".roll-btn");
const diceContainer = document.querySelector(".dice-container");
const dice = document.querySelector(".dice");
const diceWallsText = document.querySelectorAll(".result-text");
const titleText = document.querySelectorAll(".title-text");
const resultFace = document.querySelectorAll(".result-face");

const rollMax = 8;
const winText =
  "<span style='color:green'>WIN</span></br></br>$100</br>Voucher";
const lostText = "<span style='color:red'> SORRY </span>";

let angleX = 0,
  angleY = 0,
  result = 1,
  delay = 0,
  canRoll = true;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

function getRotation(result) {
  switch (result) {
    case 1:
      return 0;
    case 2:
      return 0;
    case 3:
      return 90;
    case 4:
      return 270;
    case 5:
      return 180;
    case 6:
      return 180;
  }
}

const roll = () => {
  canRoll = false;

  rollBtn.style.visibility = "hidden";

  console.log("let's roll");

  const xTurn = 4 + getRandomInt(rollMax);
  const yTurn = 4 + getRandomInt(rollMax);

  delay = Math.max(xTurn, yTurn) * 250;

  angleX += 90 * xTurn;
  angleY += 90 * yTurn;

  if (angleX % 180) {
    getRandomInt(3) > 1 && (angleX += 90);
  }

  dice.style.transform =
    "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)";
  dice.style.transitionDuration = delay + "ms";

  let x = angleX % 360;
  let y = angleY % 360;

  if (x === 0 || x === 180) {
    switch ((x + y) % 360) {
      case 0:
        result = 1;
        break;
      case 90:
        result = 5;
        break;
      case 180:
        result = 6;
        break;
      case 270:
        result = 2;
        break;
      default:
        console.error(123456);
    }
  } else if (x === 90) {
    result = 4;
  } else if (x === 270) {
    result = 3;
  }

  dice.addEventListener("transitionend", () => {
    console.log("finish");
    dice.style.visibility = "hidden";
    resultFace[0].style.visibility = "visible";

    if (result == 4 || result == 5 || result == 6) {
      diceWallsText[3].innerHTML = winText;
      diceWallsText[5].innerHTML = winText;
      diceWallsText[2].innerHTML = winText;
      diceWallsText[6].innerHTML = winText;
      titleText[0].innerHTML = "</br></br>Your Lucky Day !";
    } else {
      diceWallsText[0].innerHTML = lostText;
      diceWallsText[1].innerHTML = lostText;
      diceWallsText[4].innerHTML = lostText;
      diceWallsText[6].innerHTML = lostText;
      titleText[0].innerHTML = "</br></br>Have a Nice Day!";
    }
  });

  setTimeout(() => (canRoll = true), delay);

  console.log("result:", result);
  return result;
};

rollBtn.addEventListener("click", () => canRoll && roll());

window.addEventListener("devicemotion", (event) => {
  const acceleration = event.accelerationIncludingGravity;
  const threshold = 15;

  if (
    Math.abs(acceleration.x) > threshold ||
    Math.abs(acceleration.y) > threshold ||
    Math.abs(acceleration.z) > threshold
  ) {
    roll();
  }
});
