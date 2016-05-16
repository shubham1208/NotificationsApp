var app = angular.module("NotificationsDropdown",[]);


//Gets all the notifications and makes the call after every 10 seconds
var getNotifications = function($timeout,$http,$scope){
	$http.get('http://localhost:3000/notifications').
		success(function(data){
			$scope.content = data;
			$scope.unreadNotifications = getUnreadNotifications(data);
			console.log($scope.unreadNotifications);
			$timeout(function(){getNotifications($timeout,$http,$scope);},10000);
		});
}

//Closes the notification dropdown when clicked anywhere on the screen
var closeSearchWhenClickingElsewhere = function(event, callbackOnClose) {

    var clickedElement = event.target;
    if (!clickedElement) return;

    var elementClasses = clickedElement.classList;
    var clickedOnSearchDrawer = elementClasses.contains('fa-bell-o') 
        || elementClasses.contains('notificationHolder') 
        || (clickedElement.parentElement !== null 
            && clickedElement.parentElement.classList.contains('notificationHolder'));
    if (!clickedOnSearchDrawer) {
        callbackOnClose();
    }

}

//Gets the unread notifications from the available list of notifications
var getUnreadNotifications = function(data){
	var unread = [];
	for(var tupple in data){
		if(data[tupple]!=null && data[tupple].notified === 0)
			unread.push(data[tupple]._id);
	}
	return unread;
};


app.controller('NotificationController',function($timeout,$http,$scope,$window){
	$scope.$window = $window;
	$scope.showDiv=false;
	$scope.toggleNotificationDiv = function(){
		$scope.showDiv = !$scope.showDiv;
    if ($scope.showDiv) {
        $scope.$window.onclick = function (event) {
            closeSearchWhenClickingElsewhere(event, $scope.toggleNotificationDiv);
        };
    } else {
        $scope.showDiv = false;
        $scope.$window.onclick = null;
        $scope.$apply(); //--> trigger digest cycle and make angular aware. 
    }
	};
	$scope.markAsRead = function(){
		$http.put('http://localhost:3000/notifications',$scope.unreadNotifications).success(function(data){
			$scope.unreadNotifications = [];
		}).error(function(err,data){
			console.log(err);
		})
	};
	var init = function($timeout,$http,$scope){
		getNotifications($timeout,$http,$scope);
	};
	init($timeout,$http,$scope);
});