function calculateCalories() {
  const weight = parseFloat(document.getElementById('weight').value);
  const feet = parseFloat(document.getElementById('height-feet').value);
  const inches = parseFloat(document.getElementById('height-inches').value);
  const bodyType = document.getElementById('body-type').value;
  const activityLevel = document.getElementById('activity-level').value;

  if (!weight || !feet || !inches) {
      alert("Please fill in all fields!");
      return;
  }

  // Convert height to total inches
  const totalHeightInInches = (feet * 12) + inches;

  // BMR calculation using Harris-Benedict formula
  const bmr = 66 + (6.23 * weight) + (12.7 * totalHeightInInches) - (6.8 * 30); // Assuming age=30

  // Activity multiplier
  const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
  };

  const maintenanceCalories = bmr * activityMultipliers[activityLevel];

  // Macronutrient distribution
  const macronutrients = {
      ectomorph: { carbs: 0.55, protein: 0.25, fats: 0.2 },
      mesomorph: { carbs: 0.4, protein: 0.3, fats: 0.3 },
      endomorph: { carbs: 0.25, protein: 0.35, fats: 0.4 },
  };

  const selectedMacro = macronutrients[bodyType];
  const caloriesFromCarbs = maintenanceCalories * selectedMacro.carbs;
  const caloriesFromProtein = maintenanceCalories * selectedMacro.protein;
  const caloriesFromFats = maintenanceCalories * selectedMacro.fats;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
      <h3>Results</h3>
      <p><strong>Maintenance Calories:</strong> ${maintenanceCalories.toFixed(0)} kcal/day</p>
      <p><strong>Macronutrient Breakdown:</strong></p>
      <ul>
          <li>Carbs: ${caloriesFromCarbs.toFixed(0)} kcal (${(caloriesFromCarbs / 4).toFixed(0)}g)</li>
          <li>Protein: ${caloriesFromProtein.toFixed(0)} kcal (${(caloriesFromProtein / 4).toFixed(0)}g)</li>
          <li>Fats: ${caloriesFromFats.toFixed(0)} kcal (${(caloriesFromFats / 9).toFixed(0)}g)</li>
      </ul>
  `;
}
