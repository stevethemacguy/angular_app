//A service that saves the "state" of the form so that we can access it between views!
appModule.factory('formService', function() {

    //$http.get(/* init once per app if needed*/);

    //Create and return data objects (in this case we're not initializing anything, so just empty objects)
    //Services are singletons, so this allows you to share data between views. The formData Object
    //in the ShippingController points to this data.

    //These objects live in the service since they're created here, even though it looks funky
    return {
        shippingData: { },
        paymentData: { }
    };

    //Technically, it's probably more clear to explicitly initialize data here (even if just with empty strings),
    //to ensure that our views only "Read" or update properties that already exist. For example:

    //initialize empty properties
    // shippingData.email = "";
    // shippingData.phone = "";

    //Return the object
    // return shippingData;*/

    //If we needed to initialize the "model" with real data, this would be required anyway.
    //In this case, we're just giving formData a reference to the shippingData object, so our data can
    //be shared across views.
    //     $scope.formData = formService.shippingData;
    //
    // formData represents our "model". Take a look at the shipping.html view. When you see
    // ng-model="formData.name" in the view, you're really just updating the existing formData object
    // ng-model will try to read formData.name, but since it's NOT defined, ng-model will implicitly add it
    // to the model (i.e. formData). Thus, we know the property was added to the controller's scope (instead of say a global scope)
    // because the property is added to formData.
});

















