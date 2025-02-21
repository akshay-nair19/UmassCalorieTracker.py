document.addEventListener("DOMContentLoaded", function () {
    let foodData = {};

    document.getElementById("loadCSV").addEventListener("click", function () {
        const fileInput = document.getElementById("csvFile");
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                parseCSV(e.target.result);
            };
            reader.readAsText(file);
        }
    });

    function parseCSV(csvText) {
        const rows = csvText.split("\n").map(row => row.split(","));
        const headers = rows[0];
        foodData = {};

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length < headers.length) continue;

            const foodName = row[0];
            foodData[foodName] = {};
            for (let j = 1; j < headers.length; j++) {
                foodData[foodName][headers[j]] = parseFloat(row[j]) || row[j];
            }
        }
        populateDropdown();
    }

    function populateDropdown() {
        const dropdown = document.getElementById("foodDropdown");
        dropdown.innerHTML = "";
        Object.keys(foodData).forEach(food => {
            const option = document.createElement("option");
            option.value = food;
            option.textContent = food;
            dropdown.appendChild(option);
        });
    }

    let selectedFoods = [];

    document.getElementById("addFood").addEventListener("click", function () {
        const foodName = document.getElementById("foodDropdown").value;
        if (foodName && foodData[foodName]) {
            selectedFoods.push(foodName);
            updateSelectedFoods();
            updateTotals();
        }
    });

    function updateSelectedFoods() {
        const list = document.getElementById("selectedFoods");
        list.innerHTML = "";
        selectedFoods.forEach((food, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = food;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function () {
                selectedFoods.splice(index, 1);
                updateSelectedFoods();
                updateTotals();
            });
            listItem.appendChild(removeButton);
            list.appendChild(listItem);
        });
    }

    function updateTotals() {
        let totalCalories = 0;
        let totalMacros = { Protein: 0, Carbs: 0, Sugar: 0, Fat: 0 };

        selectedFoods.forEach(food => {
            if (foodData[food]) {
                totalCalories += parseFloat(foodData[food]["Calories"]) || 0;
                totalMacros.Protein += parseFloat(foodData[food]["Protein"]) || 0;
                totalMacros.Carbs += parseFloat(foodData[food]["Total Carbohydrate"]) || 0;
                totalMacros.Sugar += parseFloat(foodData[food]["Sugars"]) || 0;
                totalMacros.Fat += parseFloat(foodData[food]["Total Fat"]) || 0;
            }
        });

        document.getElementById("totalCalories").textContent = `Total Calories: ${totalCalories} kcal`;
        document.getElementById("totalMacros").textContent = `Protein: ${totalMacros.Protein}g | Carbs: ${totalMacros.Carbs}g | Sugar: ${totalMacros.Sugar}g | Fat: ${totalMacros.Fat}g`;
    }
});

// document.addEventListener("DOMContentLoaded", function () {
//     let foodData = [];
//     let selectedFoods = [];

//     fetch("cleaned_nutrition_facts.csv")
//         .then(response => response.text())
//         .then(csvData => {
//             foodData = parseCSV(csvData);
//             populateDropdown(foodData);
//         });

//     function parseCSV(csv) {
//         const rows = csv.split("\n").map(row => row.split(","));
//         const headers = rows[0];
//         return rows.slice(1).map(row => {
//             let obj = {};
//             headers.forEach((header, index) => {
//                 obj[header.trim()] = row[index].trim();
//             });
//             return obj;
//         });
//     }

//     function populateDropdown(data) {
//         const dropdown = document.getElementById("foodDropdown");
//         data.forEach(item => {
//             let option = document.createElement("option");
//             option.value = item["Dish Name"];
//             option.textContent = item["Dish Name"];
//             dropdown.appendChild(option);
//         });
//     }

//     document.getElementById("addFood").addEventListener("click", function () {
//         const dropdown = document.getElementById("foodDropdown");
//         const selectedDish = dropdown.value;
//         const foodItem = foodData.find(item => item["Dish Name"] === selectedDish);
//         if (foodItem) {
//             selectedFoods.push({ ...foodItem, servings: 1 });
//             updateDisplay();
//         }
//     });

//     function updateDisplay() {
//         const foodList = document.getElementById("selectedFoods");
//         const totalCalories = document.getElementById("totalCalories");
//         const totalMacros = document.getElementById("totalMacros");
//         foodList.innerHTML = "";
//         let calorieSum = 0;
//         let macroSums = { Protein: 0, Carbs: 0, Sugar: 0, Fat: 0 };

