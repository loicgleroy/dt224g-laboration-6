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

