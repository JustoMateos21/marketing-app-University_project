const contactForm = document.querySelector("#contactForm");
const errorMessageText = document.querySelector("#errorMessage");
const navBar = document.querySelector("#navBar");

if (document.URL.match("contacto")) {
  const captchaForm = document.querySelector("#captchaForm");
  const captchaContainer = document.querySelector("#captchaContainer");
  const captchaImages = captchaForm.querySelectorAll("img");
  const captchaText = document.querySelector("#captchaText");
  const successMessage = document.querySelector("#successMessage");
}

const openTableBtn1 = document.querySelector("#openTableBtn1");
const openTableBtn2 = document.querySelector("#openTableBtn2");
const openTableBtn3 = document.querySelector("#openTableBtn3");

const closeTableBtn = document.querySelector("#closeTableBtn");
const pricesTable = document.querySelector("#pricesTable");

const detectScroll = () => {
  if (!document.body.offsetHeight > 1) {
    navBar.classList.toggle("nav_bg");
  }
  if (document.body.offsetHeight > 1) {
    navBar.classList.add("nav_bg");
  }
};

window.addEventListener("scroll", detectScroll);

const showCaptcha = () => {
  captchaContainer.classList.remove("hidden");
  captchaContainer.classList.add("show_captcha");
};

const hideCaptcha = () => {
  captchaContainer.classList.add("hidden");
  captchaContainer.classList.remove("show_captcha");
};

const createCaptchaText = (value) => {
  switch (value) {
    case 1:
      captchaText.textContent = "Seleccione las imagenes que contengan un auto";
      break;

    case 2:
      captchaText.textContent =
        "Seleccione las imagenes que contengan al menos un arbol";
      break;
    case 3:
      captchaText.textContent =
        "Seleccione las imagenes que contengan un hombre con sombrero";
      break;
    case 4:
      captchaText.textContent =
        "Seleccione las imagenes que contengan al menos 1 numero o letra";
      break;
    case 5:
      captchaText.textContent =
        "Seleccione las imagenes que contengan un avion";
      break;
    default:
      captchaText.textContent = "Seleccione las imagenes que contengan un auto";
  }
};

let randomNumber = 0;

const addCaptchaImages = (num) => {
  captchaImages[0].src = `./images/captcha/captcha${num}/captcha${num}_a.jpg`;
  captchaImages[1].src = `./images/captcha/captcha${num}/captcha${num}_b.jpg`;
  captchaImages[2].src = `./images/captcha/captcha${num}/captcha${num}_c.jpg`;
  captchaImages[3].src = `./images/captcha/captcha${num}/captcha${num}_d.jpg`;
};

const createRandomCaptcha = () => {
  randomNumber = Math.floor(Math.random() * 10);
  console.log(randomNumber);
  if (randomNumber >= 0 && randomNumber <= 2) {
    createCaptchaText(1);
    addCaptchaImages(1);
  }
  if (randomNumber >= 3 && randomNumber <= 4) {
    createCaptchaText(2);
    addCaptchaImages(2);
  }
  if (randomNumber >= 5 && randomNumber <= 6) {
    createCaptchaText(3);
    addCaptchaImages(3);
  }
  if (randomNumber >= 7 && randomNumber <= 8) {
    createCaptchaText(4);
    addCaptchaImages(4);
  }
  if (randomNumber >= 9 && randomNumber <= 10) {
    createCaptchaText(5);
    addCaptchaImages(5);
  }
};

const checkCaptcha = () => {
  if (
    !captchaForm[0].checked &&
    captchaForm[1].checked &&
    captchaForm[2].checked &&
    captchaForm[3].checked
  ) {
    return true;
  }
};

const isCaptchaValid = () => {
  if (captchaImages[0].src.match(1)) {
    if (checkCaptcha()) {
      return true;
    }
  } else if (captchaImages[0].src.match(2)) {
    if (checkCaptcha()) {
      return true;
    }
  } else if (captchaImages[0].src.match(3)) {
    if (checkCaptcha()) {
      return true;
    }
  }
};

const cleanForm = () => {
  contactForm[0].value = "";
  contactForm[1].value = "";
  contactForm[2].value = "";
};

let errorMessage = [];
const formValidation = (e) => {
  let errores = 0;
  e.preventDefault();
  if (!contactForm[0].value.length || contactForm[0].value.length < 3) {
    if (
      !errorMessage.includes(
        "Ingrese un nombre valido, entre 3 y 15 caracteres"
      )
    ) {
      errorMessage.push("Ingrese un nombre valido");
      errores++;
    }
  } else if (!contactForm[1].value.match("@")) {
    if (!errorMessage.includes("Su email debe contener arroba")) {
      errorMessage.push("Su email debe contener arroba");
      errores++;
    }
  }
  if (contactForm[2].value.length === 0) {
    if (!errorMessage.includes("Su mensaje no puede estar vacio")) {
      errorMessage.push("Su mensaje no puede estar vacio");
      errores++;
    }
  }

  errorMessageText.textContent = errorMessage;
  if (!errores) {
    createRandomCaptcha();
    showCaptcha();
    errorMessage = [];
    errorMessageText.textContent = "";
  }
};

const captchaValidation = (e) => {
  e.preventDefault();
  if (isCaptchaValid()) {
    hideCaptcha();
    successMessage.classList.remove("hidden");
    successMessage.classList.add("success__message");

    setTimeout(() => {
      successMessage.classList.add("hidden");
      successMessage.classList.remove("success__message");
    }, 3000);
    cleanForm();

    return;
  }
  for (let i = 0; i < 4; i++) {
    captchaForm[i].checked = false;
  }
  captchaText.textContent = "imagenes incorrectas";
  setTimeout(() => createRandomCaptcha(), 1000);
};

if (document.URL.match("contacto")) {
  contactForm.addEventListener("submit", formValidation);
  captchaForm.addEventListener("submit", captchaValidation);
}

const openCloseTable = () => {
  pricesTable.classList.toggle("hidden");
};

closeTableBtn.addEventListener("click", openCloseTable);
openTableBtn1.addEventListener("click", openCloseTable);
openTableBtn2.addEventListener("click", openCloseTable);
openTableBtn3.addEventListener("click", openCloseTable);
