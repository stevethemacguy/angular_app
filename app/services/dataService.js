//Even though we use a factory to create a service, this technically creates a service
//It returns a singleton object!
appModule.factory('dataService', function() {

    //Create the empty service object
    var theService = {};

    //Add stuff to the service object
    //You can create private variables/functions here that won't be exposed by the service
    //    var somethingPrivate = function() {};
    //If you want to expose them, then add them to theService

    var products = [
        { name: 'apple', price: 1.50 },
        { name: 'pencil', price: .50 },
        { name: 'Xbox', price: 199.99 },
        { name: 'Sony Camera', price: 60.00 },
        { name: 'LOTR Trilogy on Blue Ray', price: 49.99 },
        { name: 'band aids', price: 2.50 },
        { name: 'apple pie', price: 5.00 },
        { name: 'tennis ball (x10)', price: 5.49 },
        { name: 'diamond necklace', price: 20000 },
        { name: 'Hand grenade', price: 15.00 },
        { name: 'printer', price: 150.00 },
        { name: 'monitor', price: 335.00 },
        { name: 'book', price: 5.00 },
        { name: 'Silverware', price: 189.00 }
        
    ];

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