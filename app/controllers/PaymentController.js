//Proper "bracket" syntax that won't break with minification
appModule.controller("PaymentController", ['$scope', "formService", "$localStorage", "$location", "toastr", "paymentService", function($scope, formService, $localStorage, $location, toastr, paymentService)
{
    //Data is no preserved using localStorage instead of the service
    //Make the form data (i.e the "model") point to the service data so that the state is preserved when switching views
    //$scope.formData = formService.paymentData;

    $scope.paymentMethod = {
        billingAddress: null,
        cardNumber: 123456789,
        cardType: "Visa",
        customCardName: "",
        isValid: true,
        securityCode: 555,
        expirationDate: "12/10/2020"
    };

    //Get the address from localStorage, if available
    if ($localStorage.shippingAddress) {
        $scope.shippingAddress = $localStorage.shippingAddress;
    }

    //Get the address from localStorage, if available
    if ($localStorage.billingAddress) {
        $scope.billingAddress = $localStorage.billingAddress;
        $scope.paymentMethod.billingAddress = $localStorage.billingAddress;
    }

    //Basic check to ensure that user's can't go directly to the payment page unless they have a valid billing address.
    //We're only checking the zipCode because this is an edge case that shouldn't occure often. If the user filled-out the zipCode,
    //then they likely made it to the end of the form.
    if (!$localStorage.billingAddress || !$localStorage.billingAddress.zipCode || !$localStorage.shippingAddress || !$localStorage.shippingAddress.zipCode) {
        $location.path("/shipping");
        toastr.error("Incomplete billing address. Please enter your billing address to continue.");
    }

    //Create the payment method
    $scope.createPayment = function()
    {
        if ($scope.paymentMethod.billingAddress === null){
            $toastr.error("Oops, the billing address was invalid. Please re-enter the billing address");
        }

        paymentService.createPaymentMethod($scope.paymentMethod)
            .then(function fulfilled(response) {
                if (response) {
                    var paymentMethodId = response.data;
                    $scope.submitPayment(paymentMethodId);
                }
            })
            .catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    $scope.submitPayment = function(paymentMethodId) {

        //Combine shipping and billing addresses into a single object
        var addressInformation = {
            ShippingAddress: $scope.shippingAddress,
            BillingAddress: $scope.billingAddress,
            PaymentMethodId: paymentMethodId
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