function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const feet = parseFloat(document.getElementById('height-feet').value);
    const inches = parseFloat(document.getElementById('height-inches').value);
    const bodyType = document.getElementById('body-type').value;
    const activityLevel = document.getElementById('activity-level').value;
    const sex = document.getElementById('sex').value; // Removed parseFloat; should be "male" or "female"
    const age = parseFloat(document.getElementById('age').value);

    // Validate inputs
    if (isNaN(weight) || isNaN(feet) || isNaN(inches) || !sex || isNaN(age)) {
        alert("Please fill in all fields with valid values!");
        return;
    }

    // Convert weight from pounds to kilograms
    const weightInKG = Math.floor(weight / 2.20462);

    // Convert height from feet and inches to centimeters
    const heightInCM = (feet * 30.48) + (inches * 2.54);

    // BMR calculator using Mifflin-St Jeor equation
    let BMR;
    if (sex === "male") {
        BMR = (10 * weightInKG) + (6.25 * heightInCM) - (5 * age) + 5;
    } else if (sex === "female") {
        BMR = (10 * weightInKG) + (6.25 * heightInCM) - (5 * age) - 161;
    } else {
        alert("Invalid sex provided.");
        return;
    }

    // Activity multipliers (Harris-Benedict)
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
    };

    // Validate activity level
    if (!activityMultipliers[activityLevel]) {
        alert("Please select a valid activity level.");
        return;
    }

    const maintenanceCalories = BMR * activityMultipliers[activityLevel];

    // Macronutrient distribution
    const macronutrients = {
        ectomorph: { carbs: 0.55, protein: 0.25, fats: 0.2 },
        mesomorph: { carbs: 0.4, protein: 0.3, fats: 0.3 },
        endomorph: { carbs: 0.25, protein: 0.35, fats: 0.4 },
    };

    // Validate body type
    if (!macronutrients[bodyType]) {
        alert("Please select a valid body type.");
        return;
    }

    const selectedMacro = macronutrients[bodyType];
    const caloriesFromCarbs = maintenanceCalories * selectedMacro.carbs;
    const caloriesFromProtein = maintenanceCalories * selectedMacro.protein;
    const caloriesFromFats = maintenanceCalories * selectedMacro.fats;

    // Display results
    const resultsDiv = document.getElementById("results");
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