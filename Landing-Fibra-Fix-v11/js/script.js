const painSlider = document.getElementById("painSlider");

const painTrack = document.getElementById("painTrack");

const painCards = document.querySelectorAll(".pain-card");

const painPrev = document.getElementById("painPrev");

const painNext = document.getElementById("painNext");

const painDotsContainer = document.getElementById("painDots");

let painIndex = 0;

let painInterval = null;

let touchStartX = 0;

const mqTablet = window.matchMedia("(max-width: 1024px)");

const mqMobile = window.matchMedia("(max-width: 768px)");

const isPainSliderMode = () => mqTablet.matches;

function updatePainDots() {

  if (!painDotsContainer) return;

  const dots = painDotsContainer.querySelectorAll(".pain-dot");

  dots.forEach((dot, index) => {

    dot.classList.toggle("active", index === painIndex);

  });

}

function updatePainSlider() {

  if (!painTrack) return;

  if (!isPainSliderMode()) {

    painTrack.style.transform = "translateX(0)";

    return;

  }

  painTrack.style.transform = `translateX(-${painIndex * 100}%)`;

  updatePainDots();

}

function nextPainSlide() {

  if (!isPainSliderMode() || painCards.length === 0) return;

  painIndex = (painIndex + 1) % painCards.length;

  updatePainSlider();

}

function prevPainSlide() {

  if (!isPainSliderMode() || painCards.length === 0) return;

  painIndex = (painIndex - 1 + painCards.length) % painCards.length;

  updatePainSlider();

}

function stopPainAutoplay() {

  if (painInterval !== null) {

    clearInterval(painInterval);

    painInterval = null;

  }

}

function startPainAutoplay() {

  stopPainAutoplay();

  if (isPainSliderMode() && painCards.length > 1) {

    painInterval = setInterval(nextPainSlide, 4000);

  }

}

if (painSlider && painTrack && painDotsContainer && painPrev && painNext) {

  painCards.forEach((card, index) => {

    const dot = document.createElement("button");

    dot.className = "pain-dot";

    dot.type = "button";

    dot.setAttribute("aria-label", `Mostrar tarjeta ${index + 1}`);

    if (index === 0) {

      dot.classList.add("active");

    }

    dot.addEventListener("click", () => {

      painIndex = index;

      updatePainSlider();

      startPainAutoplay();

    });

    painDotsContainer.appendChild(dot);

  });

  painNext.addEventListener("click", () => {

    nextPainSlide();

    startPainAutoplay();

  });

  painPrev.addEventListener("click", () => {

    prevPainSlide();

    startPainAutoplay();

  });

  painSlider.addEventListener("mouseenter", stopPainAutoplay);

  painSlider.addEventListener("mouseleave", startPainAutoplay);

  painSlider.addEventListener(

    "touchstart",

    (event) => {

      touchStartX = event.changedTouches[0].clientX;

      stopPainAutoplay();

    },

    { passive: true },

  );

  painSlider.addEventListener(

    "touchend",

    (event) => {

      const touchEndX = event.changedTouches[0].clientX;

      const distance = touchStartX - touchEndX;

      if (Math.abs(distance) > 50) {

        distance > 0 ? nextPainSlide() : prevPainSlide();

      }

      startPainAutoplay();

    },

    { passive: true },

  );

  let painResizeFrame = 0;

  window.addEventListener(

    "resize",

    () => {

      cancelAnimationFrame(painResizeFrame);

      painResizeFrame = requestAnimationFrame(() => {

        painIndex = 0;

        updatePainSlider();

        startPainAutoplay();

      });

    },

    { passive: true },

  );

  updatePainSlider();

  startPainAutoplay();

}

const ingredientsSlider = document.getElementById("ingredientsSlider");

const ingredientsTrack = document.getElementById("ingredientsTrack");

const ingredientCards = document.querySelectorAll(".ingredient-card");

const ingredientsPrev = document.getElementById("ingredientsPrev");

const ingredientsNext = document.getElementById("ingredientsNext");

const ingredientsDotsContainer = document.getElementById("ingredientsDots");

let ingredientsIndex = 0;

let ingredientsInterval = null;

let ingredientsTouchStartX = 0;

function getIngredientsVisibleCards() {

  if (mqMobile.matches) return 1;

  if (mqTablet.matches) return 2;

  return 5;

}

function getIngredientsMaxIndex() {

  return Math.max(0, ingredientCards.length - getIngredientsVisibleCards());

}

