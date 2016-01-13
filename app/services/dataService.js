//Even though we use a factory to create a service, this technically creates a service
//It returns a singleton object!
appModule.factory('dataService', function() {

    //Create the empty service object
    var theService = {};

    //Add stuff to the service object
    //You can create private variables/functions here that won't be exposed by the service
    //    var somethingPrivate = function() {};
    //If you want to expose them, then add them to theService

    var imgPath = "content/images/";

    //A list of all available products
    var products = [
        { name: 'Apple', price: 1.50, img: imgPath + 'apple.png' },
        { name: 'Pencil', price: .50, img: imgPath + 'pencil.png' },
        { name: 'Xbox', price: 199.99, img: imgPath + 'xbox.png'},
        { name: 'Sony Camera', price: 60.00, img: imgPath + 'camera.png'},
        { name: 'LOTR Trilogy; Blue Ray', price: 49.99, img: imgPath + 'dvd.png' },
        { name: 'Band aids', price: 2.50, img: imgPath + 'band.png' },
        { name: 'Apple pie', price: 5.00, img: imgPath + 'pie.png' },
        { name: 'Tennis ball (x10)', price: 5.49, img: imgPath + 'ball.png' },
        { name: 'Diamond necklace', price: 20000, img: imgPath + 'diamond.png' },
        { name: 'Hand grenade', price: 15.00, img: imgPath + 'grenade.png' },
        { name: 'Printer', price: 150.00, img: imgPath + 'printer.png' },
        { name: 'Monitor', price: 335.00, img: imgPath + 'monitor.png' },
        { name: 'Book', price: 5.00, img: imgPath + 'book.png' },
        { name: 'Couch', price: 189.00, img: imgPath + 'couch.gif' },
        { name: 'Silverware', price: 189.00, img: imgPath + 'silver.png' },
        { name: 'Watch', price: 189.00, img: imgPath + 'watch.png' },
        { name: 'Flowers', price: 189.00, img: imgPath + 'flowers.png' },
        { name: 'Cup', price: 189.00, img: imgPath + 'cup.png' }
        
    ];

    //The customer's shopping cart, which is initially empty
    var shoppingCart = [];

    theService.getCart = function()
    {
        return shoppingCart;
    };

    //Adds a selected product to the customer's cart
    theService.addToCart = function(product)
    {
        shoppingCart.push(product);
    };

    //For debugging
    theService.printCart = function()
    {
        for (var index = 0; index < shoppingCart.length ; index++)
        {
            console.log("name: " + shoppingCart[index].name + " price: " + shoppingCart[index].price);
        }
    };

    var customers = [
        {name: 'John Smith', city: 'Phoenix'},
        {name: 'John Doe', city: 'Atlanta'},
        {name: 'Jane Doe', city: 'San Francisco'}
    ];


    theService.getCustomers = function() {
        return customers;
    };

    theService.getProducts = function()
    {
        return products;
    };

    //return it
    return theService;
});