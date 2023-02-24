/* eslint-disable indent */

'use strict';

console.log('>> Ready :)');

//VARIABLES
const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const CocktailsList = document.querySelector('.js-ul-cocktails');
const cocktailsListFav = document.querySelector('.js-list-favorites');
let cocktails = [];
let favoritesCocktails = [];


//FUNCIONES PARA PINTAR

//Pintar la lista de cocteles
function renderCocktailList() {
    CocktailsList.innerHTML = "";
    for (const cocktail of cocktails) {
        CocktailsList.innerHTML += renderCocktail(cocktail);
    }
    addEventToList();
}
//Pintar la lista de favoritos
function renderFavoriteList() {
    cocktailsListFav.innerHTML = "";
    for (const cocktail of favoritesCocktails) {
        cocktailsListFav.innerHTML += renderCocktail(cocktail);
    }
}
//Pintar un elemento de la lista
function renderCocktail(cocktail) {
    //poner imagen por defecto cuando el coctel no tenga datos en image
    if (cocktail.image === "") {
        cocktail.image = "./assets/images/drink.jpg";
    }
    let html = `<li class="js-li-cocktail" id=${cocktail.id} >
        <article >
        <h2>${cocktail.name}</h3>
        <img src=${cocktail.image}>
        </article> 
        </li> `;
    return html;
}
//Pintar los elementos guardados en localStorage
renderSaveFavorites();
function renderSaveFavorites() {
   const saveCocktails = JSON.parse(localStorage.getItem('favCocktails'));
    for (const cocktail of saveCocktails) {
        cocktailsListFav.innerHTML += renderCocktail(cocktail);
    }
}


//FUNCIONES GENERALES

//Función para que aparezcan cocteles margarita al cargar la página, petición al servidor
getCocktails();
function getCocktails() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then((response) => response.json())
    .then((data) => {
        cocktails = data.drinks.map((drinks) => ({
            name: drinks.strDrink,
            image: drinks.strDrinkThumb,
            id: drinks.idDrink,
        }));
        renderCocktailList();
});
}


//Función manejadora del evento del boton de buscar, petición al servidor
function handleClickSearch(ev) {
    ev.preventDefault();
    const inputSearchValue = inputSearch.value;
    if (inputSearchValue === "") {
        getCocktails();
    } else {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearchValue}`)
        .then((response) => response.json())
        .then((data) => {
            cocktails = data.drinks.map((drinks) => ({
                name: drinks.strDrink,
                image:  drinks.strDrinkThumb,
                id: drinks.idDrink,
            }));
        console.log(cocktails);
        renderCocktailList();
        });
        
    } 
}

//Función manejadora del evento de los li de la lista para que se seleccionen y se añadan a la lista de favoritos
function handleClick(ev) {
    console.log('he hecho click');
    ev.currentTarget.classList.toggle('selected');
    //busco por id en la lista de cocteles los que están seleccionados y los guardo en una variable
    const idSelected = ev.currentTarget.id;
    const cocktailSelected = cocktails.find(cocktail => cocktail.id === idSelected);
    //Busca la posicion donde está el coctel en la lista de favoritos
    const indexCocktail = favoritesCocktails.findIndex(cocktail => cocktail.id === idSelected);
    //compruebo si ya está en favoritos, si no está nos devuelve -1
    if (indexCocktail === -1) {
        favoritesCocktails.push(cocktailSelected);
    } else {
        favoritesCocktails.splice(indexCocktail, 1);

    }
    //Guardar los favoritos en localStorage
    localStorage.setItem("favCocktails", JSON.stringify(favoritesCocktails));
    renderFavoriteList();

}

// EVENTOS

//Funcion para escuchar los eventos en cada li de la lista
function addEventToList() {
    const liElements = document.querySelectorAll('.js-li-cocktail');
    for (const li of liElements) {
        li.addEventListener('click', handleClick);
    }
}

//Evento para el boton de bsucar
btnSearch.addEventListener('click', handleClickSearch);



