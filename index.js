emailjs.init("chOrTsLOMQFnW_xza", "https://api.emailjs.com");


function submitContactForm(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  // Create an object to send as JSON
  const templateParams = {
    name: name,
    email: email,
    message: message
  };
  
  // use EmailJS to send the email
  emailjs.send("service_t458qp2", "template_hjmej7w", templateParams)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      document.getElementById("formResponse").textContent = "Your message has been sent successfully!";
      document.getElementById("contactForm").reset();
    }, function (error) {
      console.error("FAILED...", error);
      document.getElementById("formResponse").textContent = "Failed to send message, please try again.";
    });
}
 
document.getElementById('contactForm').addEventListener('submit', submitContactForm);