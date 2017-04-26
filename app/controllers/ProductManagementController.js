//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller("ProductManagementController", function($scope) {

    //$scope.formData is the glue between the view and the controller (i.e. formData is the "model")
    //formData directly references (i.e. updates) the shippingData in the service so that
    //the state is preserved when switching views.

    //Note: you can NOT do $scope.formData.name = "" here if you want the data to persist between views,
    //This is because you get a new instance of the controller with each view. You could, however, do this in the service.

    //CAUTION: If the form inputs are invalid when entered (according to angular), then this data
    //will NOT actually be stored in the service. This is good, just be aware of it
});