function getIngredientOffset(index) {

  if (mqMobile.matches) {

    return `calc(-${index * 100}% - ${index * 0}px)`;

  }

  if (mqTablet.matches) {

    return `calc(-${index * 50}% - ${index * 8}px)`;

  }

  return `calc(-${index * 20}% - ${index * 3.6}px)`;

}

function updateIngredientsDots() {

  if (!ingredientsDotsContainer) return;

  const dots = ingredientsDotsContainer.querySelectorAll(".ingredients-dot");

  dots.forEach((dot, index) => {

    dot.classList.toggle("active", index === ingredientsIndex);

  });

}

function createIngredientsDots() {

  if (!ingredientsDotsContainer) return;

  ingredientsDotsContainer.innerHTML = "";

  const maxIndex = getIngredientsMaxIndex();

  for (let index = 0; index <= maxIndex; index++) {

    const dot = document.createElement("button");

    dot.className = "ingredients-dot";

    dot.type = "button";

    dot.setAttribute(

      "aria-label",

      `Mostrar ingredientes desde la posición ${index + 1}`,

    );

    if (index === ingredientsIndex) {

      dot.classList.add("active");

    }

    dot.addEventListener("click", () => {

      ingredientsIndex = index;

      updateIngredientsSlider();

      startIngredientsAutoplay();

    });

    ingredientsDotsContainer.appendChild(dot);

  }

}

function updateIngredientsSlider() {

  if (!ingredientsTrack || ingredientCards.length === 0) return;

  const maxIndex = getIngredientsMaxIndex();

  if (ingredientsIndex > maxIndex) {

    ingredientsIndex = maxIndex;

  }

  const offset = getIngredientOffset(ingredientsIndex);

  ingredientsTrack.style.transform = `translateX(${offset})`;

  updateIngredientsDots();

}

function nextIngredientsSlide() {

  const maxIndex = getIngredientsMaxIndex();

  ingredientsIndex = ingredientsIndex >= maxIndex ? 0 : ingredientsIndex + 1;

  updateIngredientsSlider();

}

function prevIngredientsSlide() {

  const maxIndex = getIngredientsMaxIndex();

  ingredientsIndex = ingredientsIndex <= 0 ? maxIndex : ingredientsIndex - 1;

  updateIngredientsSlider();

}

function stopIngredientsAutoplay() {

  if (ingredientsInterval !== null) {

    clearInterval(ingredientsInterval);

    ingredientsInterval = null;

  }

}

function startIngredientsAutoplay() {

  stopIngredientsAutoplay();

  if (ingredientCards.length > getIngredientsVisibleCards()) {

    ingredientsInterval = setInterval(nextIngredientsSlide, 4000);

  }

}

if (

  ingredientsSlider &&

  ingredientsTrack &&

  ingredientsDotsContainer &&

  ingredientsPrev &&

  ingredientsNext &&

  ingredientCards.length > 0

) {

  createIngredientsDots();

  ingredientsNext.addEventListener("click", () => {

    nextIngredientsSlide();

    startIngredientsAutoplay();

  });

  ingredientsPrev.addEventListener("click", () => {

    prevIngredientsSlide();

    startIngredientsAutoplay();

  });

  ingredientsSlider.addEventListener("mouseenter", stopIngredientsAutoplay);

  ingredientsSlider.addEventListener("mouseleave", startIngredientsAutoplay);

  ingredientsSlider.addEventListener(

    "touchstart",

    (event) => {

      ingredientsTouchStartX = event.changedTouches[0].clientX;

      stopIngredientsAutoplay();

    },

    { passive: true },

  );

  ingredientsSlider.addEventListener(

    "touchend",

    (event) => {

      const ingredientsTouchEndX = event.changedTouches[0].clientX;

      const distance = ingredientsTouchStartX - ingredientsTouchEndX;

      if (Math.abs(distance) > 50) {

        distance > 0 ? nextIngredientsSlide() : prevIngredientsSlide();

      }

      startIngredientsAutoplay();

    },

    { passive: true },

  );

  let ingredientsResizeFrame = 0;

  window.addEventListener(

    "resize",

    () => {

      cancelAnimationFrame(ingredientsResizeFrame);

      ingredientsResizeFrame = requestAnimationFrame(() => {

        ingredientsIndex = 0;

        createIngredientsDots();

        updateIngredientsSlider();

        startIngredientsAutoplay();

      });

    },

    { passive: true },

  );

  updateIngredientsSlider();

  startIngredientsAutoplay();

}

