//Simple Service that makes an http request to retrieve a list of products from a Heroku server
//This service takes care of the http get request and exposes a public function to return the list of products
appModule.factory('httpService', function($http) {

    //Create the empty service object
    var theService = {};

    //Start with an empty list
    var products = ["The product list is empty. The ajax call might have failed"];

    //Error handler for the ajax request
    var responseError = function(response) {
        console.log("The ajax request failed :(");
        console.log("Status: " + response.status);
        console.log("Status Text: " + response.statusText);
    };

    //Success handler for the ajax request
    var responseSuccess = function(response) {
        //get the Json object and assign it to products
        products = response.data;
        console.log("success");
    };


    ///Retrieve a list of products from a server. I modified my "mean_app" and put it on heroku,
    //so this actually does a real http request to fetch my json file on the server. The images
    //are also on the server! Technically, I did not create a real "API", it just goes directly the the url
    //Pass in a product id, and get it's price in return
    theService.getProductsFromServer = function()
    {
        //The get request returns a promise, which is then used in the controller
        //to make sure the products aren't updated until the AJAX call finishes
        var promise =  $http.get("https://mean-app-sd.herokuapp.com/products");
            /*.then(responseSuccess, responseError);*/
        //Make the http request

        return promise;
    };

    //return it
    return theService;
});