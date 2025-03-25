/* Toggle Style Switcher */

const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
styleSwitcherToggle.addEventListener('click', () => { document.querySelector('.style-switcher').classList.toggle('open'); })

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

var typed = new Typed('.typing', { strings: ["", " Video Editor", "Content Writer", "Graphic Designer", "Youtuber"], typeSpeed: 100, Backspeed: 60, loop: true })

/* Changing Aside Active Link */

const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for(let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(){
            removeBackSection();
            for(let j = 0; j < totalNavList; j++) { 
                if(navList[j].querySelector('a').classList.contains('active')) { addBackSection(j);/*allSection[j].classList.add('back-section');*/ }
                navList[j].querySelector('a').classList.remove('active'); }
        this.classList.add('active');
        showSection(this);

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

function updateNav(element){
    for(let i = 0; i < totalNavList; i++){
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if(target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) { navList[i].querySelector('a').classList.add('active'); }
        
    }
}

document.querySelector('.hire-me').addEventListener('click', function(){
    const sectionIndex = this.getAttribute('data-section-index');
    /*console.log(sectionIndex);*/
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
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


(function() {
    emailjs.init("-9P7bclQ49Eid2-gN"); // Replace with your EmailJS Public Key
})();

window.onload = function() {
  let form = document.getElementById('contact-form');
            document.getElementById('contact-form').addEventListener('submit', function(event) {
                event.preventDefault();
                // these IDs from the previous steps
                emailjs.sendForm('service_ozui66q','template_0syv1aq',form, this)
                    .then(() => {
                        console.log('SUCCESS!');
                    }, (error) => {
                        console.log('FAILED...', error);
                    });
            });
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