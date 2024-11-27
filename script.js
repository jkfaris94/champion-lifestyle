document.addEventListener("DOMContentLoaded", () => {
  const readMoreButton = document.getElementById("readMore");
  if (readMoreButton) {
      readMoreButton.addEventListener("click", toggleReadMore);
  }
});

function sendMail() {
  let params = {
      name : document.getElementById("name").value,
      email : document.getElementById("email").value,
      message : document.getElementById("message").value,
  }

  emailjs.send("service_t458qp2", "template_hjmej7w",params).then(alert("Your Message has sent!"))
}

function toggleReadMore() {
  const moreText = document.getElementById("moreText");
  const readMore = document.getElementById("readMore");

  if (moreText && readMore) {
      if (moreText.classList.contains("hidden")) {
          moreText.classList.remove("hidden");
          readMore.textContent = "Read Less";
      } else {
          moreText.classList.add("hidden");
          readMore.textContent = "Read More";
      }
  }
}