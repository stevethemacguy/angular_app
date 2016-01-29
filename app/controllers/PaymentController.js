//Proper "bracket" syntax that won't break with minification
appModule.controller("PaymentController", ['$scope', "formService", function($scope, formService)
{
    //Make the form data (i.e the "model") point to the service data so that the state is preserved when switching views
    $scope.formData = formService.paymentData;

}]);