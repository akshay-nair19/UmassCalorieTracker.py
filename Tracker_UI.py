import tkinter as tk
from tkinter import messagebox
import csv

class NutrientTracker:
    def __init__(self):
        self.macronutrients = {
            "Protein": 0,
            "Carbohydrates": 0,
            "Fats": 0,
            "Cholesterol": 0
        }
        self.micronutrients = {
            "Vitamin C": 0,
            "Vitamin D": 0,
            "Calcium": 0,
            "Iron": 0,
            "Sodium": 0
        }
        self.total_calories = 0

    def add_food_from_csv(self, csv_file, food_name, servings=1):
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['Name'].strip().lower() == food_name.strip().lower():
                    self.macronutrients["Protein"] += float(row["Protein (g)"]) * servings
                    self.macronutrients["Carbohydrates"] += float(row["Carbohydrates (g)"]) * servings
                    self.macronutrients["Fats"] += float(row["Fats (g)"]) * servings
                    self.macronutrients["Cholesterol"] += float(row["Cholesterol (mg)"]) * servings
                    self.micronutrients["Vitamin C"] += float(row["Vitamin C (mg)"]) * servings
                    self.micronutrients["Vitamin D"] += float(row["Vitamin D (mg)"]) * servings
                    self.micronutrients["Calcium"] += float(row["Calcium (mg)"]) * servings
                    self.micronutrients["Iron"] += float(row["Iron (mg)"]) * servings
                    self.micronutrients["Sodium"] += float(row["Sodium (mg)"]) * servings
                    self.total_calories += float(row["Calories"]) * servings
                    return
            messagebox.showwarning("Food Not Found", f"{food_name} not found in the database.")

    def get_summary(self):
        summary = "Nutrient Summary:\n\nMacronutrients:\n"
        for nutrient, amount in self.macronutrients.items():
            summary += f"  {nutrient}: {amount}g\n"
        summary += "\nMicronutrients:\n"
        for nutrient, amount in self.micronutrients.items():
            summary += f"  {nutrient}: {amount}mg\n"
        summary += f"\nTotal Calories: {self.total_calories} kcal\n"
        return summary


class DietNutrientApp:
    def __init__(self, root, csv_file):
        self.root = root
        self.root.title("Diet and Nutrient Tracker")
        self.tracker = NutrientTracker()
        self.csv_file = csv_file

        # Define diet types and food recommendations
        self.diet_lst = ["Halal", "Local", "Sustainable", "Vegetarian", "Antibiotic_Free", "Plant_Based", "Whole_Grain"]
        self.food_recommendations = {
            "Halal": ["Grilled Chicken", "Rice Pilaf", "Salad"],
            "Local": ["Seasonal Vegetables", "Locally-sourced Beef"],
            "Sustainable": ["Sustainable Salmon", "Organic Spinach"],
            "Vegetarian": ["Pasta Primavera", "Vegetable Stir Fry"],
            "Antibiotic_Free": ["Organic Chicken", "Quinoa Bowl"],
            "Plant_Based": ["Tofu Stir Fry", "Vegan Burrito"],
            "Whole_Grain": ["Whole Wheat Bread", "Brown Rice", "Oatmeal"]
        }

        # Diet selection frame
        self.diet_frame = tk.LabelFrame(root, text="Select Diet Preferences", padx=10, pady=10)
        self.diet_frame.pack(padx=10, pady=10)

        self.diet_vars = {}
        for diet in self.diet_lst:
            var = tk.BooleanVar()
            chk = tk.Checkbutton(self.diet_frame, text=diet, variable=var)
            chk.pack(anchor='w')
            self.diet_vars[diet] = var

        # Buttons
        self.recommend_button = tk.Button(root, text="Get Recommendations", command=self.show_recommendations)
        self.recommend_button.pack(pady=5)

        self.summary_button = tk.Button(root, text="Show Nutrient Summary", command=self.show_summary)
        self.summary_button.pack(pady=5)

        # Display area for recommendations
        self.recommendations_text = tk.Text(root, height=10, width=50, state="disabled")
        self.recommendations_text.pack(pady=10)

    def show_recommendations(self):
        selected_diets = [diet for diet, var in self.diet_vars.items() if var.get()]
        recommended_foods = set()
        for diet in selected_diets:
            if diet in self.food_recommendations:
                recommended_foods.update(self.food_recommendations[diet])

        # Display recommendations
        self.recommendations_text.config(state="normal")
        self.recommendations_text.delete(1.0, tk.END)
        if recommended_foods:
            self.recommendations_text.insert(tk.END, "Recommended Foods:\n")
            for food in recommended_foods:
                self.recommendations_text.insert(tk.END, f"- {food}\n")
                self.recommendations_text.insert(tk.END, f"  Add 1 serving of {food}\n")
        else:
            self.recommendations_text.insert(tk.END, "No recommendations available for selected diets.")
        self.recommendations_text.config(state="disabled")

    def show_summary(self):
        summary = self.tracker.get_summary()
        messagebox.showinfo("Nutrient Summary", summary)

# Load the CSV file and initialize the application
root = tk.Tk()
app = DietNutrientApp(root, 'foods.csv')
root.mainloop()
