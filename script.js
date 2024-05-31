const imgElf = document.getElementById("imgElf");
const buttonHello = document.getElementById("hello");
const buttonWater = document.getElementById("water");
const buttonFeed = document.getElementById("feed");
const buttonSleep = document.getElementById("sleep");
const xpscore = document.getElementById("xpscore");
const happyMessage = document.getElementById("happyMessage");
let waterCount = 0;
let feedCount = 0;
let sleepCount = 0;
let totalCount = 0;
let sleepInterval;
let countInterval;

buttonHello.addEventListener("click", function () {
  clearSleepInterval();
  imgElf.src = "afbeeldingen/elf_happy.png";
});

buttonWater.addEventListener("click", function () {
  clearSleepInterval();
  updateWaterCount();
  if (waterCount < 3) {
    imgElf.src = "afbeeldingen/elf_wet.png";
  } else {
    alert("I'm not thirsty");
    buttonWater.disabled = true;
  }
});

buttonFeed.addEventListener("click", function () {
  clearSleepInterval();
  if (feedCount < 3) {
    imgElf.src = "afbeeldingen/elf_bloemetje.png";
    updateFeedCount();
  } else {
    alert("I'm not hungry");
    buttonFeed.disabled = true;
  }
});

buttonSleep.addEventListener("click", function () {
  if (totalCount < 10) {
    imgElf.src = "afbeeldingen/sleepy_elf.png";
    startSleepInterval();
  } else {
    alert("I'm not tired anymore");
    buttonSleep.disabled = true;
  }
});

function updateFeedCount() {
  feedCount = feedCount + 1;
  updateTotalCount();
}

function updateWaterCount() {
  waterCount = waterCount + 1;
  updateTotalCount();
}

function updateSleepCount() {
  sleepCount = sleepCount + 1;
  updateTotalCount();
}

function updateTotalCount() {
  totalCount = feedCount + waterCount + sleepCount;
  xpscore.textContent = "Happiness: " + totalCount;
  if (totalCount > 1) {
    startCountInterval();
  }
  updateHappyMessage();
}

function updateTotalCountMinus() {
  if (totalCount > 0) {
    totalCount -= 1;
  }
  if (waterCount > 0) {
    waterCount -= 1;
  }
  if (feedCount > 0) {
    feedCount -= 1;
  }
  xpscore.textContent = "Happiness: " + totalCount;
  buttonFeed.disabled = false;
  buttonWater.disabled = false;
  buttonSleep.disabled = false;
  updateHappyMessage();
}

function clearCountInterval() {
  if (countInterval) {
    clearInterval(countInterval);
    countInterval = null;
  }
}

function startCountInterval() {
  if (countInterval) {
    //checkt of er geen lopende interval is
    clearInterval(countInterval);
  }

  countInterval = setInterval(function () {
    if (totalCount > 1) {
      updateTotalCountMinus();
    } else {
      clearCountInterval();
    }
  }, 15000);
}

function startSleepInterval() {
  if (sleepInterval) {
    clearInterval(sleepInterval);
  }
  sleepInterval = setInterval(function () {
    if (totalCount < 10) {
      updateSleepCount();
    } else {
      clearSleepInterval();
      alert("I'm not tired anymore");
      imgElf.src = "afbeeldingen/elf_happy.png";
      buttonSleep.disabled = true;
    }
  }, 5000);
}

function clearSleepInterval() {
  if (sleepInterval) {
    clearInterval(sleepInterval);
    sleepInterval = null;
  }
}

function updateHappyMessage() {
  if (totalCount >= 10) {
    happyMessage.classList.remove("hidden"); //https://developer.mozilla.org/en-US/docs/Web/API/Element/classList//
    buttonWater.disabled = true;
    buttonFeed.disabled = true;
    buttonSleep.disabled = true;
  } else {
    happyMessage.classList.add("hidden");
    buttonWater.disabled = false;
    buttonFeed.disabled = false;
    buttonSleep.disabled = false;
  }
}

function logCount() {
  console.log(feedCount, waterCount, sleepCount, totalCount);
}
setInterval(logCount, 500);