const testimonialsSlider = document.getElementById("testimonialsSlider");

const testimonialsTrack = document.getElementById("testimonialsTrack");

const testimonialCards = document.querySelectorAll(".testimonial-card");

const testimonialsPrev = document.getElementById("testimonialsPrev");

const testimonialsNext = document.getElementById("testimonialsNext");

const testimonialsDotsContainer = document.getElementById("testimonialsDots");

const testimonialVideo = document.getElementById("testimonialVideo");

let testimonialsIndex = 0;

let testimonialsInterval = null;

let testimonialsTouchStartX = 0;

function getTestimonialsVisibleCards() {

  if (mqMobile.matches) {

    return 1;

  }

  if (mqTablet.matches) {

    return 2;

  }

  return 4;

}

function getTestimonialsMaxIndex() {

  return Math.max(0, testimonialCards.length - getTestimonialsVisibleCards());

}

function getTestimonialOffset(index) {

  if (mqMobile.matches) {

    return `calc(-${index * 100}% - ${index * 16}px)`;

  }

  if (mqTablet.matches) {

    return `calc(-${index * 50}% - ${index * 12}px)`;

  }

  return `calc(-${index * 25}% - ${index * 6}px)`;

}

function createTestimonialsDots() {

  if (!testimonialsDotsContainer) {

    return;

  }

  testimonialsDotsContainer.innerHTML = "";

  const maxIndex = getTestimonialsMaxIndex();

  for (let index = 0; index <= maxIndex; index++) {

    const dot = document.createElement("button");

    dot.className = "testimonials-dot";

    dot.type = "button";

    dot.setAttribute("aria-label", `Mostrar testimonio ${index + 1}`);

    if (index === testimonialsIndex) {

      dot.classList.add("active");

    }

    dot.addEventListener("click", () => {

      if (

        testimonialVideo &&

        !testimonialVideo.paused &&

        !testimonialVideo.ended

      ) {

        return;

      }

      testimonialsIndex = index;

      updateTestimonialsSlider();

      startTestimonialsAutoplay();

    });

    testimonialsDotsContainer.appendChild(dot);

  }

}

function updateTestimonialsDots() {

  if (!testimonialsDotsContainer) {

    return;

  }

  const dots = testimonialsDotsContainer.querySelectorAll(".testimonials-dot");

  dots.forEach((dot, index) => {

    dot.classList.toggle("active", index === testimonialsIndex);

  });

}

function updateTestimonialsSlider() {

  if (!testimonialsTrack || testimonialCards.length === 0) {

    return;

  }

  const maxIndex = getTestimonialsMaxIndex();

  if (testimonialsIndex > maxIndex) {

    testimonialsIndex = maxIndex;

  }

  const offset = getTestimonialOffset(testimonialsIndex);

  testimonialsTrack.style.transform = `translateX(${offset})`;

  updateTestimonialsDots();

}

function nextTestimonialsSlide() {

  if (testimonialVideo && !testimonialVideo.paused && !testimonialVideo.ended) {

    return;

  }

  const maxIndex = getTestimonialsMaxIndex();

  testimonialsIndex = testimonialsIndex >= maxIndex ? 0 : testimonialsIndex + 1;

  updateTestimonialsSlider();

}

function prevTestimonialsSlide() {

  if (testimonialVideo && !testimonialVideo.paused && !testimonialVideo.ended) {

    return;

  }

  const maxIndex = getTestimonialsMaxIndex();

  testimonialsIndex = testimonialsIndex <= 0 ? maxIndex : testimonialsIndex - 1;

  updateTestimonialsSlider();

}

function stopTestimonialsAutoplay() {

  if (testimonialsInterval !== null) {

    clearInterval(testimonialsInterval);

    testimonialsInterval = null;

  }

}

function startTestimonialsAutoplay() {

  stopTestimonialsAutoplay();

  if (testimonialVideo && !testimonialVideo.paused && !testimonialVideo.ended) {

    return;

  }

  if (testimonialCards.length > getTestimonialsVisibleCards()) {

    testimonialsInterval = setInterval(nextTestimonialsSlide, 4500);

  }

}

