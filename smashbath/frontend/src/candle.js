

let currentPage = 1; // Initialize the current page
const pageSize = 4; // Set the page size

// Function to fetch and display data based on the current page
function fetchAndDisplayData(page) {
  // Make the API request with the current page
  fetch(`http://localhost:3090/product/getData?page=${page}`)
    .then((res) => res.json())
    .then((response) => {
      // Clear the current content
      const prodContainer = document.getElementById('prod');
      prodContainer.innerHTML = '';

      // Display the data for the current page
      response.data.forEach((item, i) => {
        
        const itemDiv=document.createElement("div");

        itemDiv.classList.add('product');

        // Create a template for displaying the item's data
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>Rating: ${item.rating}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Fragrance Category: ${item.fragrance_category}</p>
            <p>${item.new_arrival ? 'New Arrival' : ''}</p>
            <p>${item.best_seller ? 'Best seller' : ''}</p>
            <p>Top Rated: ${item.top_rated ? 'Yes' : 'No'}</p>
            <button>Add to cart</button>
        `;


        document.getElementById('prod').appendChild(itemDiv);
      });

      // Update the current page and total pages based on the pageInfo object
      currentPage = response.pageInfo.currentPage;
      const totalPages = response.pageInfo.totalPages;

      // Disable or enable "Previous" and "Next" buttons based on the current page
      const prevPageButton = document.getElementById('prevPage');
      const nextPageButton = document.getElementById('nextPage');

      if (currentPage === 1) {
        prevPageButton.disabled = true;
      } else {
        prevPageButton.disabled = false;
      }

      if (currentPage === totalPages) {
        nextPageButton.disabled = true;
      } else {
        nextPageButton.disabled = false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Event listener for "Previous" button
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    fetchAndDisplayData(currentPage - 1);
  }
});

// Event listener for "Next" button
document.getElementById('nextPage').addEventListener('click', () => {
  fetchAndDisplayData(currentPage + 1);
});

// Initial fetch and display of data for the first page
fetchAndDisplayData(currentPage);


document.getElementById('filterButton').addEventListener('click', () => {
  const fragranceCategory = document.getElementById('fragranceCategory').value;
  const productType = document.getElementById('productType').value;
  const sortBy = document.getElementById('sortBy').value;

  // Make a request to your API route with query parameters
  fetch(`http://localhost:3090/product/filter-and-sort?fragranceCategory=${fragranceCategory}&productType=${productType}&sortBy=${sortBy}`)
    .then((response) => response.json())
    .then((data) => {
      // Update the product list on the frontend
    
     // console.log(data)//

               if(data.length===0){
                 document.getElementById("prod").innerHTML="No items found"
               }
           // Get the productList container element
           const productListContainer = document.getElementById('prod');

           // Clear any existing content in the productList container
           productListContainer.innerHTML = '';
     
           // Loop through the received data and create elements for each product
           data.forEach((product) => {
             // Create a container element for each product
             const productContainer = document.createElement('div');
     
             const image=document.createElement("img");
             image.src=product.image;
             // Create HTML elements to display the product information
             const nameElement = document.createElement('h2');
             nameElement.textContent = product.name;
             
             const ratingElement = document.createElement('p');
             ratingElement.textContent = `Rating: ${product.rating}`;
             
             const priceElement = document.createElement('p');
             priceElement.textContent = `Price: $${product.price}`;
             
             const descriptionElement = document.createElement('p');
             descriptionElement.textContent = product.description;
     
             // Append the product information elements to the product container
             productContainer.appendChild(image)
             productContainer.appendChild(nameElement);
             productContainer.appendChild(ratingElement);
             productContainer.appendChild(priceElement);
             productContainer.appendChild(descriptionElement);
            
     
             // Append the product container to the productList container
             productListContainer.appendChild(productContainer);
           });

    });
});










document.getElementById('search-btn').addEventListener('click', () => {
  const searchInput = document.getElementById('search-input').value;
  console.log(searchInput)
  // const fragranceCategory = document.getElementById('fragranceCategory').value;
  // const productType = document.getElementById('productType').value;
  // const sortBy = document.getElementById('sortBy').value;

  // Make a request to your API route with query parameters including the search query
  fetch(`http://localhost:3090/product/filter-and-sort?searchQuery=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {

      console.log(data)
      // Get the productList container element
      const productListContainer = document.getElementById('prod');

      // Clear any existing content in the productList container
      productListContainer.innerHTML = '';

      // Loop through the received data and create elements for each product
      data.forEach((product) => {
        // Create a container element for each product
        const productContainer = document.createElement('div');

        const image=document.createElement("img");
        image.src=product.image;
        // Create HTML elements to display the product information
        const nameElement = document.createElement('h2');
        nameElement.textContent = product.name;
        
        const ratingElement = document.createElement('p');
        ratingElement.textContent = `Rating: ${product.rating}`;
        
        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${product.price}`;
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = product.description;

        // Append the product information elements to the product container
        productContainer.appendChild(image)
        productContainer.appendChild(nameElement);
        productContainer.appendChild(ratingElement);
        productContainer.appendChild(priceElement);
        productContainer.appendChild(descriptionElement);
       

        // Append the product container to the productList container
        productListContainer.appendChild(productContainer);
      });
    });
});
