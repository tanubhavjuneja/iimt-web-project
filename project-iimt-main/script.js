const locomotive = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
const loaderPlay = () => {
  const translations = [
    { lang: "English", text: "Aim For Excellence" },
    { lang: "Hindi", text: "श्रेष्ठता का लक्ष्य" },
    { lang: "Bengali", text: "উৎকর্ষের লক্ষ্যে" },
    { lang: "Kannada", text: "ಮೇಲುಮಾಡಲು ಕಾಯಕ" },
    { lang: "Tamil", text: "மிகச்சிறந்ததை நோக்கி" },
    { lang: "Telugu", text: "ఉత్కృష୍ଠత లక్ష్యం" },
    { lang: "Marathi", text: "उत्कृष्टतेसाठी लक्ष्य" },
    { lang: "Gujarati", text: "ઉત્કૃષ્ટતા માટે ધ્યેય" },
    { lang: "Malayalam", text: "മികവിന്റെ ലക്ഷ്യം" },
    { lang: "Punjabi", text: "ਉਤਕ੍ਰਿਸ਼ਟਤਾ ਲਈ ਲਕਸ਼" },
    { lang: "Odia", text: "ଉତ୍କୃଷ୍ଟତା ପାଇଁ ଲକ୍ଷ୍ୟ" },
    { lang: "Assamese", text: "শ্ৰেষ্ঠত্বৰ লক্ষ্য" },
    { lang: "Urdu", text: "کمال کا مقصد" },
    { lang: "Sanskrit", text: "उत्कर्षाय लक्ष्य" },
  ];

  // Target the h2 and h3 elements correctly
  const loaderText = document.querySelector(".loader h2");
  const waitText = document.querySelector(".wait h3");

  // GSAP timeline to change the language
  const tl = gsap.timeline();

  // Show the .wait h3 only once at the start of the animation
  tl.from(waitText, {
    opacity: 0,
    duration: 1,
    delay: 0.2,
  });

  // Loop through translations and add them to the timeline in sequence
  translations.forEach((translation) => {
    tl.to(loaderText, {
      duration: 0.12,
      opacity: 0,
      onComplete: () => {
        loaderText.textContent = translation.text;
      },
    });
    tl.to(loaderText, {
      duration: 0.13,
      opacity: 1,
    });
  });

  // fade animation of loader text and please wait text
  tl.to([loaderText, waitText], {
    opacity: 0,
    duration: 0.4,
    delay: 0.5,
  });

  tl.to(".loader", {
    y: "-100%",
    duration: 1,
    ease: "power3.out",
    delay: 0.64,
  });
  tl.from(".iimt", {
    x: "-10%",
    duration: .2,
    opacity: 0,
  });
  tl.from(".showcase", {
    y: "15%",
    duration: .2,
    opacity: 0,
  });
};
function customCursor() {
  Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet(".navpart2 a, .navpart2 button", {});
};
function textSplitting() {
  var allH = document.querySelectorAll(".page2 h4, .page2 h1");
  allH.forEach(function (elem) {
    var clutter = "";
    var Htext = elem.textContent;
    var splittedText = Htext.split("");
    splittedText.forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
  });

  gsap.to(".page2 h4 span, .page2 h1 span", {
    color: "#fff",
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".page2 h4, .page2 h1",
      scroller: ".main",
      // markers: true,
      start: "50% 30%",
      end: "50% 70%",
      duration: .8,
      scrub: 2,
      ease: "power3",
    },
  });
};
const scroll = () => {
  gsap.to(".hscroll", {
    x: '-300%',
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top top",
      end: "+=300%",
      duration: .4,
      ease: "power1",
      // markers: true,
      pin: true,
      scrub: 1,
    },
  });
};
Shery.imageEffect(".right-img img", {
  style: 6,
  // debug: true,
  config: {"noiseDetail":{"value":6.87,"range":[0,100]},"distortionAmount":{"value":3.05,"range":[0,10]},"scale":{"value":49.62,"range":[0,100]},"speed":{"value":0.5,"range":[0,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8333389902938148},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
});

locomotive();
loaderPlay();
customCursor();
textSplitting();
scroll();

Shery.imageEffect(".image-div", {
  style: 6,
  // debug: true,
  config: {
    a: { value: 2, range: [0, 30] },
    b: { value: 0.75, range: [-1, 1] },
    zindex: { value: 9996999, range: [-9999999, 9999999] },
    aspect: { value: 0.7917349903853899 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
    shapeRadius: { value: 0, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: true },
    infiniteGooey: { value: false },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: true },
    maskVal: { value: 1.2, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: true },
    onMouse: { value: 0 },
    noise_speed: { value: 0.69, range: [0, 10] },
    metaball: { value: 0.56, range: [0, 2] },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0, range: [0, 0.1] },
    noise_height: { value: 0.3, range: [0, 2] },
    noise_scale: { value: 10, range: [0, 100] },
  },
  gooey: true,
});