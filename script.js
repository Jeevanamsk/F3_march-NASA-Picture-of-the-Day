// NASA API key
const apiKey = 'N17EgGhp0A8u5CZ7BbBHcXjOMpuPVTAFYRlTge4U';

// DOM elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

// Save searches to local storage
let searches = JSON.parse(localStorage.getItem("searches")) || [];

// Function to fetch image data from NASA API
async function getImageData(date) {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

// Function to display image in UI
function displayImage(imageData) {
  // Clear previous image if any
  currentImageContainer.innerHTML = "";

  // Create new image element
  const image = document.createElement("img");
  image.src = imageData.url;
  image.alt = imageData.title;
  image.style.paddingLeft= '500px';
  image.style.display = 'block';
  image.style.width = '1500px';
  image.style.height = '700px';


  // Create image title element
  const title = document.createElement("h2");
  title.textContent = imageData.title;
  title.style.fontSize='40px';

  // Create image explanation element
  const explanation = document.createElement("p");
  explanation.textContent = imageData.explanation;
  explanation.style.fontSize='20px';

  // Append elements to container
  currentImageContainer.appendChild(image);
  currentImageContainer.appendChild(title);
  currentImageContainer.appendChild(explanation);
}

// Function to fetch and display current image of the day
async function getCurrentImageOfTheDay() {
  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  // Fetch image data for current date
  const imageData = await getImageData(currentDate);

  // Display image in UI
  displayImage(imageData);
}

// Function to fetch and display image for selected date
async function getImageOfTheDay(date) {
  // Fetch image data for selected date
  const imageData = await getImageData(date);

  // Save date to local storage
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));

  // Add search to search history UI
  addSearchToHistory(date);

  // Display image in UI
  displayImage(imageData);
}

// Function to save search to local storage
function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to add search to search history UI
function addSearchToHistory(date) {
  // Clear previous search history
  searchHistory.innerHTML = "";

  // Add each search to search history UI
  searches.forEach((search) => {
    const listItem = document.createElement("li");
    listItem.textContent = search;
    searchHistory.appendChild(listItem);

    // Add click event listener to search history item
    listItem.addEventListener("click", () => {
      getImageOfTheDay(search);
    });
  });
}

// Event listener for search form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
});

// Display current image of the day when page loads
getCurrentImageOfTheDay();

//remove history on page and local storage
// function clearSearchHistory() {
//     // remove from UI
//     const historyList = document.querySelector('#search-history ul');
//     historyList.innerHTML = '';
  
//     // remove from local storage
//     localStorage.removeItem('searches');
//   }
  
//   clearSearchHistory();