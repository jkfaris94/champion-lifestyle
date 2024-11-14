function submitContactForm() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    // Create an object to send as JSON
    const formData = {
      name: name,
      email: email,
      message: message
    };
  
    // Send data to the server
    fetch('https://example.com/api/contact', { // Replace with your server endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      // Display a success message
      document.getElementById("responseMessage").innerText = "Thank you for your message!";
    })
    .catch(error => {
      // Display an error message
      document.getElementById("responseMessage").innerText = "An error occurred. Please try again.";
    });
  }
  