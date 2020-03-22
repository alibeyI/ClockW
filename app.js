let timerObj = {
  minutes: 0,
  seconds: 0,
  timerId: 0
}

function soundAlarm() {
  let amount = 3;
  let audio = new Audio("Twin-bell-alarm-clock.mp3");
  // audio.play();

  function playSound() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  for (let i = 0; i < amount; i++) {
    setTimeout(playSound, 1200 * i)
  }
}

function updateValue(key, value) {
  if (value < 0) {
    value = 0;
    console.log("Positive Numbers Only");

  }
  if (key == "seconds") {
    if (value < 10) {
      value = "0" + value;
    }
    if (value > 59) {
      value = 59;
    }
  }

  $("#" + key).html(value || 0);
  timerObj[key] = value;

  console.log("min " + timerObj.minutes)
  console.log("sec " + timerObj.seconds)
}

(function detectChanges(key) {

  let input = "#" + key + "-input";

  $(input).change(() => {
    updateValue(key, $(input).val());
  });

  $(input).change(() => {
    updateValue(key, $(input).val());
  });

  return arguments.callee;

})("minutes")("seconds");


function startTime() {
  buttonManager(["start", false], ["pause", true], ["stop", true])
  freezeInputs()

  timerObj.timerId = setInterval(()=>{
    timerObj.seconds--;
    if(timerObj.seconds<0){
      if(timerObj.minutes == 0){
        soundAlarm()
        return stopTime();
      }
      timerObj.seconds = 59;
      timerObj.minutes--;
    }
    updateValue("minutes", timerObj.minutes);
    updateValue("seconds", timerObj.seconds);
  },1000)
}

function stopTime() {
  clearInterval(timerObj.timerId);
  buttonManager(["start", true], ["pause", false], ["stop", false])
  unfreezeInputs()
  updateValue("minutes",$("#minutes-input").val())
  let seconds = $("#seconds-input").val();
  if(seconds < 10){seconds = "0"+seconds}
  updateValue("seconds", seconds)

}

function pauseTime() {
  buttonManager(["start", true], ["pause", false], ["stop", true]);
  clearInterval(timerObj.timerId);

  // freezeInputs()

}



function buttonManager(...buttonArray) {

  for (var i = 0; i < buttonArray.length; i++) {
    let button = "#" + buttonArray[i][0] + "-button";
    if (buttonArray[i][1]) {
      $(button).removeAttr("disabled");
    } else {
      $(button).attr("disabled", "disabled");

    }
  }


}

function freezeInputs() {
  $("#minutes-input").attr("disabled", "disabled");
  $("#seconds-input").attr("disabled", "disabled");
}


function unfreezeInputs() {
  $("#minutes-input").removeAttr("disabled");
  $("#seconds-input").removeAttr("disabled");
}

buttonManager()
