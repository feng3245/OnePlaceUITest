'use strict';

angular.module('cougarApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.router',
  'ui.select2',
  'currencyFilter',
  'angularFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .state('properties', {
        url: '/properties',
        templateUrl: 'views/properties.html',
        controller: 'PropertiesCtrl'
      })
        .state('property', {
          abstract: true,
          url: '/propertyDetails/:Uid',
          templateUrl: 'views/propertyDetails.html',
          controller: 'PropertyDetailsCtrl'
        })
          .state('property.kpis', {
            url: '/kpis',
            templateUrl: 'views/property.kpis.html',
            controller: 'KpiCtrl'
          })
          .state('property.edit', {
            url: '',
            templateUrl: 'views/property.edit.html',
            controller: 'PropertyDetailsCtrl'
          })
          .state('property.reports', {
            url: '/reports',
            templateUrl: 'views/reports.html',
            controller: 'ReportsCtrl'
          })
            .state('report', {
              url: '/reports/:name',
              templateUrl: 'views/reportDetails.html',
              controller: 'ReportDetailsCtrl'
            })
          .state('property.leases', {
            url: '/leases',
            templateUrl: 'views/leases.html',
            controller: 'LeasesCtrl'
          })
          .state('property.abstractLoans', {
            url: '/abstractLoans',
            templateUrl: 'views/propertyLoans.html',
            controller: 'PropertyLoansCtrl'
          })
          .state('property.notes', {
            url: '/notes',
            templateUrl: 'views/notes.html',
            controller: 'NotesCtrl'
          })
          .state('property.workflow', {
            url: '/workflow/:model',
            templateUrl: 'views/workflow.html',
            controller: 'WorkflowCtrl'
          })
          .state('property.models', {
            url: '/models',
            templateUrl: 'views/models.html',
            controller: 'ModelsCtrl'
          })
          .state('property.loans', {
            url: '/loans',
            templateUrl: 'views/loans.html',
            controller: 'LoansCtrl'
          })
            .state('property.loanDetails', {
              url: '/loans/:loan_id',
              templateUrl: 'views/loanDetails.html',
              controller: 'LoanDetailsCtrl'
            })

      .state('portfolios', {
        url: '/portfolios',
        templateUrl: 'views/portfolios.html',
        controller: 'PortfoliosCtrl'
      })
        .state('portfolio', {
          abstract: true,
          url: '/portfolioDetails/:Uid',
          templateUrl: 'views/portfolioDetails.html',
          controller: 'PortfoliodetailsCtrl'
        })
        .state('portfolio.edit', {
          url: '',
          templateUrl: 'views/portfolio.edit.html'
        })
        .state('portfolio.properties', {
          url: '/properties',
          templateUrl: 'views/properties.html',
          controller: 'PropertiesCtrl'
        })

      .state('loans', {
        url: '/loans',
        templateUrl: 'views/loans.html',
        controller: 'LoansCtrl'
      })

      .state('leases', {
        url: '/leases',
        templateUrl: 'views/leases.html',
        controller: 'LeasesCtrl'
      })

      .state('workflows', {
        url: '/workflows',
        templateUrl: 'views/workflows.html',
        controller: 'WorkflowsCtrl'
      });

      $urlRouterProvider.otherwise('/login');
  })
  .config(function($httpProvider){
    $httpProvider.interceptors.push('cougarHttpInterceptor');
  })
  .run(function ($http, $cookieStore, $rootScope, cougarConfig, $location, $state, Model){
    $rootScope.cougarConfig = cougarConfig;
    $rootScope.location = $location;
    $rootScope.isDemo = $location.host() == 'cougaroneplace.com' || $location.host() == 'www.cougaroneplace.com' || $location.host() == '127.0.0.2';
    $rootScope.$state = $state;
    $rootScope.models = Model.models();
    $rootScope.activeModel = { ModelName: 'Live', Code: 'LR' };

    $rootScope.getSystem = function(){
      $http.get('services/systemservice').success(function(data){
        $rootScope.system = data;
        $rootScope.activeModel = data.Models[0];
      });
    };

    var user = $cookieStore.get('User');
    if(user){
      $http.defaults.headers.common['Authorization'] = user['AccessToken'];
      $rootScope.user = user;
      $rootScope.getSystem();
    }

    $rootScope.logout = function(){
      $cookieStore.remove('User');
      $rootScope.user = undefined;
    };

    $rootScope.$cookieStore = $cookieStore;

    $rootScope.settings = { layout: $cookieStore.get('cgSettingsLayout') || 'List' };
    $rootScope.$watch('settings.layout', function(settings){
      $cookieStore.put('cgSettingsLayout', settings);
    });

    $rootScope.$http = $http;

    $rootScope.select2Options = {
      'multiple': true,
      'simple_tags': true,
      'placeholder': 'Tags',
      'tokenSeparators': [',', ' '],
      'tags': []
    };
  });
