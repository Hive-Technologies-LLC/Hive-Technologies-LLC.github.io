/*
  Project: KY Wedding Invite — Living Card
  File: petals.js
  Version: 3.0.0
  Purpose: Generates red and white petal transition.
  Key Constraints: Keep particle count mobile-friendly,
                   lightweight, and compatible with the
                   invitation flow.
*/

/* =========================================================
   PETAL SYSTEM
========================================================= */

const petalSystem = (() => {

  /* ---------------------------------------------------------
     DOM REFERENCE
  --------------------------------------------------------- */

  const petalLayer =
    document.querySelector("#petalLayer");


  /* ---------------------------------------------------------
     PETAL CONFIGURATION
  --------------------------------------------------------- */

  const petalColors = [
    "#b90e1a",
    "#ffffff",
    "#8f0d15",
    "#f8efe2",
  ];

  const DEFAULT_COUNT = 120;

  const CLEANUP_DELAY = 4700;


  /* ---------------------------------------------------------
     STATE
  --------------------------------------------------------- */

  let cleanupTimer = null;


  /* ---------------------------------------------------------
     REDUCED MOTION
  --------------------------------------------------------- */

  function prefersReducedMotion() {

    return window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

  }


  /* ---------------------------------------------------------
     CREATE PETAL
  --------------------------------------------------------- */

  function createPetal(index) {

    const petal =
      document.createElement("span");


    const size =
      12 + Math.floor(
        Math.random() * 24
      );

    const startX =
      Math.floor(
        Math.random() * 100
      );

    const endX =
      startX +
      Math.floor(
        Math.random() * 64
      ) -
      32;

    const duration =
      1750 +
      Math.floor(
        Math.random() * 1900
      );

    const spin =
      180 +
      Math.floor(
        Math.random() * 760
      );


    petal.className = "petal";


    petal.style.setProperty(
      "--size",
      `${size}px`
    );

    petal.style.setProperty(
      "--start-x",
      `${startX}vw`
    );

    petal.style.setProperty(
      "--end-x",
      `${endX}vw`
    );

    petal.style.setProperty(
      "--duration",
      `${duration}ms`
    );

    petal.style.setProperty(
      "--spin",
      `${spin}deg`
    );

    petal.style.setProperty(
      "--petal-color",
      petalColors[
        index % petalColors.length
      ]
    );

    petal.style.animationDelay =
      `${Math.floor(
        Math.random() * 700
      )}ms`;


    return petal;
  }


  /* ---------------------------------------------------------
     BURST
  --------------------------------------------------------- */

  function burst(
    count = DEFAULT_COUNT
  ) {

    if (!petalLayer) {
      return;
    }


    /* -----------------------------------------
       Respect reduced-motion preference.
    ----------------------------------------- */

    if (prefersReducedMotion()) {
      petalLayer.innerHTML = "";
      return;
    }


    /* -----------------------------------------
       Cancel previous cleanup timer.
    ----------------------------------------- */

    if (cleanupTimer !== null) {
      window.clearTimeout(
        cleanupTimer
      );

      cleanupTimer = null;
    }


    /* -----------------------------------------
       Clear previous petals.
    ----------------------------------------- */

    petalLayer.innerHTML = "";


    /* -----------------------------------------
       Generate new petals.
    ----------------------------------------- */

    for (
      let index = 0;
      index < count;
      index += 1
    ) {

      petalLayer.appendChild(
        createPetal(index)
      );

    }


    /* -----------------------------------------
       Clean up after animation.
    ----------------------------------------- */

    cleanupTimer =
      window.setTimeout(() => {

        petalLayer.innerHTML = "";

        cleanupTimer = null;

      }, CLEANUP_DELAY);

  }


  /* ---------------------------------------------------------
     PUBLIC API
  --------------------------------------------------------- */

  return {
    burst,
  };

})();
