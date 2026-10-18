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