if (

  testimonialsSlider &&

  testimonialsTrack &&

  testimonialsPrev &&

  testimonialsNext &&

  testimonialsDotsContainer &&

  testimonialCards.length > 0

) {

  createTestimonialsDots();

  testimonialsNext.addEventListener("click", () => {

    if (

      testimonialVideo &&

      !testimonialVideo.paused &&

      !testimonialVideo.ended

    ) {

      return;

    }

    nextTestimonialsSlide();

    startTestimonialsAutoplay();

  });

  testimonialsPrev.addEventListener("click", () => {

    if (

      testimonialVideo &&

      !testimonialVideo.paused &&

      !testimonialVideo.ended

    ) {

      return;

    }

    prevTestimonialsSlide();

    startTestimonialsAutoplay();

  });

  testimonialsSlider.addEventListener("mouseenter", () => {

    stopTestimonialsAutoplay();

  });

  testimonialsSlider.addEventListener("mouseleave", () => {

    if (

      testimonialVideo &&

      !testimonialVideo.paused &&

      !testimonialVideo.ended

    ) {

      return;

    }

    startTestimonialsAutoplay();

  });

  testimonialsSlider.addEventListener(

    "touchstart",

    (event) => {

      testimonialsTouchStartX = event.changedTouches[0].clientX;

      stopTestimonialsAutoplay();

    },

    {

      passive: true,

    },

  );

  testimonialsSlider.addEventListener(

    "touchend",

    (event) => {

      if (

        testimonialVideo &&

        !testimonialVideo.paused &&

        !testimonialVideo.ended

      ) {

        return;

      }

      const touchEndX = event.changedTouches[0].clientX;

      const distance = testimonialsTouchStartX - touchEndX;

      if (Math.abs(distance) > 50) {

        distance > 0 ? nextTestimonialsSlide() : prevTestimonialsSlide();

      }

      startTestimonialsAutoplay();

    },

    {

      passive: true,

    },

  );

  let testimonialsResizeFrame = 0;

  window.addEventListener(

    "resize",

    () => {

      cancelAnimationFrame(testimonialsResizeFrame);

      testimonialsResizeFrame = requestAnimationFrame(() => {

        testimonialsIndex = 0;

        createTestimonialsDots();

        updateTestimonialsSlider();

        if (

          !testimonialVideo ||

          testimonialVideo.paused ||

          testimonialVideo.ended

        ) {

          startTestimonialsAutoplay();

        }

      });

    },

    { passive: true },

  );

  updateTestimonialsSlider();

  startTestimonialsAutoplay();

}

if (testimonialVideo) {

  testimonialVideo.addEventListener("play", () => {

    stopTestimonialsAutoplay();

  });

  testimonialVideo.addEventListener("ended", () => {

    testimonialVideo.currentTime = 0;

    testimonialVideo.pause();

    startTestimonialsAutoplay();

  });

}

const offerButtons = document.querySelectorAll(".select-offer");

const checkoutForm = document.getElementById("checkoutForm");

const selectedOfferInput = document.getElementById("selectedOffer");

const selectedPriceInput = document.getElementById("selectedPrice");

const checkoutNoOffer = document.getElementById("checkoutNoOffer");

const checkoutOfferContent = document.getElementById("checkoutOfferContent");

const checkoutOfferImage = document.getElementById("checkoutOfferImage");

const checkoutOfferName = document.getElementById("checkoutOfferName");

const checkoutOfferList = document.getElementById("checkoutOfferList");

const checkoutPopular = document.getElementById("checkoutPopular");

const checkoutTotal = document.getElementById("checkoutTotal");

const checkoutSubmit = document.getElementById("checkoutSubmit");

const checkoutWarning = document.getElementById("checkoutWarning");

// ✅ Google Sheets (mismo script de pedidos que usaba el archivo con pixel)
const SHEETS_PEDIDOS_URL =
  "https://script.google.com/macros/s/AKfycbzfG8i5p9sMmkpGBiOJ40VswP4TDk5CqWK2lv7ZFClJMop3fLIWHo4llj5ZenTIwaDB/exec";
const TIENDA = "Tienda 2"; // ← Cambia esto en cada dominio
let _formSubmitting = false;

// ✅ Envío confiable a Google Sheets: reintentos + cola guardada en el navegador
const PENDING_KEY = "pedidosPendientesSheets";

function getPendingOrders() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function setPendingOrders(list) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(list));
  } catch (e) {}
}

