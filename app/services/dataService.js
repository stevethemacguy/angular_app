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

    //The customer's shopping cart, which is initially empty
    var shoppingCart = [];

    //Number of items in the cart
    var itemCount = 0;

    theService.getCart = function()
    {
        return shoppingCart;
    };

    //Adds a selected product to the customer's cart
    theService.addToCart = function(product)
    {
        //See if the item is in the cart
        var index = (shoppingCart.indexOf(product));

        //Don't add duplicates
        if (index == -1)
        {
            shoppingCart.push(product);
            itemCount++;
        }
    };

    //Returns the total number of items in the cart
    theService.getItemCount = function()
    {
        return itemCount;
    };

    //Returns true if the cart is empty
    theService.isCartEmpty = function()
    {
        return itemCount <= 0;
    };

    //Adds a selected product to the customer's cart
    theService.removeFromCart = function(productID)
    {
        //Go through every item in the cart
        for (var i = 0; i < shoppingCart.length; i++)
        {
            var currentItem= shoppingCart[i];
            //if there's an item with the same id as the one we want to remove
        	if(currentItem.id === productID)
            {
                var index = shoppingCart.indexOf(currentItem);

                //if it is, then remove it
                if (index > -1) {
                    shoppingCart.splice(index, 1);
                    itemCount--;
                }
            }
        }
    };

    //Returns true if the item passed is currently in the shopping cart array
    theService.isProductInCart = function(productObj)
    {
        //See if the item is in the cart
        var index = (shoppingCart.indexOf(productObj));
        return index > -1;
    };

    //For debugging
    theService.printCart = function()
    {
        for (var index = 0; index < shoppingCart.length ; index++)
        {
            var item = shoppingCart[index];
            console.log("id: " + item.id + " name: " + item.name + " price: " + item.price);
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

















