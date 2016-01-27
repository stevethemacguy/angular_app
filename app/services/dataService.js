//Even though we use a factory to create a service, this technically creates a service
//It returns a singleton object!
appModule.factory('dataService', function(httpService) {

    //Create the empty service object
    var theService = {};

    //Add stuff to the service object
    //You can create private variables/functions here that won't be exposed by the service
    //    var somethingPrivate = function() {};
    //If you want to expose them, then add them to theService

    var imgPath = "content/images/";
    var products = [];

    //Retrieve a list of products from a server. See notes in httpService.
    //This should only be called once when the application loads, though it
    theService.initializeDB = function()
    {
        httpService.getProductsFromServer().then(function(promise){
            products = promise.data;
        });
    };

    //A list of all available products (hardcoded)
    /*var products = [
        { id: 1, name: 'Apple', price: 1.50, img: 'images/apple.png' },
        { id: 2, name: 'Pencil', price: .50, img: 'images/pencil.png' },
        { id: 3, name: 'Xbox', price: 199.99, img: 'images/xbox.png'},
        { id: 4, name: 'Sony Camera', price: 60.00, img: 'images/camera.png'},
        { id: 5, name: 'LOTR Trilogy; Blue Ray', price: 49.99, img: 'images/dvd.png' },
        { id: 6, name: 'Band aids', price: 2.50, img: 'images/band.png' },
        { id: 7, name: 'Apple pie', price: 5.00, img: 'images/pie.png' },
        { id: 8, name: 'Tennis ball (x10)', price: 5.49, img: 'images/ball.png' },
        { id: 9, name: 'Diamond necklace', price: 20000, img: 'images/diamond.png' },
        { id: 10, name: 'Hand grenade', price: 15.00, img: 'images/grenade.png' },
        { id: 11, name: 'Printer', price: 150.00, img: 'images/printer.png' },
        { id: 12, name: 'Monitor', price: 335.00, img: 'images/monitor.png' },
        { id: 13, name: 'Book', price: 5.00, img: 'images/book.png' },
        { id: 14, name: 'Couch', price: 189.00, img: 'images/couch.gif' },
        { id: 15, name: 'Silverware', price: 189.00, img: 'images/silver.png' },
        { id: 16, name: 'Watch', price: 189.00, img: 'images/watch.png' },
        { id: 17, name: 'Flowers', price: 189.00, img: 'images/flowers.png' },
        { id: 18, name: 'Cup', price: 189.00, img: 'images/cup.png' }
    ];*/

    //Pass in a product id, and get it's price in return
    theService.getProductPrice = function(productID)
    {
        var productPrice = 0;
        for (var i = 0; i < products.length; i++)
        {
        	if(productID === products[i].id)
            {
                productPrice = products[i].price;
            }
        }
        return productPrice;
    };

    theService.getProducts = function()
    {
        return products;
    };

    //return it
    return theService;
});