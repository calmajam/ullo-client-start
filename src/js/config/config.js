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

app.constant('APP', CONFIG);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // UNSECURE ROUTING
    $routeProvider.when('/splash', {
        title: 'Splash',
        templateUrl: 'templates/splash.html',
        controller: 'SplashCtrl',
        controllerAs: 'splashCtrl',

    }).when('/test', {
        title: 'Test',
        templateUrl: 'templates/test.html',
        controller: 'StreamTestCtrl',
        controllerAs: 'testCtrl',

    }).when('/stream-test', {
        title: 'Stream Test',
        templateUrl: 'templates/test.html',
        controller: 'StreamTestCtrl',
        controllerAs: 'testCtrl',

    }).when('/signin-test', {
        title: 'Sign In',
        templateUrl: 'templates/signin-test.html',
        controller: 'SignInTestCtrl',
        controllerAs: 'signinCtrl',
    }).when('/signin', {
        title: 'Sign In',
        templateUrl: 'templates/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signinCtrl',

    }).when('/signup', {
        title: 'Sign Up',
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signupCtrl',

    }).when('/404', {

        title: 'Error 404',
        templateUrl: '404.html',

    // SECURE ROUTING
    }).when('/stream', {
        title: 'Stream',
        templateUrl: 'templates/stream.html',
        controller: 'StreamCtrl',
        controllerAs: 'streamCtrl',
        resolve: {
            user: ['Users', function(Users){
                return Users.isLoggedOrGoTo('/splash');
            }]
        },

    }).when('/dishes/:dishId', {
        title: 'Dish',
        templateUrl: 'templates/dish.html',
        controller: 'DishCtrl',
        controllerAs: 'dishCtrl',
        resolve: {
            user: ['Users', function(Users){
                return Users.isLoggedOrGoTo('/splash');
            }]
        },
        isForward: true,

    }).when('/categories/:categoryId', {
        title: 'Category',
        templateUrl: 'templates/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'categoryCtrl',
        resolve: {
            user: ['Users', function(Users){
                return Users.isLoggedOrGoTo('/splash');
            }]
        },
        isForward: true,

    }).when('/users/:userRoute', {
        title: 'User',
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl',
        controllerAs: 'userCtrl',
        resolve: {
            user: ['Users', function(Users){
                return Users.isLoggedOrGoTo('/splash');
            }]
        },
        isForward: true,

    }).when('/post', {
        title: 'Add Post',
        templateUrl: 'templates/post.html',
        controller: 'PostCtrl',
        controllerAs: 'postCtrl',
        resolve: {
            user: ['Users', function(Users){
                return Users.isLoggedOrGoTo('/splash');
            }]
        },
        isForward: true,

    }).when('/settings', {
        title: 'Settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settingsCtrl',
        resolve: {
            user: ['Users', function(Users){
                return Users.isLoggedOrGoTo('/splash');
            }]
        },
        isForward: true,

    });

    $routeProvider.otherwise('/splash'); // stream

    // HTML5 MODE url writing method (false: #/anchor/use, true: /html5/url/use)
    $locationProvider.html5Mode(true);

}]);

app.config(['$httpProvider', function ($httpProvider) {
    
    $httpProvider.defaults.withCredentials = true;
    
}]);

app.run(['$rootScope', '$window', 'APP', function ($rootScope, $window, APP) {

    $rootScope.standalone = $window.navigator.standalone;

    document.ontouchmove = function (event) {
        event.preventDefault();
    }

    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    function Picture(route, size) {
        if (route.indexOf('http') === 0) {
            return route;
        } else if (size) {
            return APP.API + route + '?media=' + size;
        } else {
            return APP.API + route;
        }
    }

    $rootScope.getPictures = function (model, size) {
        size;
        var src = '/img/preview.png';
        if (!model) {
            return src;
        }
        if (model.pictures) {
            for (var i = 0; i < model.pictures.length; i++) {
                var media = model.pictures[i];
                if (media.route) {
                    src = Picture(media.route, size);
                    i = 100000;
                }
            }
        } else if (model.route) {
            src = Picture(model.route, size);
        }
        return src;
    };

    $rootScope.getPicture = function (model, size) {
        size;
        var src = '/img/preview.png';
        if (!model) {
            return src;
        }
        if (model.picture && model.picture.route) {
            src = Picture(model.picture.route, size);
        } else if (model.route) {
            src = Picture(model.route, size);
        }
        return src;
    };

    $rootScope.broadcast = function (event, params) {
        $rootScope.$broadcast(event, params);
    };

}]);