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
        { id: 1, name: 'Apple', price: 1.50, img: imgPath + 'apple.png' },
        { id: 2, name: 'Pencil', price: .50, img: imgPath + 'pencil.png' },
        { id: 3, name: 'Xbox', price: 199.99, img: imgPath + 'xbox.png'},
        { id: 4, name: 'Sony Camera', price: 60.00, img: imgPath + 'camera.png'},
        { id: 5, name: 'LOTR Trilogy; Blue Ray', price: 49.99, img: imgPath + 'dvd.png' },
        { id: 6, name: 'Band aids', price: 2.50, img: imgPath + 'band.png' },
        { id: 7, name: 'Apple pie', price: 5.00, img: imgPath + 'pie.png' },
        { id: 8, name: 'Tennis ball (x10)', price: 5.49, img: imgPath + 'ball.png' },
        { id: 9, name: 'Diamond necklace', price: 20000, img: imgPath + 'diamond.png' },
        { id: 10, name: 'Hand grenade', price: 15.00, img: imgPath + 'grenade.png' },
        { id: 11, name: 'Printer', price: 150.00, img: imgPath + 'printer.png' },
        { id: 12, name: 'Monitor', price: 335.00, img: imgPath + 'monitor.png' },
        { id: 13, name: 'Book', price: 5.00, img: imgPath + 'book.png' },
        { id: 14, name: 'Couch', price: 189.00, img: imgPath + 'couch.gif' },
        { id: 15, name: 'Silverware', price: 189.00, img: imgPath + 'silver.png' },
        { id: 16, name: 'Watch', price: 189.00, img: imgPath + 'watch.png' },
        { id: 17, name: 'Flowers', price: 189.00, img: imgPath + 'flowers.png' },
        { id: 18, name: 'Cup', price: 189.00, img: imgPath + 'cup.png' }
    ];

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