async function postToSheets(payload) {
  // no-cors: solo falla si de verdad no hay conexión; Google igual recibe el pedido
  await fetch(SHEETS_PEDIDOS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
}

async function sendOrderToSheets(payload) {
  // 1) Guardar primero, para que no se pierda si cierran la página
  setPendingOrders([...getPendingOrders(), payload]);

  // 2) Intentar enviar hasta 3 veces
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await postToSheets(payload);
      setPendingOrders(
        getPendingOrders().filter((p) => p.id_evento !== payload.id_evento),
      );
      return true;
    } catch (err) {
      console.error("Sheets intento " + attempt + " falló:", err);
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
      }
    }
  }
  return false; // queda en la cola y se reintenta después
}

async function flushPendingOrders() {
  const pending = getPendingOrders();
  for (const payload of pending) {
    try {
      await postToSheets(payload);
      setPendingOrders(
        getPendingOrders().filter((p) => p.id_evento !== payload.id_evento),
      );
    } catch (err) {
      return; // sigue sin conexión, se intenta más tarde
    }
  }
}

window.addEventListener("online", flushPendingOrders);
window.addEventListener("load", () => setTimeout(flushPendingOrders, 3000));

const offersData = {

  iniciacion: {

    name: "INICIACIÓN",

    price: 79900,

    formattedPrice: "$79.900",

    image: "images/oferta1.webp",

    popular: false,

    items: [

      "1 Tarro de Fibra Fix (600 g)",

      "Acceso plataforma acompañamiento Método Fibra Fix 21 Días (Acompañamiento, retos, menús, despensa inteligente y más)",

      "Acceso a bono de $10.000 para próximas compras de 1 unidad (Completando método 21 días)",

      "Acceso a 1 Fibra Fix gratis para próximas compras de 2 o más unidades (Completando método 21 días)",

      "Acceso a Club de Fibra Fix Referidos (Bonos por referidos)",

      "Envío gratis",

      "Pago contra entrega",

    ],

  },

  avanzado: {

    name: "AVANZADO",

    price: 114900,

    formattedPrice: "$114.900",

    image: "images/oferta2.webp",

    popular: true,

    items: [

      "2 Tarros de Fibra Fix (600 g c/u)",

      "2 parches Kinoki relajantes (Obsequio)",

      "Acceso plataforma Método Fibra Fix 21 Días (Acompañamiento, retos, menús, despensa inteligente y más)",

      "Acceso a bono de $10.000 para próximas compras de 1 unidad (Completando método 21 días)",

      "Acceso a 1 Fibra Fix gratis para próximas compras de 2 o más unidades (Completando método 21 días)",

      "Acceso a Club de Fibra Fix Referidos (Bonos por referidos)",

      "Envío gratis",

      "Pago contra entrega",

    ],

  },

  completo: {

    name: "TRATAMIENTO COMPLETO",

    price: 143900,

    formattedPrice: "$143.900",

    image: "images/oferta3.webp",

    popular: false,

    items: [

      "3 Tarros de Fibra Fix (600 g c/u)",

      "2 parches Kinoki relajantes (Obsequio)",

      "Acceso plataforma Método Fibra Fix 21 Días (Acompañamiento, retos, menús, despensa inteligente y más)",

      "Acceso a bono de $10.000 para próximas compras de 1 unidad (Completando método 21 días)",

      "Acceso a 1 Fibra Fix gratis para próximas compras de 2 o más unidades (Completando método 21 días)",

      "Acceso a Club de Fibra Fix Referidos (Bonos por referidos)",

      "Envío gratis",

      "Pago contra entrega",

    ],

  },

};

let currentOffer = null;

function selectCheckoutOffer(offerKey) {

  const offer = offersData[offerKey];

  if (!offer) {

    return;

  }

  currentOffer = offerKey;

  selectedOfferInput.value = offer.name;

  selectedPriceInput.value = offer.price;

  checkoutNoOffer.classList.add("is-hidden");

  checkoutOfferContent.hidden = false;

  checkoutOfferImage.src = offer.image;

  checkoutOfferImage.alt = `Oferta ${offer.name} Fibra Fix`;

  checkoutOfferName.textContent = offer.name;

  checkoutPopular.hidden = !offer.popular;

  checkoutOfferList.innerHTML = "";

  offer.items.forEach((item) => {

    const li = document.createElement("li");

    li.textContent = item;

    checkoutOfferList.appendChild(li);

  });

  checkoutTotal.textContent = offer.formattedPrice;

  checkoutWarning.classList.remove("show");

  validateCheckout();

}

offerButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.preventDefault();

    const offerKey = button.dataset.offer;

    selectCheckoutOffer(offerKey);

    const checkoutSection = document.getElementById("pedido");

    if (checkoutSection) {

      checkoutSection.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }

  });

});

function isValidPhone(value) {

  const cleanPhone = value.replace(/\D/g, "");

  return cleanPhone.length >= 7 && cleanPhone.length <= 15;

}

function validateCheckout() {

  if (!checkoutForm || !checkoutSubmit) {

    return false;

  }

  const name = document.getElementById("checkoutName").value.trim();

  const whatsapp = document.getElementById("checkoutWhatsapp").value.trim();

  const department = document.getElementById("checkoutDepartment").value.trim();

  const city = document.getElementById("checkoutCity").value.trim();

  const address = document.getElementById("checkoutAddress").value.trim();

  const isValid =

    currentOffer !== null &&

    name.length >= 3 &&

    isValidPhone(whatsapp) &&

    department !== "" &&

    city.length >= 2 &&

    address.length >= 8;

  checkoutSubmit.disabled = !isValid;

  return isValid;

}

if (checkoutForm) {

  const checkoutInputs = checkoutForm.querySelectorAll(

    "input[required], select[required]",

  );

  checkoutInputs.forEach((field) => {

    field.addEventListener("input", validateCheckout);

    field.addEventListener("change", validateCheckout);

    field.addEventListener("blur", () => {

      validateSingleField(field);

    });

  });

}

function validateSingleField(field) {

  const fieldContainer = field.closest(".checkout-field");

  if (!fieldContainer) {

    return;

  }

  let valid = field.checkValidity();

  if (field.id === "checkoutWhatsapp") {

    valid = isValidPhone(field.value);

  }

  if (valid) {

    fieldContainer.classList.remove("invalid");

  } else {

    fieldContainer.classList.add("invalid");

  }

}

const whatsappInput = document.getElementById("checkoutWhatsapp");

if (whatsappInput) {

  whatsappInput.addEventListener("input", () => {

    whatsappInput.value = whatsappInput.value.replace(/[^\d+\s]/g, "");

  });

}

if (checkoutForm) {

  checkoutForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!currentOffer) {

      checkoutWarning.classList.add("show");

      return;

    }

    if (!validateCheckout()) {

      const fields = checkoutForm.querySelectorAll(

        "input[required], select[required]",

      );

      fields.forEach((field) => {

        validateSingleField(field);

      });

      return;

    }

    const orderData = {

      oferta: currentOffer,

      nombre: document.getElementById("checkoutName").value.trim(),

      whatsapp: document.getElementById("checkoutWhatsapp").value.trim(),

      departamento: document.getElementById("checkoutDepartment").value,

      ciudad: document.getElementById("checkoutCity").value.trim(),

      direccion: document.getElementById("checkoutAddress").value.trim(),

      total: offersData[currentOffer].price,

    };

    if (_formSubmitting) return;
    _formSubmitting = true;

    const ID_PEDIDO = "cod_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const fbp = document.cookie.match(/_fbp=([^;]+)/)?.[1] || "";
    const fbc = document.cookie.match(/_fbc=([^;]+)/)?.[1] || "";
    const qtyMap = { iniciacion: 1, avanzado: 2, completo: 3 };
    const numItems = qtyMap[orderData.oferta] || 1;
    const packName =
      numItems +
      (numItems === 1 ? " Tarro" : " Tarros") +
      " - " +
      offersData[orderData.oferta].formattedPrice;

    // Enviar pedido a Google Sheets (con reintentos y cola de respaldo)
    await sendOrderToSheets({
      name: orderData.nombre,
      phone: orderData.whatsapp,
      department: orderData.departamento,
      city: orderData.ciudad,
      address: orderData.direccion,
      deliveryType: "Contra entrega",
      package: packName,
      id_evento: ID_PEDIDO,
      fbp,
      fbc,
      estado: "Divine",
      tienda: TIENDA,
    });

    // ✅ Meta Pixel - Purchase
    if (typeof fbq !== "undefined") {
      fbq(
        "track",
        "Purchase",
        {
          value: orderData.total,
          currency: "COP",
          content_name: packName,
          content_ids: [orderData.oferta],
          contents: [{ id: orderData.oferta, quantity: numItems }],
          content_type: "product",
          num_items: numItems,
        },
        {
          eventID: ID_PEDIDO,
          ph: "57" + orderData.whatsapp.replace(/\D/g, ""),
        },
      );
    }

    showOrderConfirmation(orderData);
    _formSubmitting = false;

  });

}

