//dataService provides product data to the app. The data is either hard-coded
//or an http request can be made to the hedoku server (my "mean-app") for the data.

//Factory is used here to creates a service. ALl services returns a singleton object.
appModule.factory('dataService', function($http, toastr) {

    //Create the empty service object
    var theService = {};

    //Whether the "DB" has already been loaded with data from the server
    var alreadyInitialized = false;

    //Create private variables/functions here that won't be exposed by the
    //service. If you want to expose them, add them to theService object.

    //Start with an empty list
    var products = ["The product list is empty. The ajax call may have failed"];

    //Get products using the .Net Core Product API.
    theService.getProductsFromApi = function() {
        return $http.get(config.apiEndPoints.products.getAllProducts)
            .then(function(response) { //After the ajax succeeds
                alreadyInitialized = true;
                products = response.data; //Initialize the product list, which will be used in future calls to getProducts()
                //Todo: Use this for demo
                //toastr.success("Successfully Retrieved " + products.length + " Products from the API");
                return products;
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    ///Retrieve a list of products from the server (my "mean_app" on a heroku).
    //This does a real http request to fetch a json file on the server. The images
    //are also on the server. Technically, I did not create a real "API", it just goes directly the the url
    //This should only be called once when the application loads
    theService.getProductsFromHeroku = function() {
        //Http request to retrieve products (a JSON object). $http returns a promise when the ajax completes that
        //is immediately used by .then(). The .then() wraps the reponse data in a NEW promise (promise2). This
        //is the promise that is actually returned to the controller. Using .then() in the controller further
        //ensures that products aren't updated until both the AJAX and the .then() promise finishes.
        return $http.get("https://mean-app-sd.herokuapp.com/products")
            .then(function(response) { //After the ajax succeeds
                alreadyInitialized = true;
                console.log("Ajax call was successful");
                products = response.data; //Initialize the product list, which will be used in future calls to getProducts()
                return response.data; //This actually returns a promise (that contains response data)
            }).catch(function(error) {
                dataLoadError(error)//Error handler if the $http request fails.
            });
    };

    //Returns hard-coded test data
    theService.getTestProducts = function() {
        return productData;
    };

    //Error handler for the ajax request
    function dataLoadError(response) {
        console.log("The ajax request failed");
        console.log("If you're using the Heroku server, make sure you're using the CORS plugin in Chrome");
        console.log(response);
        toastr.error("Unable to retrieve product details from the Server. Check that the API Server is running and try again.");
    }

    //Prevents duplicate ajax calls from occurring if the database is already ready
    theService.isDBInitialized = function() {
        return alreadyInitialized;
    };

    //Pass in a product id, and get it's price in return
    theService.getProductPrice = function(productID) {
        var productPrice = 0;
        for (var i = 0; i < products.length; i++) {
            if (productID === products[i].id) {
                productPrice = products[i].price;
            }
        }
        return productPrice;
    };

    theService.addProduct = function(productToAdd)
    {
        var apiUrl = config.apiEndPoints.products.addProduct;
        return $http.post(apiUrl, productToAdd)
            .then(function(response) {
                toastr.success("Product successfully added.");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
    }

    //return it
    return theService;
});