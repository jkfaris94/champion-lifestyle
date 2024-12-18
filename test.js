function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const feet = parseFloat(document.getElementById('height-feet').value);
    const inches = parseFloat(document.getElementById('height-inches').value);
    const bodyType = document.getElementById('body-type').value;
    const activityLevel = document.getElementById('activity-level').value;
    const sex = document.getElementById('sex').value; 
    const age = parseFloat(document.getElementById('age').value);
    const goalWeight = parseFloat(document.getElementById('goal-weight').value);
    const fitnessGoal = document.getElementById('fitness-goal').value;

    // Validate inputs
    if (isNaN(weight) || isNaN(feet) || isNaN(inches) || !sex || isNaN(age)) {
        alert("Please fill in all fields with valid values!");
        return;
    }

    //use helper functions (BMR uses Mifflin-St Jeor equation)
    const convertWeightToKG = (lbs) => lbs / 2.20462;
    const convertHeightToCM = (feet, inches) => (feet * 30.48) + (inches * 2.54);
    const calculateBMR = (kg, cm, age, sex) => {
        if (sex === "male") return (10 * kg) + (6.25 * cm) - (5 * age) + 5;
        if (sex === "female") return (10 * kg) + (6.25 * cm) - (5 * age) - 161;
        throw new Error("invalid sex provided"); 
    };
    // activity multiplier uses (Harris-Benedict formula)
    const getActivityMultiplier = (level) => {
        const activityMultiplier = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
        };
        return activityMultiplier[level] || 0; 
    }

    // calculate current maintance calories
    const weightInKG = convertWeightToKG(weight);
    const heightInCM = convertHeightToCM(feet, inches);
    const BMR = calculateBMR(weightInKG, heightInCM, age, sex);
    const activityMultiplier = getActivityMultiplier(activityLevel);

    if (!activityMultiplier) {
        alert("please select a valid activity level.");
        return;
    }

    const maintenanceCalories = BMR * activityMultiplier;

    // calculate goal maintenance calories 
    const goalWeightInKG = convertWeightToKG(goalWeight);
    const goalBMR = calculateBMR(goalWeightInKG, heightInCM, age, sex);
    const goalCalories = goalBMR * activityMultiplier;

    // determine surplus or deficit needed
    const calorieDifference = goalCalories - maintenanceCalories;
    const adjustmentType = calorieDifference > 0 ? "surplus" : "deficit";

    // Macronutrient distribution
    const macronutrients = {
        ectomorph: { carbs: 0.55, protein: 0.25, fats: 0.2 },
        mesomorph: { carbs: 0.4, protein: 0.3, fats: 0.3 },
        endomorph: { carbs: 0.25, protein: 0.35, fats: 0.4 },
    };

    // Validate body type
    const selectedMacro = macronutrients[bodyType];
    if (!selectedMacro) {
        alert("Please select a valid body type.");
        return;
    };
    const caloriesFromCarbs = maintenanceCalories * selectedMacro.carbs;
    const caloriesFromProtein = maintenanceCalories * selectedMacro.protein;
    const caloriesFromFats = maintenanceCalories * selectedMacro.fats;


    const goalMacros = macronutrients[fitnessGoal];

    const goalCarbs = goalCalories * goalMacros.carbs;
    const goalProtein = goalCalories * goalMacros.protein;
    const goalFats = goalCalories * goalMacros.fats;

    // Display results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Results</h3>
        <p><strong>Estimated Maintenance Calories:</strong> ${maintenanceCalories.toFixed(0)} kcal/day</p>
        <p><strong>Macronutrient Breakdown:</strong></p>
        <ul>
            <li>Carbs: ${caloriesFromCarbs.toFixed(0)} kcal (${(caloriesFromCarbs / 4).toFixed(0)}g)</li>
            <li>Protein: ${caloriesFromProtein.toFixed(0)} kcal (${(caloriesFromProtein / 4).toFixed(0)}g)</li>
            <li>Fats: ${caloriesFromFats.toFixed(0)} kcal (${(caloriesFromFats / 9).toFixed(0)}g)</li>
        </ul>
        <h3>Goal Calories</h3>
        <p><strong>Estimated Goal Calories:</strong> ${goalCalories.toFixed(0)} kcal/day</p>
        <p><strong>Calorie Adjustment:</strong> ${Math.abs(calorieDifference.toFixed(0))} kcal (${adjustmentType})</p>
        <p><strong>Macronutrient Breakdown:</strong></p>
        <ul>
            <li>Carbs: ${goalCarbs.toFixed(0)} kcal (${(goalCarbs / 4).toFixed(0)}g)</li>
            <li>Protein: ${goalProtein.toFixed(0)} kcal (${(goalProtein / 4).toFixed(0)}g)</li>
            <li>Fats: ${goalFats.toFixed(0)} kcal (${(goalFats / 9).toFixed(0)}g)</li>
        </ul>
    `;
}