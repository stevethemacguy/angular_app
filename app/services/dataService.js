//Even though we use a factory to create a service, this technically creates a service
//It returns a singleton object!
appModule.factory('dataService', function() {

    //Create the empty service object
    var theService = {};

    //Add stuff to the service object
    //You can create private variables/functions here that won't be exposed by the service
    //    var somethingPrivate = function() {};
    //If you want to expose them, then add them to theService
    var customers = [
        {name: 'John Smith', city: 'Phoenix'},
        {name: 'John Doe', city: 'Atlanta'},
        {name: 'Jane Doe', city: 'San Francisco'}
    ];

    var numbers = [1,2,3,4];

    theService.getCustomers = function() {
        return customers;
    };

    theService.getNumbers = function()
    {
        return numbers;
    };

    //return it
    return theService;
});