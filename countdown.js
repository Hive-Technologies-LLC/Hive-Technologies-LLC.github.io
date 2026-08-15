/*
  Project: KY Wedding Invite — Living Card
  File: countdown.js
  Version: 3.0.0
  Purpose: Updates live countdown to the wedding.
  Key Constraints: Uses the defined wedding date/time and
                   browser clock. Prevent duplicate timers.
*/

/* =========================================================
   COUNTDOWN
========================================================= */

const countdown = (() => {

  /* ---------------------------------------------------------
     TARGET DATE
     
     March 18, 2027 at 5:00 PM Eastern Time.
  --------------------------------------------------------- */

  const targetDate =
    new Date("2027-03-18T17:00:00-04:00");


  /* ---------------------------------------------------------
     UPDATE INTERVAL
  --------------------------------------------------------- */

  const UPDATE_INTERVAL = 1000;


  /* ---------------------------------------------------------
     DOM REFERENCES
  --------------------------------------------------------- */

  const daysValue =
    document.querySelector("#daysValue");

  const hoursValue =
    document.querySelector("#hoursValue");

  const minutesValue =
    document.querySelector("#minutesValue");

  const secondsValue =
    document.querySelector("#secondsValue");


  /* ---------------------------------------------------------
     STATE
  --------------------------------------------------------- */

  let intervalId = null;


  /* ---------------------------------------------------------
     FORMAT NUMBER
  --------------------------------------------------------- */

  function pad(value) {
    return String(value).padStart(2, "0");
  }


  /* ---------------------------------------------------------
     UPDATE COUNTDOWN
  --------------------------------------------------------- */

  function update() {

    const now = new Date();

    const distance = Math.max(
      0,
      targetDate.getTime() - now.getTime()
    );


    const days =
      Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (distance / (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (distance / (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (distance / 1000) % 60
      );


    /* -------------------------------------------------------
       UPDATE DISPLAY
    ------------------------------------------------------- */

    if (daysValue) {
      daysValue.textContent =
        String(days).padStart(3, "0");
    }

    if (hoursValue) {
      hoursValue.textContent =
        pad(hours);
    }

    if (minutesValue) {
      minutesValue.textContent =
        pad(minutes);
    }

    if (secondsValue) {
      secondsValue.textContent =
        pad(seconds);
    }

  }


  /* ---------------------------------------------------------
     START COUNTDOWN
     
     Calling start() more than once will not create
     multiple timers.
  --------------------------------------------------------- */

  function start() {

    update();

    if (intervalId !== null) {
      return;
    }

    intervalId = window.setInterval(
      update,
      UPDATE_INTERVAL
    );

  }


  /* ---------------------------------------------------------
     PUBLIC API
  --------------------------------------------------------- */

  return {
    start,
  };

})();