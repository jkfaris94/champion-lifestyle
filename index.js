function sendMail(){
  let params = {
      name : document.getElementById("name").value,
      email : document.getElementById("email").value,
      message : document.getElementById("message").value,
  }

  emailjs.send("service_t458qp2", "template_hjmej7w",params).then(alert("Your Message has sent!"))
}