/*
  Project: KY Wedding Invite — Living Card
  File: app.js
  Version: 3.0.0
  Purpose: Controls envelope → flower girl → petals → invite flow.
  Key Constraints: Keep flow simple, reliable, and mobile-friendly.
*/

/* =========================================================
   APP FLOW
========================================================= */

const appFlow = (() => {

  /* ---------------------------------------------------------
     DOM REFERENCES
  --------------------------------------------------------- */

  const openInviteButton =
    document.querySelector("#openInviteButton");

  const envelopeScreen =
    document.querySelector("#envelopeScreen");

  const flowerScreen =
    document.querySelector("#flowerScreen");

  const inviteScreen =
    document.querySelector("#inviteScreen");


  /* ---------------------------------------------------------
     FLOW TIMING
     
     These values control the sequence:
     
     1. Envelope opens
     2. Flower girl appears
     3. Petals burst
     4. Invitation appears
  --------------------------------------------------------- */

  const FLOW_TIMING = {
    flowerReveal: 1300,
    petalBurst: 2050,
    inviteReveal: 4300,
  };


  /* ---------------------------------------------------------
     STATE
  --------------------------------------------------------- */

  let flowStarted = false;


  /* ---------------------------------------------------------
     SCREEN CONTROL
  --------------------------------------------------------- */

  function showScreen(activeScreen) {

    [
      envelopeScreen,
      flowerScreen,
      inviteScreen
    ].forEach((screen) => {

      if (!screen) {
        return;
      }

      screen.classList.toggle(
        "is-active",
        screen === activeScreen
      );

    });
  }


  /* ---------------------------------------------------------
     COUNTDOWN
  --------------------------------------------------------- */

  function startCountdown() {

    if (
      typeof countdown !== "undefined" &&
      countdown &&
      typeof countdown.start === "function"
    ) {
      countdown.start();
    }

  }


  /* ---------------------------------------------------------
     PETAL BURST
  --------------------------------------------------------- */

  function triggerPetals() {

    if (
      typeof petalSystem !== "undefined" &&
      petalSystem &&
      typeof petalSystem.burst === "function"
    ) {
      petalSystem.burst(130);
    }

  }


  /* ---------------------------------------------------------
     OPEN ENVELOPE
  --------------------------------------------------------- */

  function openEnvelope() {

    if (flowStarted) {
      return;
    }

    flowStarted = true;

    sessionStorage.setItem(
      "kyInviteOpened",
      "true"
    );

    openInviteButton.classList.add("is-open");


    /* -----------------------------------------
       FLOWER GIRL
    ----------------------------------------- */

    window.setTimeout(() => {

      showScreen(flowerScreen);

    }, FLOW_TIMING.flowerReveal);


    /* -----------------------------------------
       PETALS
    ----------------------------------------- */

    window.setTimeout(() => {

      triggerPetals();

    }, FLOW_TIMING.petalBurst);


    /* -----------------------------------------
       MAIN INVITATION
    ----------------------------------------- */

    window.setTimeout(() => {

      showScreen(inviteScreen);

      startCountdown();

    }, FLOW_TIMING.inviteReveal);

  }


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
     INITIALIZATION
  --------------------------------------------------------- */

  function init() {

    if (
      !openInviteButton ||
      !envelopeScreen ||
      !flowerScreen ||
      !inviteScreen
    ) {
      return;
    }


    const hasOpenedInvite =
      sessionStorage.getItem("kyInviteOpened");


    /* -----------------------------------------
       RETURNING GUEST
       
       If the invitation has already been opened
       during this browser session, skip the intro.
    ----------------------------------------- */

    if (hasOpenedInvite === "true") {

      showScreen(inviteScreen);

      startCountdown();

      return;

    }


    /* -----------------------------------------
       REDUCED MOTION
       
       Skip the extended animation sequence for
       guests who have requested reduced motion.
    ----------------------------------------- */

    if (prefersReducedMotion()) {

      openInviteButton.addEventListener(
        "click",
        () => {

          flowStarted = true;

          sessionStorage.setItem(
            "kyInviteOpened",
            "true"
          );

          openInviteButton.classList.add("is-open");

          showScreen(inviteScreen);

          startCountdown();

        },
        { once: true }
      );

      return;

    }


    /* -----------------------------------------
       NORMAL FLOW
    ----------------------------------------- */

    openInviteButton.addEventListener(
      "click",
      openEnvelope,
      { once: true }
    );

  }


  /* ---------------------------------------------------------
     PUBLIC API
  --------------------------------------------------------- */

  return {
    init,
  };

})();


/* =========================================================
   START APPLICATION
========================================================= */

appFlow.init();