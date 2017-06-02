//Account controller (now using correct Inline Bracket Syntax)
appModule.controller('AccountController', ['$scope', 'accountService', 'toastr','$location', function($scope, accountService, toastr, $location) {

    $scope.user = {
        email: "",
        password: "",
        confirmPassword: "",
        role: "basic", //Used by the identity framework
        roleType: "basic" //A string description to make a .Net Claim (i.e. a key/value pair to make it easier to read the roleType)
    };

    //$scope doesn't work well without an object, so create a checkboxes object and put the roleCheckbox property on it
    $scope.checkboxes = {
        roleCheckbox: false
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
                }).catch(function(error) {
                    responseError(error)//Error handler if the $http request fails.
                });
        }
    };

    $scope.logout = function() {
        return accountService.logout()
            .then(function(response) {
                //redirect to the homepage
                //$location.path(redirectUrl);
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    $scope.register = function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.errorMessage = "The passwords do not match";
            $scope.registerError = true;
        }
        else {
            $scope.registerError = false;
            //If checked, then the user is an admin. Otherwise, the default is "basic"
            if ($scope.checkboxes.roleCheckbox){
                $scope.user.role = "admin";
                $scope.user.roleType = "admin";
            }
            return accountService.register($scope.user)
                .then(function(response) {
                    //redirect to the homepage
                }).catch(function(error) {
                    responseError(error)//Error handler if the $http request fails.
                });
        }

        //Error handler for the ajax request
        function responseError(response) {
            toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
        }

    };
}]);