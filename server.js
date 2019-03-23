'use strict';

const Search = require('azure-cognitiveservices-imagesearch');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

//replace this value with your valid subscription key.
let serviceKey = "d79b580b292e4ffd9e812c1611528b51";

//the search term for the request
let searchTerm = "Aluminum cans";

//instantiate the image search client 

// let credentials = new CognitiveServicesCredentials(process.env.MY_API_KEY);
let credentials = new CognitiveServicesCredentials(serviceKey);
let imageSearchApiClient = new Search.ImageSearchClient(credentials);

//a helper function to perform an async call to the Bing Image Search API
const sendQuery = async () => {
    return await imageSearchApiClient.imagesOperations.search(searchTerm);
};

sendQuery().then(imageResults => {
    if (imageResults == null) {
    console.log("No image results were found.");
    }
    else {
        console.log(`Total number of images returned: ${imageResults.value.length}`);
        
        imageResults.value.forEach(element => {
            console.log(element.thumbnailUrl);
        });
    }
  })
  .catch(err => console.error(err))