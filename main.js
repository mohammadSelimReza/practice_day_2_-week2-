const loadData = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((json) => displayData(json.meals));
};

const loadDetail = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((json) => showDetail(json.meals[0]));
};

const showDetail = (meal) => {
  const selected = document.getElementById("selected-food");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-title">${meal.strTags}</p>
    <p class="card-text">${meal.strCategory}</p>
    <p class="card-text">${meal.strArea}</p>
    
  </div>
</div>
  `;
  selected.appendChild(div);
};

const displayData = (meals) => {
  if (!meals) {
    const foodContainer = document.getElementById("food-container");
    const div = document.createElement("div");
    div.innerHTML = `<h1 class="text-center">No Food Available</h1>`;
    foodContainer.appendChild(div);
    return;
  }
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  for (const meal of meals) {
    const div = document.createElement("div");
    div.classList.add("card-style");
    div.innerHTML = `
          <div class="card" style="width: 18rem;">
          <img src=${meal.strMealThumb} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strCategory}</p>
            <div class="d-flex justify-content-between">
            <a href="#" onclick="loadDetail(${meal.idMeal})" class="btn btn-primary">Details</a>
            <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
          </div>
        </div>
          `;
    foodContainer.appendChild(div);
  }
};

document.getElementById("inputButton").addEventListener("click", (e) => {
  e.preventDefault();
  const inputFood = document.getElementById("foodName").value.trim();
  loadData(inputFood);
  document.getElementById("foodName").value = "";
});
