/* eslint-disable indent */

'use strict';

console.log('>> Ready :)');

//Variables
const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const CocktailsList = document.querySelector('.js-list-cocktails');
let cocktails = [];



//Función para pintar la lista de cocteles
function renderCocktailList() {
    CocktailsList.innerHTML = "";
    for (const cocktail of cocktails){
        //Creamos los elementos
        const liCocktail = document.createElement('li');
        const articleCocktail = document.createElement('article');
        const h2Cocktail = document.createElement('h2');
        const imgCocktail = document.createElement('img');
        //Creamos los nodos
        const CocktailName = document.createTextNode(cocktail.name);
        //Creamos los atributos
        imgCocktail.setAttribute('src', cocktail.image);
        //Asignamos los padres a los elementos creados
        h2Cocktail.appendChild(CocktailName);
        articleCocktail.appendChild(h2Cocktail);
        articleCocktail.appendChild(imgCocktail);
        liCocktail.appendChild(articleCocktail);
        CocktailsList.appendChild(liCocktail);
    }
}


//Función para que aparezcan cocteles al cargar la página
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then((response) => response.json())
    .then((data) => {
        cocktails = data.drinks.map((drinks) => ({
            name: drinks.strDrink,
            image: drinks.strDrinkThumb,
        }));
        renderCocktailList();
});

//Función manejadora del evento del boton de buscar
function handleClickSearch() {
    const inputSearchValue = inputSearch.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearchValue}`)
        .then((response) => response.json())
        .then((data) => {
            cocktails = data.drinks.map((drinks) => ({
                name: drinks.strDrink,
                image: drinks.strDrinkThumb,
            }));
            console.log(cocktails);
            renderCocktailList();
        });
}


//Evento para el boton de bsucar
btnSearch.addEventListener('click', handleClickSearch);