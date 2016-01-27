//dataService provides product data to the app. The data is either hard-coded
//or an http request can be made to the hedoku server (my "mean-app") for the data.

//Factory is used here to creates a service. ALl services returns a singleton object.
appModule.factory('dataService', function($http) {

    //Create the empty service object
    var theService = {};

    //Whether the "DB" has already been loaded with data from the server
    var alreadyInitialized = false;

    //Create private variables/functions here that won't be exposed by the
    //service. If you want to expose them, add them to theService object.

    var imgPath = "content/images/";

    //Start with an empty list
    var products = ["The product list is empty. The ajax call may have failed"];

    //A list of all available products (hardcoded)
    products = [
        {id: 1, name: 'Apple', price: 1.50, img: imgPath + '/apple.png'},
        {id: 2, name: 'Pencil', price: .50, img: imgPath + '/pencil.png'},
        {id: 3, name: 'Xbox', price: 199.99, img: imgPath + '/xbox.png'},
        {id: 4, name: 'Sony Camera', price: 60.00, img: imgPath + '/camera.png'},
        {id: 5, name: 'LOTR Trilogy; Blue Ray', price: 49.99, img: imgPath + '/dvd.png'},
        /*{id: 6, name: 'Band aids', price: 2.50, img: imgPath + '/band.png'},*/  //Only the server version should show band aids now
        {id: 7, name: 'Apple pie', price: 5.00, img: imgPath + '/pie.png'},
        {id: 8, name: 'Tennis ball (x10)', price: 5.49, img: imgPath + '/ball.png'},
        {id: 9, name: 'Diamond necklace', price: 20000, img: imgPath + '/diamond.png'},
        {id: 10, name: 'Hand grenade', price: 15.00, img: imgPath + '/grenade.png'},
        {id: 11, name: 'Printer', price: 150.00, img: imgPath + '/printer.png'},
        {id: 12, name: 'Monitor', price: 335.00, img: imgPath + '/monitor.png'},
        {id: 13, name: 'Book', price: 5.00, img: imgPath + '/book.png'},
        {id: 14, name: 'Couch', price: 189.00, img: imgPath + '/couch.gif'},
        {id: 15, name: 'Silverware', price: 189.00, img: imgPath + '/silver.png'},
        {id: 16, name: 'Watch', price: 189.00, img: imgPath + '/watch.png'},
        {id: 17, name: 'Flowers', price: 189.00, img: imgPath + '/flowers.png'},
        {id: 18, name: 'Cup', price: 189.00, img: imgPath + '/cup.png'}
    ];

    ///Retrieve a list of products from the server (my "mean_app" on a heroku).
    //This does a real http request to fetch a json file on the server. The images
    //are also on the server. Technically, I did not create a real "API", it just goes directly the the url
    //This should only be called once when the application loads
    theService.getProductsFromServer = function() {

        //Http request to retrieve an JSON object of products. This call
        //RETURNS A PROMISE, which is then used in the controller to make sure
        //products aren't updated until the AJAX call finishes
        return $http.get("https://mean-app-sd.herokuapp.com/products")
            .then(function(response) {
                alreadyInitialized = true;
                console.log("Ajax call was successful");
                products = response.data;
                return response.data; //Success handler for the ajax request
            }, responseError);
    };

    //Error handler for the ajax request
    var responseError = function(response) {
        console.log("The ajax request failed :(");
        console.log("Status: " + response.status);
        console.log("Status Text: " + response.statusText);
    };

    //Prevents duplicate ajax calls from occurring if the database is already ready
    theService.isDBInitialized = function() {
        return alreadyInitialized;
    };

    //Get the product data, which was either hardcoded or retrieved from the server
    theService.getProducts = function() {
        return products;
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

    //return it
    return theService;
});