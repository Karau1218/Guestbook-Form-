// this is for running validation when form is submitted
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    if (!isValid()) {
      event.preventDefault(); // Stop form submission if invalid
    }
  });
});

function isValid() {
  // The form values with id's
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const meet = document.getElementById("meet").value;
  const mailingList = document.getElementById("mailingList").checked;

  // Get error span elements of the form values
  const errorFname = document.getElementById("error-fname");
  const errorLname = document.getElementById("error-lname");
  const errorEmail = document.getElementById("error-email");
  const errorLinkedin = document.getElementById("error-linkedin");
  const errorMeet = document.getElementById("error-meet");

  // Clear previous errors
  errorFname.textContent = "";
  errorLname.textContent = "";
  errorEmail.textContent = "";
  errorLinkedin.textContent = "";
  errorMeet.textContent = "";

  let valid = true;

  // First and Last name required
  if (fname === "") {
    errorFname.textContent = "First name is required.";
    valid = false;
  }

  if (lname === "") {
    errorLname.textContent = "Last name is required.";
    valid = false;
  }

  // Email validation helper 
  const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  // Email required if mailing list checked
  if (mailingList && email === "") {
    errorEmail.textContent = "Email is required if you want to join the mailing list.";
    valid = false;
  }

  // Email format check (if provided)
  if (email !== "" && !validateEmail(email)) {
    errorEmail.textContent = "Please enter a valid email address.";
    valid = false;
  }

  // LinkedIn is optional, but it must start correctly if provided
  if (linkedin !== "" && !linkedin.startsWith("https://linkedin.com/in/")) {
    errorLinkedin.textContent = "LinkedIn URL must start with https://linkedin.com/in/";
    valid = false;
  }

  // "How we met" required
  if (meet === "none" || meet === "") {
    errorMeet.textContent = "Please select how we met.";
    valid = false;
  }

  return valid;
}

// for Showing /hiding “Other” textbox
const meetSelect = document.getElementById("meet");
const otherField = document.getElementById("other");

meetSelect.addEventListener("change", function() {
  if (this.value === "other") {
    otherField.style.display = "block";
  } else {
    otherField.style.display = "none";
  }
});

// for Showing /hiding email format when mailing list checked
const mailingListCheckbox = document.getElementById("mailingList");
const radioGroup = document.querySelector(".radio-group");

mailingListCheckbox.addEventListener("change", function() {
  if (this.checked) {
    radioGroup.style.display = "block";
  } else {
    radioGroup.style.display = "none";
  }
});

