//A service that saves the "state" of the form so that we can access it between views!
appModule.factory('formService', function() {

    //$http.get(/* init once per app if needed*/);

    //Just return empty objects. Since services are singletons that are injected
    //The state will "Save" between views
    return {
        shippingData: { },
        paymentData: { }
    };
});

















