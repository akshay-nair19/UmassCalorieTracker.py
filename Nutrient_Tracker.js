let nutrientTracker = {
    "Calories": 0,
    "Total Fat": 0,
    "Saturated Fat": 0,
    "Trans Fat": 0,
    "Cholesterol": 0,
    "Sodium": 0,
    "Total Carbohydrates": 0,
    "Dietary Fiber": 0,
    "Sugars": 0,
    "Protein": 0
};

const nutrientUnits = {
    "Total Fat": "g",
    "Saturated Fat": "g",
    "Trans Fat": "g",
    "Cholesterol": "mg",
    "Sodium": "mg",
    "Total Carbohydrates": "g",
    "Dietary Fiber": "g",
    "Sugars": "g",
    "Protein": "g"
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
            const dishName = cells[0].trim().toLowerCase();
            if (dishName) {
                foodDatabase[dishName] = {
                    "Calories": parseFloat(cells[1]) || 0,
                    "Total Fat": parseFloat(cells[2]) || 0,
                    "Saturated Fat": parseFloat(cells[3]) || 0,
                    "Trans Fat": parseFloat(cells[4]) || 0,
                    "Cholesterol": parseFloat(cells[5]) || 0,
                    "Sodium": parseFloat(cells[6]) || 0,
                    "Total Carbohydrates": parseFloat(cells[7]) || 0,
                    "Dietary Fiber": parseFloat(cells[8]) || 0,
                    "Sugars": parseFloat(cells[9]) || 0,
                    "Protein": parseFloat(cells[10]) || 0
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
        nutrientTracker["Calories"] += foodNutrients["Calories"] * servings;
        nutrientTracker["Total Fat"] += foodNutrients["Total Fat"] * servings;
        nutrientTracker["Saturated Fat"] += foodNutrients["Saturated Fat"] * servings;
        nutrientTracker["Trans Fat"] += foodNutrients["Trans Fat"] * servings;
        nutrientTracker["Cholesterol"] += foodNutrients["Cholesterol"] * servings;
        nutrientTracker["Sodium"] += foodNutrients["Sodium"] * servings;
        nutrientTracker["Total Carbohydrates"] += foodNutrients["Total Carbohydrates"] * servings;
        nutrientTracker["Dietary Fiber"] += foodNutrients["Dietary Fiber"] * servings;
        nutrientTracker["Sugars"] += foodNutrients["Sugars"] * servings;
        nutrientTracker["Protein"] += foodNutrients["Protein"] * servings;

        document.getElementById("foodName").value = "";
        document.getElementById("servings").value = 1;
        updateSummary();
    } else {
        alert("Food not found in database or invalid servings.");
    }
}


function updateSummary() {
    let summary = "Nutrient Summary:\n";
    for (const [key, value] of Object.entries(nutrientTracker)) {
        summary += `  ${key}: ${value.toFixed(2)}`;
        if (key !== "Calories") summary += ` ${nutrientUnits[key]}`;
        summary += "\n";
    }

    document.getElementById("summaryText").innerText = summary;
}

