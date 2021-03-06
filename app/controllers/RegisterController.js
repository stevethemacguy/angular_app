//Register controller (now using correct Inline Bracket Syntax)
appModule.controller('RegisterController', ['$rootScope', '$scope', 'accountService', 'toastr', function($rootScope, $scope, accountService, toastr) {
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

    $scope.showError = false;

    //Check that both passwords match
    $scope.noMatch = function() {
        return !($scope.user.password === $scope.user.confirmPassword);
    };

    /*
    //This code can be used to hide the admin checkbox (unless you're logged in as an admin).
    //However, hiding the checkbox makes it impossible to register yourself as an admin
    //if your registering yourself as the first user. The only other way to create an admin would to
    //create a user in SQL.

    //var userIsAdmin = false;

    //Check if the logged in user is an admin
    accountService.getUserRoles()
        .then(function fulfilled(response) {
            if (response.data !== "unauthorized") {
                //Loop through the roles array, if the user has an admin role then let them pass
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i] === "admin") {
                        userIsAdmin = true;
                    }
                }
            }
            $scope.isLoading = false;
        });

    $scope.isUserAdmin = function() {
        return userIsAdmin;
    };*/

    $scope.register = function() {
        if ($scope.user.email === "") {
            return;
        }
        if ($scope.noMatch()) {
            $scope.showError = true;
            return;
        }

        $scope.showError = false;

        //If checked, then the user is an admin. Otherwise, the default is "basic"
        if ($scope.checkboxes.roleCheckbox) {
            $scope.user.role = "admin";
            $scope.user.roleType = "admin";
        }

        $scope.isLoading = true;

        return accountService.register($scope.user)
            .then(function(response) {
                //do nothing
            })
            .catch(function(error) {
                responseError(error)
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. " + response.status + ": " + response.statusText);
    }

}]);