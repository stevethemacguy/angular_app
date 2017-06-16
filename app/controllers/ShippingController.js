//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller("ShippingController", function($scope, formService, $localStorage, $location) {

    //$scope.formData is the glue between the view and the controller (i.e. formData is the "model")
    //formData directly references (i.e. updates) the shippingData in the service so that
    //the state is preserved when switching views.
    $scope.formData = formService.shippingData;

    $scope.sameAsShipping = true;

    $scope.shippingAddress = {
        firstName: "",
        middleInitial: "",
        lastName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        country: "",
        zipCode: ""
    };

    $scope.billingAddress = {
        firstName: "",
        middleInitial: "",
        lastName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        country: "",
        zipCode: ""
    };

    //If sameAsShipping is checked, copy over the billing address using the shippingAddress values any time there's a change
    $scope.updateBillingAddress = function(shippingAddress) {
        if($scope.sameAsShipping){
            $scope.billingAddress = angular.copy($scope.shippingAddress);
            $localStorage.billingAddress = $scope.billingAddress;
        }
    };

    //Get the address from localStorage, if available
    if ($localStorage.shippingAddress) {
        $scope.shippingAddress = $localStorage.shippingAddress;
    }

    //Get the address from localStorage, if available
    if ($localStorage.billingAddress) {
        $scope.billingAddress = $localStorage.billingAddress;
    }

    //Store the addresses temporarily while checking out, so the user doesn't lose their data on page refreshes
    $scope.continueToPayment = function() {
        $localStorage.shippingAddress = $scope.shippingAddress;
        $localStorage.billingAddress = $scope.billingAddress;
        $location.path("/payment");
    }


    //Note: you can NOT do $scope.formData.name = "" here if you want the data to persist between views,
    //This is because you get a new instance of the controller with each view. You could, however, do this in the service.

    //CAUTION: If the form inputs are invalid when entered (according to angular), then this data
    //will NOT actually be stored in the service. This is good, just be aware of it
});