const popup = document.getElementById('popup');
const openBtn = document.querySelector('.open-popup-btn');
const closeBtn = document.querySelector('.close-popup');
openBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
async function submitAdmission(event) {
  event.preventDefault();
  const name = document.getElementById("ad-name").value;
  const email = document.getElementById("ad-email").value;
  const phone = document.getElementById("ad-phone").value;
  const program = document.getElementById("ad-program").value;
  const admissionData = {
      name: name,
      email: email,
      phone: phone,
      program: program
  };
  try {
      const response = await fetch('/admission', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(admissionData)
      });
      if (response.ok) {
          const result = await response.json();
          alert(`Admission submitted successfully: ${result.message}`);
          document.getElementById("admission-form").reset(); 
      } else {
          throw new Error('Failed to submit admission');
      }
  } catch (error) {
      alert(error.message);
  }
}
function openPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
}
function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}
function togglePopup(hidePopupId, showPopupId) {
  closePopup(hidePopupId);
  openPopup(showPopupId);
}
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const response = await loginUser(username, password);
  if (response.success) {
      closePopup('loginPopup');
      localStorage.setItem('username', username);
      document.querySelector('button[onclick="openPopup(\'loginPopup\')"]').style.display = 'none';
      document.getElementById('profileButton').style.display = 'block';
      await fetchUserProfile();
      openPopup('profilePopup');
  } else {
      alert("Login failed: " + response.message);
  }
}
async function loginUser(username, password) {
  try {
      const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login.' };
  }
}
async function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const phone = document.getElementById("registerPhone").value;
  const program = document.getElementById("registerProgram").value;
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }
  const response = await registerUser(name, email, phone, program, username, password);
  if (response.success) {
      closePopup('registerPopup');
      openPopup('loginPopup'); 
  } else {
      alert("Registration failed: " + response.message);
  }
}
async function registerUser(name, email, phone, program, username, password) {
  try {
      const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, program, username, password })
      });

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'An error occurred during registration.' };
  }
}
async function fetchUserProfile() {
  const username = localStorage.getItem('username'); 
  if (!username) {
      alert("User is not logged in.");
      return;
  }
  try {
      const response = await fetch(`/api/user/profile?username=${username}`, {
          method: 'GET',
          credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
          document.getElementById('profileName').innerText = data.name;
          document.getElementById('profileEmail').innerText = data.email;
          document.getElementById('profilePhone').innerText = data.phone;
          document.getElementById('profileProgram').innerText = data.program;
      } else {
          alert("Error fetching profile: " + data.message);
      }
  } catch (error) {
      console.error("Error fetching profile:", error);
  }
}
const locomotive = () => {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
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
  const loaderText = document.querySelector(".loader h2");
  const waitText = document.querySelector(".wait h3");
  const tl = gsap.timeline();
  tl.from(waitText, {
    opacity: 0,
    duration: 1,
    delay: 0.2,
  });
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
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: .6,
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
      pin: true,
      scrub: 1,
    },
  });
};
const wiggleEffect =() => {
  Shery.imageEffect(".right-img img", {
    style: 6,
    // debug: true,
    config: {"noiseDetail":{"value":6.87,"range":[0,100]},"distortionAmount":{"value":3.05,"range":[0,10]},"scale":{"value":49.62,"range":[0,100]},"speed":{"value":0.5,"range":[0,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8333389902938148},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
  });
}
const gooeyEffect =() => {
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
}
locomotive();
loaderPlay();
customCursor();
textSplitting();
scroll();
wiggleEffect();
gooeyEffect();
