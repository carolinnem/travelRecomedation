var resultDiv;
var resultContainer;
indexWindow();
checkForParameters();

function checkForParameters(){
    var query = location.search.substring(1).replace("%20", " ");

    document.getElementById("searchInput").value = query;

    if (document.getElementById("searchInput").value.length) {
        search();
    }
}

function indexWindow(){
    if(window.location.href.toString().includes('travel_recommendation.html')){

        resultDiv = document.getElementById("result");
        resultContainer = document.getElementById("results-container");

        resultDiv.style.display = 'none';
        resultContainer.style.padding = '0px';
    
    }
}
function search() {
    const input= document.getElementById("searchInput").value.trim().toLowerCase();

    if(!window.location.href.toString().includes('travel_recommendation.html')){
        window.open('./travel_recommendation.html?' + input, "_self");
        
    }

    indexWindow();

    document.getElementById("searchInput").value = input;

    resultDiv.style.display = 'block';
    resultContainer.style.padding = '10px';

    resultDiv.innerHTML = '<h1>Search Results:</h1>';

    let destinationResult=[];

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {

        data.countries.forEach((country) => {
            country.cities.forEach((city) => {
            if (city.name.toLowerCase().includes(input) || input === 'country' || input === 'countries' ) 
            {
                destinationResult.push(city);
            }
            });
        });

        data.temples.forEach((temple) => {
            if (temple.name.toLowerCase().includes(input) || input === 'temple' || input === 'temples') 
            {
                destinationResult.push(temple);
            }
        });

        data.beaches.forEach((beach) => {
            if (beach.name.toLowerCase().includes(input) || input === 'beach' || input === 'beaches') 
            {
                destinationResult.push(beach);
            }
        });
        if (destinationResult.length){
            displayResults(destinationResult);

        } else {
          resultDiv.innerHTML += 'Destination not found in the system.<br>Please try again';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML += 'An error occurred while fetching data.';
      });

    if (resultDiv.style.display != 'hidden')  
    {
        resultDiv.scrollIntoView(true);
    }
}

function displayResults(results){
    results.forEach((result) => {
        const resultItem = `
                    <div class="result-item">
                        <div class="result-item-name">${result.name}</div>
                        <img src="images/${result.imageUrl}" alt="${result.name}">
                        <p>${result.description}</p>
                    </div>
        `;

        resultDiv.innerHTML += resultItem;

    });


}
function thankyou() {
    alert('Thank you for contacting us!')
}

function booknow() {
    alert('Please use our Contact Us form for bookings')
}