//         selectedFoods.forEach((food, index) => {
//             let listItem = document.createElement("li");
//             listItem.innerHTML = `${food["Dish Name"]} - ${food.Calories} kcal x ${food.servings}
//                 <button onclick="removeFood(${index})">Remove</button>
//                 <input type='number' min='1' value='${food.servings}' onchange='updateServings(${index}, this.value)'>`;
//             foodList.appendChild(listItem);
            
//             calorieSum += parseFloat(food.Calories) * food.servings;
//             macroSums.Protein += parseFloat(food.Protein) * food.servings;
//             macroSums.Carbs += parseFloat(food.Carbs) * food.servings;
//             macroSums.Sugar += parseFloat(food.Sugar) * food.servings;
//             macroSums.Fat += parseFloat(food.Fat) * food.servings;
//         });
        
//         totalCalories.textContent = `Total Calories: ${calorieSum.toFixed(2)} kcal`;
//         totalMacros.innerHTML = `Protein: ${macroSums.Protein.toFixed(2)}g | Carbs: ${macroSums.Carbs.toFixed(2)}g | Sugar: ${macroSums.Sugar.toFixed(2)}g | Fat: ${macroSums.Fat.toFixed(2)}g`;
//     }

//     window.removeFood = function (index) {
//         selectedFoods.splice(index, 1);
//         updateDisplay();
//     }

//     window.updateServings = function (index, value) {
//         selectedFoods[index].servings = parseInt(value);
//         updateDisplay();
//     }
// });


// let foodData = [];
// let selectedFoods = [];

// document.getElementById('csvFileInput').addEventListener('change', function (event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function (e) {
//         const text = e.target.result;
//         foodData = parseCSV(text);
//         populateFoodDropdown();
//     };

//     reader.readAsText(file);
// });

// function parseCSV(text) {
//     const lines = text.split('\n');
//     const result = [];
//     const headers = lines[0].split(',');

//     for (let i = 1; i < lines.length; i++) {
//         const obj = {};
//         const currentLine = lines[i].split(',');

//         for (let j = 0; j < headers.length; j++) {
//             obj[headers[j]] = currentLine[j];
//         }
//         result.push(obj);
//     }
//     return result;
// }

// function populateFoodDropdown() {
//     const dropdown = document.getElementById('foodDropdown');
//     dropdown.innerHTML = '';
//     foodData.forEach((food, index) => {
//         const option = document.createElement('option');
//         option.value = index;
//         option.text = food['Dish Name'];
//         dropdown.appendChild(option);
//     });
//     document.getElementById('addFoodButton').disabled = false;
// }

// function addFoodToSelection() {
//     const dropdown = document.getElementById('foodDropdown');
//     const servingsInput = document.getElementById('servingsInput');
//     const selectedIndex = dropdown.value;
//     const servings = servingsInput.value;
//     const selectedFood = foodData[selectedIndex];
//     selectedFood.servings = servings;
//     selectedFoods.push(selectedFood);
//     displaySelectedFoods();
//     calculateTotalMacros();
// }

// function displaySelectedFoods() {
//     const container = document.getElementById('selectedFoods');
//     container.innerHTML = '<h3>Selected Foods</h3>';
//     selectedFoods.forEach((food, index) => {
//         container.innerHTML += `<p>${food['Dish Name']} (x${food.servings}) - Calories: ${food['Calories']}, Protein: ${food['Protein']}, Carbs: ${food['Total Carbohydrate']}, Fat: ${food['Total Fat']}</p>`;
//     });
// }

// function calculateTotalMacros() {
//     let totalCalories = 0;
//     let totalProtein = 0;
//     let totalCarbs = 0;
//     let totalFat = 0;

//     selectedFoods.forEach(food => {
//         const servings = parseInt(food.servings);
//         totalCalories += parseFloat(food['Calories']) * servings;
//         totalProtein += parseFloat(food['Protein']) * servings;
//         totalCarbs += parseFloat(food['Total Carbohydrate']) * servings;
//         totalFat += parseFloat(food['Total Fat']) * servings;
//     });

//     const results = document.getElementById('results');
//     results.innerHTML = `
//         <h3>Total Macros</h3>
//         <p>Calories: ${totalCalories.toFixed(2)}</p>
//         <p>Protein: ${totalProtein.toFixed(2)}g</p>
//         <p>Carbs: ${totalCarbs.toFixed(2)}g</p>
//         <p>Fat: ${totalFat.toFixed(2)}g</p>
//     `;
// }
