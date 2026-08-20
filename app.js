// const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
// styleSwitcherToggle.addEventListener('click', () => { document.querySelector('.style-switcher').classList.toggle('open'); })

window.addEventListener('scroll', () => { if(document.querySelector('.style-switcher').classList.contains('open')) { document.querySelector('.style-switcher').classList.remove('open'); } })

const alternateStyles = document.querySelectorAll('.alternate-style');
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute('title')) { style.removeAttribute('disabled'); } else { style.setAttribute('disabled', 'true'); }
    })
}

/* Dark/Light Mode */

const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
})

window.addEventListener('load', () => {
    if(document.body.classList.contains('dark')) { dayNight.querySelector('i').classList.add('fa-sun'); } else { dayNight.querySelector('i').classList.add('fa-moon'); }
})

/* Typing Animation */

// var typed = new Typed('.typing', { strings: ["", " Video Editor", "Content Writer", "Graphic Designer", "Youtuber"], typeSpeed: 100, Backspeed: 60, loop: true })

/* Changing Aside Active Link */
console.log('hello');

const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for(let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(event){
            event.preventDefault();
            removeBackSection();
            for(let j = 0; j < totalNavList; j++) { 
                if(navList[j].querySelector('a').classList.contains('active')) { addBackSection(j);/*allSection[j].classList.add('back-section');*/ }
                navList[j].querySelector('a').classList.remove('active'); }
        this.classList.add('active');
        showSection(this);
        updateUrl(this);

        if(window.innerWidth < 1200) { asideSectionTogglerBtn(); }
    })
}

function addBackSection(num) { allSection[num].classList.add('back-section'); }

function removeBackSection(){
    for( let i = 0; i < totalSection; i++){ allSection[i].classList.remove('back-section'); }
}

function showSection(element){
    for( let i = 0; i < totalSection; i++){ allSection[i].classList.remove('active'); }

    const target = element.getAttribute("href").split("#")[1];
    document.querySelector('#' + target).classList.add('active');
}

function updateUrl(element){
    const target = element.getAttribute('href').split('#')[1];
    window.history.pushState({}, '', target === 'home' ? '/' : '/' + target);
}

function updateNav(element){
    for(let i = 0; i < totalNavList; i++){
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if(target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) { navList[i].querySelector('a').classList.add('active'); }
        
    }
}

function showSectionFromUrl(){
    const target = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
    const targetLink = Array.from(navList)
        .map((item) => item.querySelector('a'))
        .find((link) => link.getAttribute('href') === '#' + target);

    if (!targetLink) return;

    showSection(targetLink);
    updateNav(targetLink);
}

showSectionFromUrl();

document.querySelector('.hire-me').addEventListener('click', function(event){
    event.preventDefault();
    const sectionIndex = this.getAttribute('data-section-index');
    /*console.log(sectionIndex);*/
    showSection(this);
    updateNav(this);
    updateUrl(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

document.querySelector('.home-info .btn').addEventListener('click', function(event){
    event.preventDefault();
    showSection(this);
    updateNav(this);
    updateUrl(this);
    removeBackSection();
    addBackSection(0);
})

/* Activating Mobile Menu */

const navTogglerBtn = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => { asideSectionTogglerBtn(); })

function asideSectionTogglerBtn(){
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for(let i = 0; i < totalSection; i++) { allSection[i].classList.toggle('open'); }
}

const reviewsTrack = document.querySelector('.reviews-track');
const reviewCards = document.querySelectorAll('.review-card');
const reviewDots = document.querySelector('.review-dots');
const reviewPrev = document.querySelector('.review-prev');
const reviewNext = document.querySelector('.review-next');
let currentReview = 0;
let reviewTimer;

if (reviewsTrack && reviewCards.length && reviewDots && reviewPrev && reviewNext) {
    reviewCards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'review-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Show review ' + (index + 1));
        dot.addEventListener('click', () => showReview(index));
        reviewDots.appendChild(dot);
    });

    function showReview(index) {
        currentReview = (index + reviewCards.length) % reviewCards.length;
        reviewsTrack.style.transform = 'translateX(-' + (currentReview * 100) + '%)';
        reviewDots.querySelectorAll('.review-dot').forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentReview);
        });
    }

    function startReviewTimer() {
        reviewTimer = setInterval(() => showReview(currentReview + 1), 5000);
    }

    function resetReviewTimer() {
        clearInterval(reviewTimer);
        startReviewTimer();
    }

    reviewPrev.addEventListener('click', () => { showReview(currentReview - 1); resetReviewTimer(); });
    reviewNext.addEventListener('click', () => { showReview(currentReview + 1); resetReviewTimer(); });
    reviewsTrack.addEventListener('mouseenter', () => clearInterval(reviewTimer));
    reviewsTrack.addEventListener('mouseleave', startReviewTimer);
    startReviewTimer();
}


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<div class="loading-spinner"></div>';

        const message = createWhatsAppMessage(data);

        setTimeout(() => {
            sendWhatsAppMessage(message);
            showToast('Message sent successfully! I\'ll get back to you within 24 hours.');
            this.reset();
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.textContent = '→';
        }, 1200);
    });
});

function createWhatsAppMessage(data) {
    const name = data.name || 'Not specified';
    const email = data.email || 'Not specified';
    const company = data.company || 'Not specified';
    const service = data.service || 'Not specified';
    const budget = data.budget || 'Not specified';
    const message = data.message || 'No project details provided.';

    return `*New Contact Request from Arun Poudel Website*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Company:* ${company}\n` +
        `*Service Needed:* ${service}\n` +
        `*Budget Range:* ${budget}\n\n` +
        `*Project Details:*\n${message}`;
}

function sendWhatsAppMessage(message) {
    const phoneNumber = '9779761119707';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
// function sendEmail() {
// let message = document.getElementById("message").value;
// let name = document.getElementById("name").value;
// let email = document.getElementById("email").value;
// let subject = document.getElementById("subject").value;
  
//     let templateParams = {
//         to_name: 'Arun Poudel',
//         from_name: name,
//         message: message,
//         reply_to: email
//     };

//     emailjs.send("service_ozui66q", "template_0syv1aq", templateParams)
//         .then(function(response) {
//             console.log("Email Sent!", response.status, response.text);
//             alert("Message sent successfully!");
//         }, function(error) {
//             console.error("Failed...", error);
//         });
// }