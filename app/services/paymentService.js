//Factory is used here to creates a service. ALl services return a singleton object.
appModule.factory('paymentService', function($rootScope, $http, toastr, $location) {
    //Create the empty service object
    var theService = {};

    theService.submitPayment = function(addressInformation) {
        var apiUrl = config.apiEndPoints.checkout.createOrder;
        return $http.post(apiUrl, addressInformation, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                toastr.success("Your purchase order was successful!");
                $location.path("/confirmation");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
        if (typeof response !== "undefined" && typeof response.data !== "undefined") {
            var errors = response.data.errorMessages;
            var formattedMessage = "";
            //build the error message to return in the toaster response
            if (typeof errors !== 'undefined' && errors !== null) {
                for (var i = 0; i < errors.length; i++) {
                    formattedMessage += errors[i] + "<br/>";
                }
            }

            toastr.error("<br/>" + formattedMessage, "Ajax Request failed with status code: " + response.status, {
                allowHtml: true
            });
        }
    }

    //return it
    return theService;
});