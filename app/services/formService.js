//A service that saves the "state" of the form so that we can access it between views!
appModule.factory('formService', function() {

    //$http.get(/* init once per app if needed*/);

    //Create and return data objects (in this case they're empty since we're not initializing with anything.
    //Since services are singletons, this objects will allow you to share data between views.
    //The ShippingController then creates the formData object (i.e the "MODEL"), which points to this data.

    //These objects live in the service since they're created here, even though it looks funky
    return {
        shippingData: { },
        paymentData: { }
    };

    //Technically, I think it's more clear to explicitly initialize the properties here,
    //So we're truly only "Reading"/updating existing properties from the view. For example:

    //initialize empty properties
    // shippingData.email = "";
    // shippingData.phone = "";

    //Return the object
    // return shippingData;*/

    //And If we needed to initialize the "model" with real data, this would be required anyway.
    //In this case, we're just giving formData a reference to the shippingData object, so our data can
    //be shared across views.
    //     $scope.formData = formService.shippingData;
    //
    // formData represents our "model". Take a look at the shipping.html view. When you see
    // ng-model="formData.name" in the view, you're really just updating the existing formData object
    // ng-model will try to read formData.name, but since it isn't defined, ng-model will implicitly add it
    // to the model (i.e. formData). Thus, we know the property was added to the controller's scope (instead of say a global scope)
    // because it adds the property to formData.
});

















