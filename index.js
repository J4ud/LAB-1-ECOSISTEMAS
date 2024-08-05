document.getElementById("fetch-button").addEventListener("click", fetchData);
document.getElementById("fetch-fact").addEventListener("click", fetchFact);
document.getElementById("searchbton").addEventListener("click", fetchAnime);
document.getElementById("clear").addEventListener("click", clear);

//ANIME FETCH
async function fetchAnime() {
  const limit = document.getElementById('limit').value || 1; // Default to 1 if no value
  const nameFilter = document.getElementById('search').value.toLowerCase(); // Get name input and convert to lowercase
  const typeFilter = document.getElementById('type').value; // Get type input
  const resultsContainer = document.getElementById('results-container');

  const url = `https://api.jikan.moe/v4/anime?q=${nameFilter}&type=${typeFilter}&limit=${limit}`;

  renderLoadingState();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.data.length === 0) {
      resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    } else {
      renderAnime(data.data);
    }
  } catch (error) {
    renderError2(error);
  }
}

function renderAnime(data) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = ''; // Clear previous data

  data.forEach(anime => {
    const animeContainer = document.createElement('div');
    animeContainer.classList.add('anime-container');
    animeContainer.innerHTML = `
      <h1>${anime.title}</h1>
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
    `;
    resultsContainer.appendChild(animeContainer);
  });
}

function clear(){
  document.getElementById('form').reset();
  document.getElementById('results-container').innerHTML = '';
}

function renderError2(error) {
  console.error('Error al buscar el anime:', error);
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `<p class="error">Ocurrió un error al buscar el anime. Revisa la consola para más detalles.</p>`;
}

function renderLoadingState() {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '<p class="loading">Cargando...</p>';
}

// USER FETCH
async function fetchData() {
  renderLoadingState2()
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) throw new Error("Pailaa");
    
    const data = await response.json();
    console.log(data);
    renderData(data);
    
  } catch (error) {
    renderError(error);
  }
}

function renderLoadingState2() {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = '<p class="loading">Cargando...</p>';
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data

  // Extraer la URL de la imagen del primer usuario en los resultados
  const imageUrl = data.results[0].picture.large;

  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<img src="${imageUrl}" alt="Random User Image">`;
  container.appendChild(div);
}

//CAT FACTS

async function fetchFact(){
  renderLoadingState3()
  try {
    const Response = await fetch("https://catfact.ninja/fact")
    if (!Response.ok) throw new Error("Pailaa")
      const data = await Response.json()

    renderFact(data.fact)
    
  } catch (error) {
    renderError
  }
 
}

function renderLoadingState3() {
  const factContainer = document.getElementById('fact-container');
  factContainer.innerHTML = '<p class="loading">Cargando...</p>';
}

function renderFact(fact) {
  const container = document.getElementById("fact-container");
  container.innerHTML = ""; // Clear previous data

  const catFactText = document.createElement("h1");
  catFactText.innerText = fact;

  container.appendChild(catFactText);
}