function showOrderConfirmation(orderData) {

  const orderConfirmation = document.getElementById("orderConfirmation");

  const confirmationOfferImage = document.getElementById(

    "confirmationOfferImage",

  );

  const confirmationOfferName = document.getElementById(

    "confirmationOfferName",

  );

  const confirmationOfferList = document.getElementById(

    "confirmationOfferList",

  );

  const confirmationPopular = document.getElementById("confirmationPopular");

  const confirmationName = document.getElementById("confirmationName");

  const confirmationWhatsapp = document.getElementById("confirmationWhatsapp");

  const confirmationLocation = document.getElementById("confirmationLocation");

  const confirmationAddress = document.getElementById("confirmationAddress");

  const confirmationTotal = document.getElementById("confirmationTotal");

  if (!orderConfirmation) {

    console.error("No existe la sección #orderConfirmation");

    return;

  }

  if (!currentOffer) {

    console.error("No hay oferta seleccionada");

    return;

  }

  const offer = offersData[currentOffer];

  if (!offer) {

    console.error("La oferta seleccionada no existe");

    return;

  }

  if (confirmationOfferImage) {

    confirmationOfferImage.src = offer.image;

    confirmationOfferImage.alt = `Oferta ${offer.name} Fibra Fix`;

  }

  if (confirmationOfferName) {

    confirmationOfferName.textContent = offer.name;

  }

  if (confirmationPopular) {

    confirmationPopular.hidden = !offer.popular;

  }

  if (confirmationOfferList) {

    confirmationOfferList.innerHTML = "";

    offer.items.forEach((item) => {

      if (item === "Envío gratis" || item === "Pago contra entrega") {

        return;

      }

      const li = document.createElement("li");

      li.textContent = item;

      confirmationOfferList.appendChild(li);

    });

  }

  if (confirmationName) {

    confirmationName.textContent = orderData.nombre;

  }

  if (confirmationWhatsapp) {

    confirmationWhatsapp.textContent = orderData.whatsapp;

  }

  if (confirmationLocation) {

    confirmationLocation.textContent = `${orderData.ciudad}, ${orderData.departamento}`;

  }

  if (confirmationAddress) {

    confirmationAddress.textContent = orderData.direccion;

  }

  if (confirmationTotal) {

    confirmationTotal.textContent = offer.formattedPrice;

  }

  const checkoutSection = document.getElementById("pedido");

  if (checkoutSection) {

    checkoutSection.style.display = "none";

  }

  orderConfirmation.hidden = false;

  orderConfirmation.style.display = "block";

  setTimeout(() => {

    orderConfirmation.scrollIntoView({

      behavior: "smooth",

      block: "start",

    });

  }, 100);

}

validateCheckout();

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const button = item.querySelector(".faq-question");

  const icon = item.querySelector(".faq-icon");

  button.addEventListener("click", () => {

    const isActive = item.classList.contains("active");

    faqItems.forEach((faqItem) => {

      faqItem.classList.remove("active");

      const faqIcon = faqItem.querySelector(".faq-icon");

      if (faqIcon) {

        faqIcon.textContent = "+";

      }

    });

    if (!isActive) {

      item.classList.add("active");

      icon.textContent = "−";

    }

  });

});

const purchaseNotification = document.getElementById("purchaseNotification");

const purchaseNotificationName = document.getElementById(

  "purchaseNotificationName",

);

const purchaseNotificationCity = document.getElementById(

  "purchaseNotificationCity",

);

const purchaseNotificationOrder = document.getElementById(

  "purchaseNotificationOrder",

);

const purchaseNotificationTime = document.getElementById(

  "purchaseNotificationTime",

);

const purchaseNotificationStatus = document.getElementById(

  "purchaseNotificationStatus",

);

const purchaseNotificationClose = document.getElementById(

  "purchaseNotificationClose",

);

// ✅ Popups de compras dinámicos: nombres y ciudades desde Google Sheets
const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxJ87He_84WfhRV-Xnvi4Fw5F_0Y4m3fqE7DhHZOQ5UZL5dKsGq7Awe67Fcj_4dS_W_wA/exec";

let firstNamesList = [];
let citiesList = [];
let purchaseShowTimer = null;
let purchaseHideTimer = null;
let purchaseNotificationsStopped = false;

