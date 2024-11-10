// Variables to store food data and selected foods
let foods = {};
let selectedFoods = [];

// Elements for user interaction and results display
const foodDropdown = document.getElementById('foodDropdown');
const addFoodButton = document.getElementById('addFoodButton');
const searchBar = document.getElementById('searchBar');
const resultsEl = document.getElementById('results');

// Automatically fetch CSV file and populate food data
fetch("unique_nutrition_facts.csv")
    .then(response => response.text())
    .then(csvText => {
        parseCSVData(csvText);
        populateFoodDropdown();
    })
    .catch(error => console.error("Error loading CSV:", error));

// Parse CSV data
function parseCSVData(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    lines.slice(1).forEach(line => {
        const values = line.split(',');
        if (values.length === headers.length) {
            const foodName = values[0].toLowerCase(); // store food names in lowercase
            foods[foodName] = {
                Calories: parseFloat(values[1]),
                TotalFat: parseFloat(values[2]),
                SaturatedFat: parseFloat(values[3]),
                TransFat: parseFloat(values[4]),
                Cholesterol: parseFloat(values[5]),
                Sodium: parseFloat(values[6]),
                TotalCarbohydrate: parseFloat(values[7]),
                DietaryFiber: parseFloat(values[8]),
                Sugars: parseFloat(values[9]),
                Protein: parseFloat(values[10])
            };
        }
    });
}

// Populate dropdown with food items from CSV
function populateFoodDropdown() {
    foodDropdown.innerHTML = ''; // Clear previous items
    Object.keys(foods).forEach(food => {
        const option = document.createElement('option');
        option.value = food;
        option.textContent = food.charAt(0).toUpperCase() + food.slice(1); // Capitalize first letter
        foodDropdown.appendChild(option);
    });
    foodDropdown.disabled = false;
    addFoodButton.disabled = false;
}

// Add selected food to the list and calculate nutrients
function addFoodToSelection() {
    const selectedFood = foodDropdown.value;
    if (selectedFood && !selectedFoods.includes(selectedFood)) {
        selectedFoods.push(selectedFood);
        calculateNutrients();
    }
}

// Calculate and display nutrient summary
function calculateNutrients() {
    let totals = {
        Calories: 0, TotalFat: 0, SaturatedFat: 0, TransFat: 0,
        Cholesterol: 0, Sodium: 0, TotalCarbohydrate: 0,
        DietaryFiber: 0, Sugars: 0, Protein: 0
    };

    selectedFoods.forEach(food => {
        const foodData = foods[food];
        for (let nutrient in totals) {
            totals[nutrient] += foodData[nutrient] || 0;
        }
    });

    resultsEl.innerHTML = `
        <h3>Nutrient Summary</h3>
        <p>Calories: ${totals.Calories.toFixed(2)}</p>
        <p>Total Fat: ${totals.TotalFat.toFixed(2)}g</p>
        <p>Saturated Fat: ${totals.SaturatedFat.toFixed(2)}g</p>
        <p>Trans Fat: ${totals.TransFat.toFixed(2)}g</p>
        <p>Cholesterol: ${totals.Cholesterol.toFixed(2)}mg</p>
        <p>Sodium: ${totals.Sodium.toFixed(2)}mg</p>
        <p>Total Carbohydrate: ${totals.TotalCarbohydrate.toFixed(2)}g</p>
        <p>Dietary Fiber: ${totals.DietaryFiber.toFixed(2)}g</p>
        <p>Sugars: ${totals.Sugars.toFixed(2)}g</p>
        <p>Protein: ${totals.Protein.toFixed(2)}g</p>
    `;
}

// Filter foods in dropdown based on search input
function filterFoods() {
    const searchTerm = searchBar.value.toLowerCase();
    foodDropdown.innerHTML = ''; // Clear previous items

    Object.keys(foods)
        .filter(food => food.includes(searchTerm))
        .forEach(food => {
            const option = document.createElement('option');
            option.value = food;
            option.textContent = food.charAt(0).toUpperCase() + food.slice(1); // Capitalize first letter
            foodDropdown.appendChild(option);
        });
}
