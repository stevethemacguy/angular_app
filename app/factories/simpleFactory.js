//Creates an object and returns it (I'm using hard coded data here, but the factory could connect to a DB, etc.
appModule.factory('simpleFactory', function() {
    var customers = [
        {name: 'John Smith', city: 'Phoenix'},
        {name: 'John Doe', city: 'Atlanta'},
        {name: 'Jane Doe', city: 'San Francisco'}
    ];

    var factory = {};

    //Add stuff to the factory object
    factory.getCustomers = function() {
        return customers;
    };

    //return it
    return factory;
});