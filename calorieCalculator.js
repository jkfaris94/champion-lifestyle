function calculateCalories() {
    // Get input values
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activityLevel = parseFloat(document.getElementById("activity").value);
  
    let bmr;
  
    // Calculate BMR based on gender
    if (gender === "male") {
      // Mifflin-St Jeor equation for males
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      // Mifflin-St Jeor equation for females
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    // Calculate total calories based on activity level
    const totalCalories = bmr * activityLevel;
  
    // Display result
    document.getElementById("result").innerHTML = `
      <h3>Daily Caloric Needs</h3>
      <p>Your estimated calorie requirement is <strong>${totalCalories.toFixed(2)}</strong> calories per day.</p>
    `;
  }
  