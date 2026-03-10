//<script async defer>
"use strict";
//check semiprimeness
function checkSemiprime(num) {
  let cnt = 0;

  for (let i = 2; cnt < 2 && i * i <= num; ++i)
    while (num % i == 0) {
      num /= i;
      ++cnt;
      if (cnt > 2) return false;
    }
  if (num > 1) ++cnt;
  return cnt == 2;
}
//feth PF
function primeFactors(n) {
  const factors = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}
// current number + elements
var current_number = 2;
var body = document.getElementById("body");
var number_element = document.getElementById("number");

//timeout vars
//var removeGreenTimeout = 0; unused
var removeRedtimeout = 0;
var removeStreaktimeout = 0;

//streak vars
var laststreaktime = 0;
var streakdelta = 0;
var streakn = 0;

// round + button toggles
var round = 0;
var forall = false;
var mystery = false;

// x is either true or false
function action(x) {
  if (x == checkSemiprime(current_number)) {
    //correct path
    round++;

    //add to log
    document.getElementById("infinitesimal").innerHTML +=
      `<span class="${x ? "greenlog" : "redlog"}">${current_number}<span class="PF" style="font-size: xx-small;">${x || forall ? "(" + primeFactors(current_number).join("•") + ")" : ""}</span></span> `;
    //round increment
    current_number +=
      Math.floor(
        Math.max(
          0,
          (Math.sqrt(streakn * 1.1 + 1) * round - 44) / 64 + Math.random(),
        ),
      ) + 1;

    number_element.innerHTML = `Round ${round} --> Is ${current_number} semiprime?`;

    //streak
    var now = Date.now();
    streakdelta = now - laststreaktime;
    if (streakdelta < 1200) {
      streakn++;
    } else {
      streakn = 0;
    }
    laststreaktime = now;
  } else {
    //incorrect path
    //resets
    streakn = 0;
    round = 0;
    current_number = 2;
    document.getElementById("infinitesimal").innerHTML = "Log: ";

    // red effect
    let body2 = document.getElementById("cover");
    if (!mystery) {
      body2.classList.remove("red");
      void body2.offsetWidth;
      body2.classList.add("red");
    } else {
      body2.classList.remove("redmystery");
      void body2.offsetWidth;
      body2.classList.add("redmystery");
    }
    body2.innerHTML = `<h1 style='font-size: 5vmin;' class='nograd'>${"WRONG ".repeat(25)}</h1>`;

    clearTimeout(removeRedtimeout);
    removeRedtimeout = setTimeout(function () {
      body2.classList.remove(mystery ? "redmystery" : "red");
      body2.innerHTML = "";
    }, 9990);

    number_element.innerHTML = `Round ${round} --> Is ${current_number} semiprime?`;
  }
  //streak animation
  var s = document.getElementById("streak");
  s.classList.remove("invisible");
  s.classList.remove("flyright");
  void s.offsetWidth;
  s.innerHTML = `${streakn}x`;
  s.classList.add("flyright");

  clearTimeout(removeStreaktimeout);
  removeStreaktimeout = setTimeout(() => {
    s.classList.remove("flyright");
    s.classList.add("invisible");
  }, 1200);
}
//  </script>
