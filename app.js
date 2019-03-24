'use strict';

const Search = require('azure-cognitiveservices-imagesearch');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

const download = require('image-downloader');
const msConfig = require('./config/index');

const serviceKey = msConfig.SERVICE_KEY;

const searchTerms = [
    "All colors glass bottles and jars",
    "Clear glass",
    "Green glass",
    "Brown glass",
    "Blue glass",
    "Glass food containers",
    "Beer and wine bottles",
    "All plastics numbers 1-7 (Excluding #6) Check the number on the container. Keep lids on",
    "Food and beverage containers",
    "Screw top jars",
    "Deli-style containers",
    "Clam-shell take-out containers",
    "Plastic cups (lids and straws removed)",
    "Milk jugs",
    "Soap bottles",
    "Plastic jugs: soda bottles, laundry detergent jugs"
];

// let credentials = new CognitiveServicesCredentials(process.env.MY_API_KEY);
let credentials = new CognitiveServicesCredentials(serviceKey);
let imageSearchApiClient = new Search.ImageSearchClient(credentials);

searchTerms.forEach(searchTerm => {

    imageSearchApiClient.imagesOperations.search(searchTerm).then(imageResults => {

        if (imageResults == null) {

            console.log("No image results were found.");
        } else {

            console.log(`Total number of images returned: ${imageResults.value.length}`);
            
            imageResults.value.forEach(element => {

                console.log(element);

                const option = {
                    filename: element.name,
                    url: element.contentUrl,
                    dest: "./img/"
                }

                download.image(option)
                    .then(({ filename, image }) => {
                        console.log('File saved to', filename)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
        }
    }).catch(error => console.log(error));
});