//Proper "bracket" syntax that won't break with minification
appModule.controller("PaymentController", ['$scope', "formService", "$localStorage", "$location", "toastr", "paymentService", function($scope, formService, $localStorage, $location, toastr, paymentService)
{
    //Data is no preserved using localStorage instead of the service
    //Make the form data (i.e the "model") point to the service data so that the state is preserved when switching views
    //$scope.formData = formService.paymentData;

    //Get the address from localStorage, if available
    if ($localStorage.shippingAddress) {
        $scope.shippingAddress = $localStorage.shippingAddress;
    }

    //Get the address from localStorage, if available
    if ($localStorage.billingAddress) {
        $scope.billingAddress = $localStorage.billingAddress;
    }

    //Basic check to ensure that user's can't go directly to the payment page unless they have a valid billing address.
    //We're only checking the zipCode because this is an edge case that shouldn't occure often. If the user filled-out the zipCode,
    //then they likely made it to the end of the form.
    if (!$localStorage.billingAddress || !$localStorage.billingAddress.zipCode || !$localStorage.shippingAddress || !$localStorage.shippingAddress.zipCode) {
        $location.path("/shipping");
        toastr.error("Incomplete billing address. Please enter your billing address to continue.");
    }

    $scope.submitPayment = function() {

        //Combine shipping and billing addresses into a single object
        var addressInformation = {
            ShippingAddress: $scope.shippingAddress,
            BillingAddress: $scope.billingAddress
        };

        paymentService.submitPayment(addressInformation)
            .then(function fulfilled(response) {
                $localStorage.billingAddress = null;
                $localStorage.shippingAddress = null;

            })
            .catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
    }
}]);