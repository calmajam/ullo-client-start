/*global angular,FB */

var LESSON = true;
var CONFIG = {
    CLIENT: window.location.href.indexOf('http://ulloclient.wslabs.it') === 0 ? 'http://ulloclient.wslabs.it' : 'http://dev.ullowebapp:8081',
    API: (LESSON || window.location.href.indexOf('http://ulloclient.wslabs.it') === 0) ? 'http://ulloapi.wslabs.it' : 'https://localhost:44302',
    FACEBOOK_APP_ID: window.location.href.indexOf('http://ulloclient.wslabs.it') === 0 ? '1054303094614120' : '1062564893787940',
    assetTypeEnum: {
        Unknown: 0,
        Picture: 1,
    },
    IOS: (navigator.userAgent.match(/iPad|iPhone|iPod/g) ? true : false),
};


var app = angular.module('ullo', []); // module crea nuove applicazioni o nuovi plugin

// l'array si usa per minimizzazione, in modo che l'ordine tra l'array e i parametri venga preservato e angular riconosca i parametri minimizzati
// $scope = oggetto di angular che contiene gli oggetti del DOM agganciati al controller
app.controller('testCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
    $scope.model = {
        title: 'Titolo',
        description: 'description'
    }
    
    $timeout(function () {
        $scope.model.title = 'Titolone'
    }, 2000);
    
    $scope.onClick = function() {
        $scope.model.description = 'description 2'
    };
    
    // servizio per chiamate ajax
    // then = promise che consente di gestire due callback, una in caso di successo, una in caso di errore
    $http.get('http://ulloapi.wslabs.it/api/stream/anonymous').then(function (response) {
        $scope.model.items = response.data;
    }), function (error) {
        console.log(error);
    }
}]);