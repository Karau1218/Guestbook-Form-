document.getElementById("contact-form").addEventListener("submit", function(event) {
  const firstName = document.getElementById("fname").value.trim();
  const lastName = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const meet = document.getElementById("howWeMet").value.trim();
  const mailingList = document.getElementById("mailingList").checked;
  const errorMsg = document.getElementById("error-message");

  // Clear previous error message
  errorMsg.textContent = "";

    // email regex
  const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
    

// first and last name required
  if (fname === "" || lname === "") {
    event.preventDefault(); // Stop form from submitting
    errorMsg.textContent = "First and Last name required.";
  } 
  // email required if mailing list checked
    else if
    (mailingList && email === "")  {
    event.preventDefault();
    errorMsg.textContent = "Email is required if you want to join the mailing list.";
  }
  // Email format check (if provided)
   else if 
    (email !== "" && !validateEmail(email)) {
    event.preventDefault(); // Stop form from submitting
    errorMsg.textContent = "Email must contain an @ symbol and a dot (.)"
  }
  // LinkedIn optional, but must start with proper URL if provided
   else if 
    (linkedin !== "" && !linkedin.startsWith("https://linkedin.com/in/")) {
    event.preventDefault();
    errorMsg.textContent = "LinkedIn URL must start with https://linkedin.com/in/";
  }
  // "How we met" required
  else if 
  (meet === "") {
    errorMsg.textContent = "How we met is required.";
  }

  });





