"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Loic Leroy
 */
// Hämta element från DOM
const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");

const errorElement = document.querySelector("#error");
const messageElement = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");

// Basadress för DummyJSON:s recept-API
const API_URL = "https://dummyjson.com/recipes/search?q=";

/**
 * Validerar sökformuläret.
 * @returns {boolean} true om sökfrasen är giltig, annars false
 */
function validateSearchForm() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        errorElement.textContent = "Du måste ange en sökfras.";
        return false;
    }

    // Rensa eventuellt gammalt felmeddelande om fältet nu är ifyllt
    errorElement.textContent = "";
    return true;
}
/**
 * Hämtar recept från DummyJSON baserat på en sökfras.
 * @param {string} searchTerm
 * @returns {Promise<Object|null>} det första receptet, eller null om inget hittades
 */
async function fetchRecipe(searchTerm) {
    try {
        const response = await fetch(API_URL + encodeURIComponent(searchTerm));

        // Kontrollera att svaret faktiskt var lyckat innan vi använder datan
        if (!response.ok) {
            throw new Error(`Serverfel: ${response.status}`);
        }

        const data = await response.json();

        // data.recipes är arrayen med recept som API:t returnerar
        if (data.recipes.length === 0) {
            return null;
        }

        return data.recipes[0];

    } catch (error) {
        // Skriv ut tekniska detaljer i konsolen för felsökning
        console.error("Fel vid hämtning av recept:", error);
        throw error;
    }
}
/**
 * Skapar och visar ett recept i DOM.
 * @param {Object} recipe - receptobjekt från API:t
 */
function displayRecipe(recipe) {
    // Rensa ett eventuellt tidigare recept innan det nya skapas
    recipeSection.innerHTML = "";

    const article = document.createElement("article");

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    // Grundläggande info om receptet
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("recipe-info");
    infoDiv.innerHTML = `
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Prep time:</strong> ${recipe.prepTimeMinutes} minutes</p>
        <p><strong>Cooking time:</strong> ${recipe.cookTimeMinutes} minutes</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
    `;

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(infoDiv);

    recipeSection.appendChild(article);
}
fetchRecipe("pasta").then(recipe => displayRecipe(recipe));