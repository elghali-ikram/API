const Category = document.getElementById("Category");
const Area = document.getElementById("Area")
const Search_btn1 = document.querySelector("#search #btn-Search1")
const card = document.getElementById("card_search")
const paginate_numbers=document.getElementById("paginatenumbers")
let out = ""
let stat
window.addEventListener("load",function () {
  Getcategory()
  Getarea() 
  
})
async function searchrecette()
{
  console.log("dkhels");
  if(Category.value=="Lamb" || Area.value=="Moroccan")
  {
    let arrayc = []
    let arraya = []
    let arraresult=[]
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`)
    const recette = await response.json()
    recette.meals.forEach(element => {
        arrayc.push(element.idMeal)
    });
    console.log(arrayc);
    const response1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan`)
    const recette1 = await response1.json()
    recette1.meals.forEach(element => {
        arraya.push(element.idMeal)
    });
    console.log(arraya);
    let intersection = arrayc.filter(function (e) {
        return arraya.indexOf(e) > -1;
    });
    console.log(intersection);
    for (let i = 0; i < intersection.length; i++) {
        const mealrespo = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${intersection[i]}`)
        const respo = await mealrespo.json()
        arraresult.push(respo.meals[0])
    }
    stat = {
      'queryset': arraresult,
      'page': 1,
      'rows': 1,    
    }
    if(arraresult.length==0)
    {
      card.innerHTML = ""
    }
    else
    {
      card.innerHTML = ""
      let datastate= pagination1(stat.queryset,stat.page,stat.rows)
      for (let i = 0; i < datastate.queryset.length; i++) {
        creatsearch(datastate.queryset[i])
      }
      page1buttons()
    }

  }

}

async function Getcategory() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    const recette = await response.json()
    for (let i = 0; i < recette.meals.length; i++) {
        if (recette.meals[i].strCategory === "Lamb") {
            Category.innerHTML += `<option value="${recette.meals[i].strCategory}" selected>${recette.meals[i].strCategory}</option> `
        }
        else {
            Category.innerHTML += `<option value="${recette.meals[i].strCategory}">${recette.meals[i].strCategory}</option> `
        }
    }
}
async function Getarea() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const recette = await response.json()
    for (let i = 0; i < recette.meals.length; i++) {
        if (recette.meals[i].strArea === "Moroccan") {
            Area.innerHTML += `<option value="${recette.meals[i].strArea}" selected>${recette.meals[i].strArea}</option> `
        }
        else {
            Area.innerHTML += `<option value="${recette.meals[i].strArea}">${recette.meals[i].strArea}</option> `
        }
    }
}
function creatsearch(objet) {
    out += `
          <div class="card text-bg-dark shadow-lg mb-5 bg-body rounded" onclick="Getinfo(${objet.idMeal})"  style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <img src="${objet.strMealThumb}" class="card-img" alt="...">
          <div class="card-img-overlay">
            <h5 class="card-title">${objet.strMeal} </h5>
          </div>
        </div> `
    card.innerHTML = out
}
Search_btn1.addEventListener("click", async function search() {
  paginate_numbers.innerHTML = ""
    out=""
    let category = Category.value;
    let area = Area.value
    let arrayc = []
    let arraya = []
    let arraresult=[]
    let intersection = arrayc.filter(function (e) {
      return arraya.indexOf(e) > -1;
    });
    console.log(intersection);
    if(category=="All Category")
    {
      const response1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      const recette1 = await response1.json()
      recette1.meals.forEach(element => {
          arraya.push(element.idMeal)
      });
      console.log(arraya);
      for (let i = 0; i < arraya.length; i++) {
          const mealrespo = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arraya[i]}`)
          const respo = await mealrespo.json()
          arraresult.push(respo.meals[0])
      }
      stat = {
        'queryset': arraresult,
        'page': 1,
        'rows': 1,    
      }
      if(arraresult.length==0)
      {
        card.innerHTML = ""
      }
      else
      {
        card.innerHTML = ""
        let datastate= pagination1(stat.queryset,stat.page,stat.rows)
        for (let i = 0; i < datastate.queryset.length; i++) {
          creatsearch(datastate.queryset[i])
        }
        page1buttons()
      }
      console.log(arraresult);

    }
    else if(area=="All Area")
    {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      const recette = await response.json()
      recette.meals.forEach(element => {
          arrayc.push(element.idMeal)
      });
      console.log(arrayc);
      for (let i = 0; i < arrayc.length; i++) {
          const mealrespo = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arrayc[i]}`)
          const respo = await mealrespo.json()
          arraresult.push(respo.meals[0])
      }
      stat = {
        'queryset': arraresult,
        'page': 1,
        'rows': 1,    
      }
      if(arraresult.length==0)
      {
        card.innerHTML = ""
      }
      else
      {
        card.innerHTML = ""
        let datastate= pagination1(stat.queryset,stat.page,stat.rows)
        for (let i = 0; i < datastate.queryset.length; i++) {
          creatsearch(datastate.queryset[i])
        }
        page1buttons()
      }
      console.log(arraresult);

    }
    else
    {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      const recette = await response.json()
      recette.meals.forEach(element => {
          arrayc.push(element.idMeal)
      });
      console.log(arrayc);
      const response1 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      const recette1 = await response1.json()
      recette1.meals.forEach(element => {
          arraya.push(element.idMeal)
      });
      console.log(arraya);
      let intersection = arrayc.filter(function (e) {
          return arraya.indexOf(e) > -1;
      });
      console.log(intersection);
      for (let i = 0; i < intersection.length; i++) {
          const mealrespo = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${intersection[i]}`)
          const respo = await mealrespo.json()
          arraresult.push(respo.meals[0])
      }
      stat = {
        'queryset': arraresult,
        'page': 1,
        'rows': 1,    
      }
      if(arraresult.length==0)
      {
        card.innerHTML = ""
      }
      else
      {
        card.innerHTML = ""
        let datastate= pagination1(stat.queryset,stat.page,stat.rows)
        for (let i = 0; i < datastate.queryset.length; i++) {
          creatsearch(datastate.queryset[i])
        }
        page1buttons()
      }
      console.log(arraresult);

    }

})
//function for pagination
function pagination1(queryset, page, rows) {
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
  function page1buttons() {
    let databtn = pagination1(stat.queryset, stat.page, stat.rows);
    console.log(databtn);
    let prev_Btn= `<li class="page-item"><a class="page-link text-black" >&laquo;</a></li>`
    let next_Btn= `<li class="page-item"><a class="page-link text-black" >&raquo;</a></li>`
    let paginate=""
    for (let i = 1; i <= databtn.pages; i++) {
      paginate += `<li class="page-item"><a class="page-link text-black" >${i}</a></li>`
    }
    paginate_numbers.innerHTML=`${prev_Btn} ${paginate} ${next_Btn}`
    let btn_pagination = paginate_numbers.querySelectorAll('.page-item')
    for (let i = 0; i < btn_pagination.length; i++) {
      btn_pagination[i].addEventListener("click", function () {
        out=""
        if(i==0)
        { 
          stat.page--
          if(stat.page<1)
          {
            stat.page=1
          }
        }else if(i==btn_pagination.length-1)
        {
          stat.page++
        }
        else
        {
            stat.page = Number(btn_pagination[i].innerText)
        }
        btn_pagination.forEach(element => {
                element.classList.remove("active")
        });
        btn_pagination[i].classList.add("active");
        let data = pagination1(stat.queryset, stat.page, stat.rows);
        console.log(data);
        for (let i = 0; i < data.queryset.length; i++) {
          creatsearch(data.queryset[i])
        }  
      });
    }
  }

