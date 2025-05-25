document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form validation
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        // If form is valid, show success message
        if (isValid) {
            successMessage.style.display = 'block';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Dynamic Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Animate Progress Bars on Scroll
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Only animate when skills section is in view
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Initialize Age Calculator
    function initAgeCalculator() {
        const ageCalcBtn = document.getElementById("age-calc-btn");
        const birthdayEl = document.getElementById("birthday");
        const ageResultEl = document.getElementById("age-result");

        if (ageCalcBtn && birthdayEl && ageResultEl) {
            ageCalcBtn.addEventListener("click", function() {
                const birthdayValue = birthdayEl.value;
                if (birthdayValue === "") {
                    alert("Please enter your birthday");
                } else {
                    const age = getAge(birthdayValue);
                    ageResultEl.innerText = `Your age is ${age} ${age > 1 ? "years" : "year"} old`;
                }
            });

            function getAge(birthdayValue) {
                const currentDate = new Date();
                const birthdayDate = new Date(birthdayValue);
                let age = currentDate.getFullYear() - birthdayDate.getFullYear();
                const month = currentDate.getMonth() - birthdayDate.getMonth();

                if (month < 0 || (month === 0 && currentDate.getDate() < birthdayDate.getDate())) {
                    age--;
                }
                return age;
            }
        }
    }

    // Initialize Dice Roller
    function initDiceRoller() {
      console.log('i luv maf');
      
        // const rollButton = document.getElementById("roll-button");
        // const diceEl = document.getElementById("dice");
        // const rollHistoryEl = document.getElementById("roll-history");
        // let historyList = [];

        // if (rollButton && diceEl && rollHistoryEl) {
        //     rollButton.addEventListener("click", () => {
        //         diceEl.classList.add("roll-animation");
        //         setTimeout(() => {
        //             diceEl.classList.remove("roll-animation");
        //             rollDice();
        //         }, 1000);
        //     });

        //     function rollDice() {
        //         const rollResult = Math.floor(Math.random() * 6) + 1;
        //         const diceFace = getDiceFace(rollResult);
        //         diceEl.innerHTML = diceFace;
        //         historyList.push(rollResult);
        //         updateRollHistory();
        //     }

        //     function updateRollHistory() {
        //         rollHistoryEl.innerHTML = "";
        //         for (let i = 0; i < historyList.length; i++) {
        //             const listItem = document.createElement("li");
        //             listItem.innerHTML = `Roll ${i + 1}: <span>${getDiceFace(historyList[i])}</span>`;
        //             rollHistoryEl.appendChild(listItem);
        //         }
        //     }

        //     function getDiceFace(rollResult) {
        //         switch (rollResult) {
        //             case 1: return "&#9856;";
        //             case 2: return "&#9857;";
        //             case 3: return "&#9858;";
        //             case 4: return "&#9859;";
        //             case 5: return "&#9860;";
        //             case 6: return "&#9861;";
        //             default: return "";
        //         }
        //     }
        // }
    }

    // Modal open/close functionality
    const demoLinks = document.querySelectorAll('.demo-link');
    const modals = document.querySelectorAll('.project-demo-modal');
    const closeButtons = document.querySelectorAll('.close-demo');

    demoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModal = document.querySelector(this.getAttribute('href'));
            if (targetModal) {
                targetModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Initialize the appropriate demo when modal opens
                if (targetModal.id === 'age-calculator-demo') {
                    initAgeCalculator();
                } else if (targetModal.id === 'dice-roller-demo') {
                    initDiceRoller();
                }
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.project-demo-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-demo-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector(".display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(ms) {
    let date = new Date(ms);
    return date.toISOString().substr(11, 8); // Formats as HH:MM:SS
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = false;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize
updateDisplay();
pauseBtn.disabled = true;