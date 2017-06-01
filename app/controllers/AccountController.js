//Account controller (now using correct Inline Bracket Syntax)
appModule.controller('AccountController', ['$scope', 'accountService', 'toastr','$location', function($scope, accountService, toastr, $location) {

    $scope.user = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    $scope.errorMessage = "";
    $scope.loginError = false;
    $scope.registerError = false;

    $scope.login = function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.errorMessage = "The passwords do not match";
            $scope.loginError = true;
        }
        else {
            $scope.loginError = false;
            var redirectUrl = "home";

            return accountService.login($scope.user, redirectUrl)
                .then(function(response) {
                    //redirect to the homepage
                    $location.path(redirectUrl);
                });
        }
    };

    $scope.register = function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.errorMessage = "The passwords do not match";
            $scope.registerError = true;
        }
        else {
            $scope.registerError = false;

            return accountService.register($scope.user)
                .then(function(response) {
                    //redirect to the homepage
                });
        }
    };
}]);