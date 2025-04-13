// Get elements
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

// Get all elements with the class 'card'
const cards = document.querySelectorAll(".card");


// Add a click event listener to each card
cards.forEach(card => {

    card.addEventListener("click", () => {
        // Get the name of the clicked card (assuming the card has a 'name' attribute)
        const cardName = card.getAttribute("name");
        

        if (!cardName) {
            alert("Card does not have a name attribute.");
            return;
        }
        
        // Define the dynamic URL for the JSON file based on the card name
        const jsonFilePath = `/restaurant pics/${cardName}/info.json`;
        
        
        // Cover for the sidebar
        const coverImageSrc = `/restaurant pics/${cardName}/photos/cover.png`;
        
        // Fetch the data from the dynamically generated JSON file
        fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON for ${cardName}`);
            }
            return response.json();
        })
        .then(restaurantInfo => {

            // Get the sidebar elements
            const sidebarCoverImage = document.getElementById("sidebarImage");
            const sidebarName = document.getElementById("sidebarName");
            const sidebarDescription = document.getElementById("sidebarDescription");
            const sidebarAddress = document.getElementById("sidebarAddress");
            const sidebarStatus = document.getElementById("sidebarStatus");
            const sidebarPhone = document.getElementById("sidebarPhone");
            const sidebarPriceRange = document.getElementById("sidebarPriceRange");
            
            // Update the sidebar content
            sidebarCoverImage.src = coverImageSrc;
            sidebarName.textContent = restaurantInfo.name;
            sidebarDescription.textContent = restaurantInfo.description;
            sidebarAddress.innerHTML = `<b>Address:</b> ${restaurantInfo.address}`;
            sidebarStatus.innerHTML = `<b>Status:</b> ${restaurantInfo.status}`;
            sidebarPhone.innerHTML = `<b>Phone:</b> ${restaurantInfo.phone}`;
            sidebarPriceRange.innerHTML = `<b>Price:</b> ${restaurantInfo.priceRange}`;

            // Open the sidebar
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.add("open");
        })
        .catch(error => {
            console.error("Error loading the JSON file:", error);
        });
        
        // Images for the sidebar
        const sidebarImgPath = `/restaurant pics/${cardName}/photos/`;
        
        // PUT THE IMAGES HERE
        const sidebarImg1 = sidebarImgPath + "1.png";
        const sidebarImg2 = sidebarImgPath + "2.png";
        const sidebarImg3 = sidebarImgPath + "3.png";
        
        // Get the image elements by their IDs
        const sidebarImage1 = document.getElementById("sidebar-img1");
        const sidebarImage2 = document.getElementById("sidebar-img2");
        const sidebarImage3 = document.getElementById("sidebar-img3");
        
        // Set the src attribute of each image dynamically
        sidebarImage1.src = sidebarImg1;
        sidebarImage2.src = sidebarImg2;
        sidebarImage3.src = sidebarImg3;
    });
});

closeSidebar.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("open");
});


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const sidebar = document.getElementById("sidebar");
        if (sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
        }
    }
});


// MAKE A FUNCTION THAT CHANGES THE 'price-range' in the .card, using the name of the card
//  and putting it in restaurants/NAME/info.json and get the priceRange and put it on the <p id="price-range">HERE</p>
// Iterate over all the cards
cards.forEach(card => {
    // Get the name of the card (assuming it has a 'name' attribute)
    const cardName = card.getAttribute("name");
    if (!cardName) {
        console.warn("Card does not have a name attribute.");
        return;
    }
    
    const jsonFilePath = `/restaurant pics/${cardName}/info.json`;
   
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON for ${cardName}`);
            }
            return response.json();
        })
        .then(restaurantInfo => {
            // Update the price-range dynamically
            // Ensure the card has an element with this ID
            const cardPriceRange = card.querySelector("#price-range");
            if (cardPriceRange) {
                cardPriceRange.innerHTML = `${restaurantInfo.priceRange}`;
            }
        })
        .catch(error => {
            console.error(`Error fetching JSON for ${cardName}:`, error);
        });
});

