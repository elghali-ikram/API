"use strict";
// page home
const cards = document.getElementById("cards-recette")
const input_Search = document.getElementById("input-Search")
const btn_Search = document.querySelector("#home #btn-Search")
const pagination_numbers = document.getElementById("pagination-numbers")
let output = ""
let page = 1
let state
// function for create a card
function creatcard(objet) {
  output += `
        <div class="card text-bg-dark shadow-lg mb-5 bg-body rounded" onclick="Getinfo(${objet.idMeal})"  style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${objet.strMealThumb}" class="card-img" alt="...">
        <div class="card-img-overlay">
          <h5 class="card-title">${objet.strMeal} </h5>
        </div>
      </div> `
  cards.innerHTML = output
}
//  add load to window  for display cards 
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < 6; i++) {
    const address = fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((user) => {
        return user.meals[0];
      });
    const printAddress = async () => {
      const a = await address;
      creatcard(a)
    };
    printAddress();
  }
});
// function for get ingredient and mesure
function getingredient(data) {
  let Arr_ingredient = []
  let Arr_mesure = []
  let list = ""
  for (let i = 1; i < 20; i++) {
    if (data[`strIngredient${i}`] != "") {
      Arr_ingredient.push(data[`strIngredient${i}`])
    }
    else {
      break;
    }
  }
  for (let i = 1; i < 20; i++) {
    if (data[`strMeasure${i}`] != " ") {
      Arr_mesure.push(data[`strMeasure${i}`])
    } else {
      break;
    }
  }
  for (let i = 0; i < Arr_ingredient.length; i++) {
    list += ` <li class="list-group-item">${Arr_ingredient[i]} ${Arr_mesure[i]}</li>    `
  }
  return list
}
// click in card to get informations
async function Getinfo(idcard) {
  let info = ""
  const info_recette = document.getElementById("info_recette")
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idcard}`)
  const recette = await response.json()
  console.log(recette.meals[0]);
  var str = recette.meals[0].strYoutube;
  var res = str.split("=");
  console.log("https://www.youtube.com/embed/" + res[1]);
  info += `
    <div class="modal-header">
    <h5>${recette.meals[0].strMeal}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div  class="modal-body">
    <div class="card" >
      <iframe  height="315" src="${`https://www.youtube.com/embed/${res[1]}`}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <div class="card-body">
        <h5 class="card-title">Préparation</h5>
        <p class="card-text">${recette.meals[0].strInstructions}</p>
        <ol class="list-group-numbered d-flex flex-wrap gap-5">${getingredient(recette.meals[0])}
      </ol>
      </div>
    </div>
  </div>`
  info_recette.innerHTML = info
}
//function for pagination
function pagination(queryset, page, rows) {
  let start = (page - 1) * rows
  let end = start + rows
  let data = queryset.slice(start, end)
  let pages = Math.ceil(queryset.length / rows)
  return {
    'queryset': data,
    'pages': pages
  }
}
// function for add button
function pagebuttons() {
  let databtn = pagination(state.queryset, state.page, state.rows);
  pagination_numbers.innerHTML = ""
  let prev_Btn=  `<li class="page-item"><a class="page-link text-black" >&laquo;</a></li>`
  let next_Btn= `<li class="page-item"><a class="page-link text-black" >&raquo;</a></li>`
  let paginate=""
  for (let i = 1; i <= databtn.pages; i++) {
    paginate += `<li class="page-item"><a class="page-link text-black" >${i}</a></li>`
  }
  pagination_numbers.innerHTML=`${prev_Btn} ${paginate} ${next_Btn}`
  let btn_pagination = pagination_numbers.querySelectorAll('.page-item')
  for (let i = 0; i < btn_pagination.length; i++) {
    btn_pagination[i].addEventListener("click", function () {
      output = ""
      if(i==0)
      { 
        state.page--
        if(state.page<1)
        {
          state.page=1
        }
        
      }else if(i==btn_pagination.length-1)
      {
        state.page++
      }
      else
      {
          state.page = Number(btn_pagination[i].innerText)
      }
      btn_pagination.forEach(element => {
              element.classList.remove("active")
      });
      btn_pagination[i].classList.add("active");
      let data = pagination(state.queryset, state.page, state.rows);
      for (let i = 0; i < data.queryset.length; i++) {
        creatcard(data.queryset[i])
      }   

   
    });
  }
}
//search
btn_Search.addEventListener("click", async function () {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input_Search.value}`)
  const recette = await response.json()
  cards.innerHTML = ""
  output = ""
  state = {
    'queryset': recette.meals,
    'page': 1,
    'rows': 6,    
  }
  if (recette.meals) {
    let array = pagination(state.queryset, state.page, state.rows);
    for (let i = 0; i < array.queryset.length; i++) {
      creatcard(array.queryset[i]);
    }
    pagebuttons()
  }
  else {
    console.log("makynch")
  }
})
