//<script async defer>
      "use strict";
      function checkSemiprime(num) {
        let cnt = 0;

        for (let i = 2; cnt < 2 && i * i <= num; ++i)
          while (num % i == 0) {
            if (i > 5000) {
              return Math.random() > 0.5;
            }
            num /= i;
            ++cnt;
          }
        if (num > 1) ++cnt;
        return cnt == 2;
      }
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

      var current_number = 2;
      var body = document.getElementById("body");
      var number_element = document.getElementById("number");
      var removeGreenTimeout = 0;
      var removeRedtimeout = 0;
      var laststreaktime = 0;
      var streakdelta = 0;
      var streakn = 0;
      var round = 0;
      var forall = false;
      var _ = 0;
      function action(x) {
        if (x == checkSemiprime(current_number)) {
          round++;
          var now = Date.now();
          document.getElementById("infinitesimal").innerHTML +=
            `<span class="${x ? "greenlog" : "redlog"}">${current_number}<span style="font-size: xx-small;">${x || forall ? "(" + primeFactors(current_number).join("•") + ")" : ""}</span></span> `;
          current_number +=
            Math.floor(
              Math.max(
                0,
                (Math.sqrt(streakn * 1.1 + 1) * round - 44) / 64 +
                  Math.random(),
              ),
            ) + 1;
          body.classList.remove("green");
          void body.offsetWidth;
          body.classList.add("green");
          number_element.innerHTML = `Round ${round} --> Is ${current_number} semiprime?`;
          //clearTimeout(removeGreenTimeout);

          removeGreenTimeout = setTimeout(function () {
            body.classList.remove("green");
          }, 300);
          streakdelta = now - laststreaktime;
          if (streakdelta < 1200) {
            streakn++;
          } else {
            streakn = 0;
          }
          laststreaktime = now;
        } else {
          streakn = 0;
          round = 0;
          current_number = 2;
          document.getElementById("infinitesimal").innerHTML = "Log: ";
          let body2 = document.getElementById("body");
          body2.classList.remove("red");
          void body2.offsetWidth;
          body2.classList.add("red");
          clearTimeout(removeRedtimeout);
          removeRedtimeout = setTimeout(function () {
            body2.classList.remove("red");
          }, 900);
          number_element.innerHTML = `Round ${round} --> Is ${current_number} semiprime?`;
        }

        var s = document.getElementById("streak");
        s.classList.remove("invisible");
        s.classList.remove("flyright");
        void s.offsetWidth;
        s.innerHTML = `${streakn}x`;
        s.classList.add("flyright");

        clearTimeout(_);
        _ = setTimeout(() => {
          s.classList.remove("flyright");
          s.classList.add("invisible");
        }, 1200);
      }
  //  </script>