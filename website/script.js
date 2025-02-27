document.addEventListener("DOMContentLoaded", function () {
    fetch("cleaned_nutrition_facts.csv") // Ensure correct path
        .then(response => response.text())
        .then(data => {
            processCSVData(data);
        })
        .catch(error => console.error("Error loading CSV:", error));

    document.getElementById("addFood").addEventListener("click", addFoodToSelection);
});

let foodData = {}; // Store food data for quick lookup

function processCSVData(csvText) {
    const rows = csvText.split("\n").map(row => row.split(","));
    const foodDropdown = document.getElementById("foodDropdown");

    if (rows.length < 2) return; // Ensure data exists

    console.log("CSV Headers:", rows[0]); // Debugging: check column headers
    console.log("Sample Row:", rows[1]); // Debugging: check first food item row

    for (let i = 1; i < rows.length; i++) {
        const foodName = rows[i][0];
        if (!foodName) continue;

        let option = document.createElement("option");
        option.value = foodName;
        option.textContent = foodName;
        foodDropdown.appendChild(option);

        foodData[foodName] = {
            calories: parseFloat(rows[i][1]) || 0,
            fat: parseFloat(rows[i][2]) || 0,
            sugar: parseFloat(rows[i][9]) || 0,
            protein: parseFloat(rows[i][10]) || 0,
            carbs: parseFloat(rows[i][7]) || 0
        };
    }
}

function addFoodToSelection() {
    const foodDropdown = document.getElementById("foodDropdown");
    const selectedFood = foodDropdown.value;

    if (!selectedFood || !foodData[selectedFood]) return;

    const selectedFoodsList = document.getElementById("selectedFoods");
    const listItem = document.createElement("li");
    listItem.textContent = `${selectedFood} - ${foodData[selectedFood].calories} kcal`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = function () {
        removeFoodFromSelection(listItem, foodData[selectedFood]);
    };

    listItem.appendChild(deleteButton);
    selectedFoodsList.appendChild(listItem);

    updateTotalMacros(foodData[selectedFood], true);
}

function removeFoodFromSelection(listItem, food) {
    listItem.remove();
    updateTotalMacros(food, false);
}

let totalMacros = { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0 };

function updateTotalMacros(food, isAdding) {
    const multiplier = isAdding ? 1 : -1;
    totalMacros.calories = parseFloat((totalMacros.calories + multiplier * food.calories).toFixed(1));
    totalMacros.fat = parseFloat((totalMacros.fat + multiplier * food.fat).toFixed(1));
    totalMacros.sugar = parseFloat((totalMacros.sugar + multiplier * food.sugar).toFixed(1));
    totalMacros.protein = parseFloat((totalMacros.protein + multiplier * food.protein).toFixed(1));
    totalMacros.carbs = parseFloat((totalMacros.carbs + multiplier * food.carbs).toFixed(1));

    document.getElementById("totalCalories").textContent = `Total Calories: ${totalMacros.calories} kcal`;
    document.getElementById("totalMacros").textContent = 
        `Protein: ${totalMacros.protein}g | Carbs: ${totalMacros.carbs}g | Sugar: ${totalMacros.sugar}g | Fat: ${totalMacros.fat}g`;
}





