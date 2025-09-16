      // Hide loader after load
      window.addEventListener("load", () => {
        setTimeout(() => {
          document.getElementById("loading").style.display = "none";
        }, 1200);
      });


const rowBody = document.getElementById('rowBody');
const btns = document.querySelectorAll(".nav-link"); 
const loading = document.getElementById('loading');

async function getMeals(mealName = 'pizza') {
    
    rowBody.innerHTML = ''; 
    try {
        let data = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${mealName}`);
        let meals = await data.json();   
        let mealsArray = meals.recipes;
        loading.classList.remove('d-none'); // show loader
        display(mealsArray);
    } catch (err) {
        rowBody.innerHTML = `<p class="text-danger text-center">Error loading meals</p>`;
    } finally {
        loading.classList.add('d-none'); // hide loader
    }
}

function display(arr) {
  let box = '';
  for (let i = 0; i < arr.length; i++) {
    box += ` 
      <div class="col-md-3 col-sm-6 d-flex">
        <div class="card food-card w-100 shadow-sm">
          <img src="${arr[i].image_url}" class="card-img-top" alt="meal" />
          <div class="card-body">
            <p class="card-text fw-semibold mb-2">
              ${arr[i].title}
            </p>
            <a href="#" class="btn btn-warning">Order Now</a>
          </div>
        </div>
      </div>`;
  }
  rowBody.innerHTML = box;
}


// load default meals
getMeals();

// handle clicks from nav + tabs
btns.forEach(btn => {
  btn.addEventListener('click', function(e){
    e.preventDefault();
    let mealName = e.target.innerHTML.trim();
    
    // change active state
    btns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    getMeals(mealName);
  });
});