// FOR NAVBAR
// Get the card-container from the document
const cardContainer = document.querySelector(".card-container");

let allCards = [];  // Store all the cards globally
allCards = Array.from(cardContainer.children);

function filtered(elementId)
{
    // Get the filtered cards based on the selector
    const filteredCards = allCards.filter(card => card.matches(`${elementId}`));
    // Clear the cards
    cardContainer.innerHTML = "";

    // Put only the filtered cards back to the container
    filteredCards.forEach(div => {
        cardContainer.appendChild(div); // Append each filtered card
    });
}

// Select the <a> element by its ID
const AllNav        = document.querySelector("#All");
AllNav.style.fontWeight = "bold"; // set AllNav to bold as default
const RestaurantNav = document.querySelector("#Restaurants");
const StudyHubNav   = document.querySelector("#Study-Hubs");
const CafeNav       = document.querySelector("#Cafes");

// Make the selected <a> to bold and all to be normal
function makeItBoldLmao(element) {
    AllNav.style.fontWeight         = "normal";
    RestaurantNav.style.fontWeight  = "normal";
    StudyHubNav.style.fontWeight    = "normal";
    CafeNav.style.fontWeight        = "normal";

    element.style.fontWeight        = "bold";  // Make the clicked element to bold
}

// Add an event listener for the 'click' event for All
AllNav.addEventListener("click", (event) => {
    makeItBoldLmao(AllNav);
    event.preventDefault(); 
    // alert("Show All");
    filtered('*'); 
});

// Shows only restaurant
RestaurantNav.addEventListener("click", (event) => {
    makeItBoldLmao(RestaurantNav);
    event.preventDefault(); 
    filtered('#Restaurant');
});

// Shows only study hub
StudyHubNav.addEventListener("click", (event) => {
    makeItBoldLmao(StudyHubNav);
    event.preventDefault(); 
    filtered('#Study-Hub');
});

// Shows only cafe
CafeNav.addEventListener("click", (event) => {
    makeItBoldLmao(CafeNav);
    event.preventDefault(); 
    filtered('#Cafe');
});


// Google Map Links for the Respective Locations 
const locations = {
    "Kanto Kamayan": "https://maps.app.goo.gl/XdC4XSriE8hPwfwV7",
    "AFC": "https://maps.app.goo.gl/iiobxLHApztjw4VD8",
    "Jaokiks": "https://maps.app.goo.gl/vLHsUxy5Lh8ya9n88",
    "Prado's Kitchenette - Tatay Ben Kitchenette": "https://maps.app.goo.gl/nZaqd8mxdeyZCjBd8",
    "Chowking Mintal Drive-Thru": "https://maps.app.goo.gl/iBtwVXQkyMbvnA5Z7",
    "Break Time": "https://maps.app.goo.gl/dB1THLH4QBN3optD6",
    "Lida's Restaurant": "https://maps.app.goo.gl/22JbDQi3bC3pRByD9",
    "Busan Mart - Korean Food Mart": "https://maps.app.goo.gl/iUYUoNrhmXSbLuhm8",
    "Hikaru Cafe": "https://maps.app.goo.gl/HkVeMfkETeHGz5kt5",
    "Craft Cafe": "https://maps.app.goo.gl/yYfAQrykoUzSDHAn6",
    "Matwels Coffee Station": "https://maps.app.goo.gl/efxhpUy6iXQuBKf58",
    "Kapenato": "https://maps.app.goo.gl/EWCgBEprZgZ5zTJz6",
    "Into D' Woods Cafe": "https://maps.app.goo.gl/zNSi3pFmFgUcxX1P6",
    "Hola Coffee": "https://maps.app.goo.gl/1VFcF4tabtKDjwQHA",
    "Upward Coworking + Study Hub": "https://maps.app.goo.gl/JuWSh8Vc9R4Uk51Y7"
};

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('name');
        
        document.getElementById('sidebarName').textContent = name;
        document.getElementById('getDirectionsButton').href = locations[name] || "#";
        document.getElementById('sidebar').style.display = 'block';
    });
});