async function loadPopupData() {
  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, { method: "GET" });
    const data = await res.json();
    firstNamesList = data.names || [];
    citiesList = data.cities || [];
  } catch (e) {
    firstNamesList = ["Camila", "Santiago", "Valentina", "Mateo", "Lucía", "Alejandro", "Daniela", "Sebastián", "Mariana", "Felipe"];
    citiesList = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "Cartagena", "Cúcuta", "Pereira", "Manizales", "Ibagué"];
  }
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getBogotaHour() {
  return parseInt(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", hour: "numeric", hour12: false }).format(new Date()),
    10,
  );
}

function isPopupSilentHour() {
  const hour = getBogotaHour();
  return hour >= 22 || hour < 7;
}

function msUntilNextActiveWindow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota", hour: "numeric", minute: "numeric", second: "numeric", hour12: false,
  }).formatToParts(new Date());
  const get = (type) => parseInt(parts.find((p) => p.type === type).value, 10);
  const hour = get("hour"), min = get("minute"), sec = get("second");
  const hoursUntil7am = hour >= 22 ? 24 - hour + 7 : 7 - hour;
  return Math.max((hoursUntil7am * 3600 - min * 60 - sec) * 1000, 60000);
}

function getPopupDelay() {
  if (isPopupSilentHour()) return msUntilNextActiveWindow();
  const opts = [1, 2, 4];
  return opts[Math.floor(Math.random() * opts.length)] * 60 * 1000;
}

function getRandomMinutes() {
  return Math.floor(Math.random() * 14) + 2;
}

function getPurchaseText(quantity) {
  if (quantity === 1) {
    return "compró 1 tarro de Fibra Fix";
  }
  return `compró ${quantity} tarros de Fibra Fix`;
}

function showPurchaseNotification() {
  if (purchaseNotificationsStopped || !purchaseNotification) {
    return;
  }
  if (isPopupSilentHour() || !firstNamesList.length || !citiesList.length) {
    purchaseShowTimer = setTimeout(showPurchaseNotification, getPopupDelay());
    return;
  }

  const qty = Math.random() > 0.5 ? (Math.random() > 0.5 ? 3 : 2) : 1;
  purchaseNotificationName.textContent = getRandomItem(firstNamesList);
  purchaseNotificationCity.textContent = "de " + getRandomItem(citiesList);
  purchaseNotificationOrder.textContent = getPurchaseText(qty);
  purchaseNotificationTime.textContent = "Hace " + getRandomMinutes() + " minutos";
  purchaseNotificationStatus.textContent = "Compra reciente";

  requestAnimationFrame(() => {
    purchaseNotification.classList.add("is-visible");
  });

  clearTimeout(purchaseHideTimer);
  purchaseHideTimer = setTimeout(hidePurchaseNotification, 6000);
  purchaseShowTimer = setTimeout(showPurchaseNotification, getPopupDelay());
}

function hidePurchaseNotification() {
  if (!purchaseNotification) {
    return;
  }
  purchaseNotification.classList.remove("is-visible");
}

if (purchaseNotificationClose) {
  purchaseNotificationClose.addEventListener("click", () => {
    purchaseNotificationsStopped = true;
    clearTimeout(purchaseShowTimer);
    clearTimeout(purchaseHideTimer);
    purchaseNotification.classList.remove("is-visible");
  });
}

if (purchaseNotification) {
  // La petición a Google se hace cuando la página ya terminó de cargar (mejor PageSpeed)
  const startPopups = () => {
    setTimeout(() => {
      loadPopupData().then(() => {
        purchaseShowTimer = setTimeout(showPurchaseNotification, 3000);
      });
    }, 2500);
  };
  if (document.readyState === "complete") {
    startPopups();
  } else {
    window.addEventListener("load", startPopups);
  }
}

// ✅ Videos: se descargan solo cuando están cerca de la pantalla (mejor PageSpeed)
(function () {
  const howUseVideo = document.getElementById("howUseVideo");
  const testimonial = document.getElementById("testimonialVideo");

  function whenNear(el, margin, callback) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      callback();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          callback();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
  }

  whenNear(howUseVideo, "300px", () => {
    howUseVideo.muted = true;
    const p = howUseVideo.play();
    if (p && p.catch) p.catch(() => {});
  });

  whenNear(testimonial, "600px", () => {
    if (testimonial.paused && !testimonial.currentTime) {
      testimonial.preload = "metadata";
      testimonial.load();
    }
  });
})();
