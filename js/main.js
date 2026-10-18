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