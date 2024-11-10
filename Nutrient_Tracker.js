let nutrientTracker = {
    macronutrients: { "Protein": 0, "Carbohydrates": 0, "Fats": 0, "Cholesterol": 0 },
    micronutrients: { "Vitamin C": 0, "Vitamin D": 0, "Calcium": 0, "Iron": 0, "Sodium": 0 },
    totalCalories: 0
};

// Parse CSV file and store data in a food database
let foodDatabase = {};
fetch("foods.csv")
    .then(response => response.text())
    .then(data => {
        const lines = data.split("\n");
        const headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            const cells = lines[i].split(",");
            const foodName = cells[0].trim().toLowerCase();
            if (foodName) {
                foodDatabase[foodName] = {
                    "Protein": parseFloat(cells[1]) || 0,
                    "Carbohydrates": parseFloat(cells[2]) || 0,
                    "Fats": parseFloat(cells[3]) || 0,
                    "Cholesterol": parseFloat(cells[4]) || 0,
                    "Vitamin C": parseFloat(cells[5]) || 0,
                    "Vitamin D": parseFloat(cells[6]) || 0,
                    "Calcium": parseFloat(cells[7]) || 0,
                    "Iron": parseFloat(cells[8]) || 0,
                    "Sodium": parseFloat(cells[9]) || 0,
                    "Calories": parseFloat(cells[10]) || 0
                };
            }
        }
    })
    .catch(error => console.error("Error loading CSV:", error));

function addFood() {
    const foodName = document.getElementById("foodName").value.trim().toLowerCase();
    const servings = parseInt(document.getElementById("servings").value);

    if (foodDatabase[foodName] && servings > 0) {
        const foodNutrients = foodDatabase[foodName];
        nutrientTracker.macronutrients["Protein"] += foodNutrients["Protein"] * servings;
        nutrientTracker.macronutrients["Carbohydrates"] += foodNutrients["Carbohydrates"] * servings;
        nutrientTracker.macronutrients["Fats"] += foodNutrients["Fats"] * servings;
        nutrientTracker.macronutrients["Cholesterol"] += foodNutrients["Cholesterol"] * servings;
        nutrientTracker.micronutrients["Vitamin C"] += foodNutrients["Vitamin C"] * servings;
        nutrientTracker.micronutrients["Vitamin D"] += foodNutrients["Vitamin D"] * servings;
        nutrientTracker.micronutrients["Calcium"] += foodNutrients["Calcium"] * servings;
        nutrientTracker.micronutrients["Iron"] += foodNutrients["Iron"] * servings;
        nutrientTracker.micronutrients["Sodium"] += foodNutrients["Sodium"] * servings;
        nutrientTracker.totalCalories += foodNutrients["Calories"] * servings;

        document.getElementById("foodName").value = "";
        document.getElementById("servings").value = 1;
        updateSummary();
    } else {
        alert("Food not found in database or invalid servings.");
    }
}

function updateSummary() {
    let summary = "Macronutrients:\n";
    for (const [key, value] of Object.entries(nutrientTracker.macronutrients)) {
        summary += `  ${key}: ${value.toFixed(2)}g\n`;
    }
    summary += "\nMicronutrients:\n";
    for (const [key, value] of Object.entries(nutrientTracker.micronutrients)) {
        summary += `  ${key}: ${value.toFixed(2)}mg\n`;
    }
    summary += `\nTotal Calories: ${nutrientTracker.totalCalories.toFixed(2)} kcal\n`;

    document.getElementById("summaryText").innerText = summary;
}
