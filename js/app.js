var myApp = angular.module("myApp", ['ngSanitize']);

myApp.controller('fashionMainController', ['$scope', '$http', function($scope, $http){
	
	$http.get("../data/posts.json")
	    .then(function(response) {
	        $scope.items = response.data.items;

	        for(var i = 0; i < $scope.items.length; i++){
	        	$scope.items[i].dateTime = new Date($scope.items[i].item_created);
	        	
	        	if($scope.items[i].service_name === 'Twitter'){
	        		$scope.items[i].item_data.tweet = formatString($scope.items[i].item_data.tweet, $scope.items[i].service_name);
	        	}

	        	if($scope.items[i].service_name === 'Instagram'){
	        		$scope.items[i].item_data.caption = formatString($scope.items[i].item_data.caption, $scope.items[i].service_name);
	        	}

	        }
	        
            console.log("data transfer done!");
        },function(response){
            console.log("database Error");
	    });


	var formatString = function(text, service_name){
		// console.log("callTweet")
		let textArr = text.split(" ");

		// console.log(textArr.length);
		for(let i = 0; i < textArr.length; i++){
			// console.log(textArr[i]);
			
			if(textArr[i].charAt(0) === "@"){
				// textArr[i] = "<span class='atSign'>" + textArr[i] + "</span>";
				let key = textArr[i];
				if(key.charAt(key.length - 1) =='.' || key.charAt(key.length - 1) ==':'){
					// key.pop();
					key = key.slice(0, -1);
				}
				textArr[i] = "<a target=\"_blank\" href=\"https://twitter.com/" + key + "\"><span class='numberSign'>" + textArr[i] +  "</span></a>";
			}

			if(textArr[i].charAt(0) === 'h' 
				&& textArr[i].charAt(1) === 't' 
				&& textArr[i].charAt(2) === 't' 
				&& textArr[i].charAt(3) === 'p' 
				&& textArr[i].charAt(4) === ':' 
				&& textArr[i].charAt(5) === '/' 
				&& textArr[i].charAt(6) === '/' ){

				let URLkey;
				if(textArr[i].charAt(textArr[i].length - 1) == "."){
					URLkey = textArr[i].slice(0, -1);
				}

				textArr[i] = "\<a target=\"_blank\" href=" + URLkey + " class='webURL'>" + textArr[i] + "</a>";
				
			}

			if(textArr[i].charAt(0) === "#"){

				if(service_name == 'Twitter'){
					textArr[i] = "<a target=\"_blank\" href=\"https://twitter.com/" + textArr[i] + "\"><span class='numberSign'>" + textArr[i] +  "</span></a>";
					// console.log(textArr[i]);
					
				}else if(service_name == 'Instagram'){
					let instagramKey = "";
					for(let j = 1; j < textArr[i].length; j++){
						instagramKey += textArr[i].charAt(j);
					}
					textArr[i] = "<a target=\"_blank\" href=\"https://www.instagram.com/explore/tags/" + instagramKey + "\"><span class='numberSign'>" + textArr[i] +  "</span></a>";
					// console.log(textArr[i]);
				}else{
					textArr[i] = textArr[i];
				}
			}

		}
		return textArr.join(" ");
	}


  	$scope.isManual = function(item){
  		if(item.service_name == 'Manual')
  			return true;
  	}

  	$scope.isInstagram = function(item){
  		if(item.service_name == 'Instagram')
  			return true;
  	}

  	$scope.isTwitter = function(item){
  		if(item.service_name == 'Twitter')
  			return true;
  	}


  	$scope.display = true;
  	$scope.limit = 10;

  	$scope.load = function(){

  		// $scope.limit += 5;

  		// if($scope.limit >= $scope.items.length){
  		// 	$scope.limit = $scope.items.length;
  		// 	$scope.display = false;
  		// }

  		$scope.limit = $scope.items.length;
  		$scope.display = false;

  		
  	}

}]);

