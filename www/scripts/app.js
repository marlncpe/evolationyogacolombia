'use strict';
angular.module('main', [
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'toastr',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('main', {
      url: '/',
      templateUrl: 'main/templates/main.html',
      controller: 'HomeCtrl'
    })

    ;
});
'use strict';
angular.module('main')
.controller('HomeCtrl', function ($scope, $http, $location, $rootScope,$window) {

  $scope.vm={
    aceptacion:false,
    apellidos:null,
    documentonumero:null,
    nombres:null,
    telefono:null,
    tipodoc:null,
    email:null
  }
  $scope.tdc={
    numerotarjeta:null,
    mes:null,
    ano:null,
    tipotarjeta:null,
    direccion:null
  }

  $scope.validarData = function(vm){
    if ( (vm.nombres === "") || (vm.nombres === null) ){
      $scope.errornombre = "Debes colocar tus nombres completos"
      //console.log($scope.errornombre)
      $scope.nombres = false
    }else{
      $scope.nombres = true
      $scope.errornombre =""
    }

    if ( (vm.apellidos === "") || (vm.apellidos === null) ){
      $scope.errorapellidos = "Debes colocar tus apellidos completos"
      //console.log($scope.errorapellidos)
      $scope.apellidos = false
    }else{
      $scope.apellidos = true
      $scope.errorapellidos =""
    }

    if ( (vm.documentonumero === "") || (vm.documentonumero === null) ){
      $scope.errornumerodocumento = "No puedes tener documento en blanco"
      //console.log($scope.errornumerodocumento)
      $scope.numeroDocumento = false
    }else{
      $scope.numeroDocumento = true 
      $scope.errornumerodocumento =""
    }

    if ( (vm.telefono === "") || (vm.telefono === null) ){
      $scope.errorcelular = "Debes colocar tu numero telefono celular"
      //console.log($scope.errorcelular)
      $scope.celular = false
    }else{
      $scope.celular = true
      $scope.errorcelular =""
    }

    if ( (vm.aceptacion === "") || (vm.aceptacion === false) ){
      $scope.erroraceptacion = "Debes aceptar los terminos y condiciones"
      //console.log($scope.erroraceptacion)
      $scope.aceptacion = false
    }else{
      $scope.aceptacion = true
      $scope.erroraceptacion =""
    }

    if ( (vm.email === "") || (vm.email === null) ){
      $scope.erroremail = "Debes escribir tu correo"
      //console.log($scope.erroremail)
      $scope.email = false
    }else{
      $scope.email = true
      $scope.erroremail =""
    }

    if ( (vm.tipodoc === "") || (vm.tipodoc === null) ){
      $scope.errortipodoc = "Debes seleccionar algun tipo de documento"
      //console.log($scope.errortipodoc)
      $scope.tipoDoc = false
    }else{
      $scope.tipoDoc = true
      $scope.errortipodoc =""
    }
  }

  $scope.validateCard = function(tdc){
    //validar numerode tarjeta
    if ( (tdc.numerotarjeta === "") || (tdc.numerotarjeta === null) ){
      $scope.errornumerotarjeta = "Debes seleccionar algun tipo de documento"
      //console.log($scope.errortipodoc)
      $scope.numerotarjeta = false
    }else{
      $scope.numerotarjeta = true
      $scope.errornumerotarjeta =""
    }
    //validar mes
    if ( (tdc.mes === "") || (tdc.mes === null) ){
      $scope.errormes = "Debes seleccionar algun tipo de documento"
      //console.log($scope.errortipodoc)
      $scope.mes = false
    }else{
      $scope.mes = true
      $scope.errormes =""
    }
    //validar año
    if ( (tdc.ano === "") || (tdc.ano === null) ){
      $scope.errorano = "Debes seleccionar algun tipo de documento"
      //console.log($scope.errortipodoc)
      $scope.ano = false
    }else{
      $scope.ano = true
      $scope.errorano =""
    }
    //validar tipo tarjeta
    if ( (tdc.tipotarjeta === "") || (tdc.tipotarjeta === null) ){
      $scope.errortipotarjeta = "Debes seleccionar algun tipo de documento"
      //console.log($scope.errortipodoc)
      $scope.tipotarjeta = false
    }else{
      $scope.tipotarjeta = true
      $scope.errortipotarjeta =""
    }
    //validar direccion
    if ( (tdc.direccion === "") || (tdc.direccion === null) ){
      $scope.errordireccion = "Debes seleccionar algun tipo de documento"
      //console.log($scope.errortipodoc)
      $scope.direccion = false
    }else{
      $scope.direccion = true
      $scope.errordireccion =""
    }

  }
  $scope.registrarUsuarioPayu = function(vm,tdc){
    //console.log(vm)
    $scope.validarData(vm)
    $scope.validateCard(tdc)
    if( ($scope.tipoDoc===true)&&($scope.email===true)&&($scope.aceptacion===true)&&($scope.apellidos===true)&&($scope.nombres===true) ){
      console.log("califica para evaluar el regisro de usuarios")
      ///*
      $http({
        method : "POST",
        url : "https://api.payulatam.com/payments-api/rest/v4.9/customers/",
        headers: {
          "authorization":"Basic ZVoyOTY0bGdGSUM1U0xzOm1zNDN1MzhmR0R3cDk1bFAyVmVHMjB6SFJU",
          "Content-Type": "application/json;charset=utf-8",
          "Accept": "application/json",
          "Accept-Language": "es"
        },
        data:{
         "fullName": vm.nombres + " "+ vm.apellidos ,
         "email": vm.email
        }
      }).then(function mySuccess(response) {

        console.log(response.data.id)
        var tokenUser = response.data.id
        if( ($scope.numerotarjeta===true)&&($scope.mes===true)&&($scope.ano===true)&&($scope.tipotarjeta===true)&&($scope.direccion===true)&&($scope.celular===true)&&($scope.numeroDocumento===true) ){
          $http({
            method : "POST",
            url : "https://api.payulatam.com/payments-api/rest/v4.9/customers/" + response.data.id +"/creditCards",
            headers: {
              "authorization":"Basic ZVoyOTY0bGdGSUM1U0xzOm1zNDN1MzhmR0R3cDk1bFAyVmVHMjB6SFJU",
              "Content-Type": "application/json;charset=utf-8",
              "Accept": "application/json",
              "Accept-Language": "es"
            },
            data:{
              "name": vm.nombres + " "+ vm.apellidos ,
              "document": vm.documentonumero,
              "number": tdc.numerotarjeta,
              "expMonth": tdc.mes,
              "expYear": tdc.ano,
              "type": tdc.tipotarjeta,
              "address": {
                "line1": tdc.direccion,
                "line2": "",
                "line3": "",
                "postalCode": "00000",
                "city": "Bogotá",
                "state": "Bogotá",
                "country": "CO",
                "phone": vm.celular
              }
            }
          }).then(function mySuccess(responseTdc) {
            console.log(responseTdc)
            var tokenTdc = responseTdc.data.token
            $http({
              method:"POST",
              url : "https://api.payulatam.com/payments-api/rest/v4.9/subscriptions/",
              headers: {
                "authorization":"Basic ZVoyOTY0bGdGSUM1U0xzOm1zNDN1MzhmR0R3cDk1bFAyVmVHMjB6SFJU",
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "application/json",
                "Accept-Language": "es"
              },
              data:{
                "quantity": "1",
                "installments": "1",
                "trialDays": "10",
                "customer": {
                  "id": tokenUser,
                  "creditCards": [
                    {
                      "token": tokenTdc
                    }
                  ]
                },
                "plan": {
                  "planCode": "100"
                }
              }
            }).then(function mySuccess(responseSub) {
              console.log(responseSub)
              alert("estas subscrito al plan premium, te estamos redirigiendo a nuestra web principal")
              $window.location.href = 'http://www.evolationyogacolombia.com/';
             }, function myError(response) {
              //$scope.myWelcome = response.statusText;
              console.log(response.data);
            });

           }, function myError(response) {
            //$scope.myWelcome = response.statusText;
            console.log(response.data);
          });
        }
      }, function myError(response) {
        //$scope.myWelcome = response.statusText;
        console.log(response.data);
      });
      //*/
    }


  }

});

'use strict';
angular.module('main')
//.constant('malarkey', malarkey)
//.constant('moment', moment);
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    //inject-env//
    'SERVER_URL': 'https://DEVSERVER/api',
    'SOME_OTHER_URL': '/postman-proxy'
    //endinject//
  },

  // gulp build-vars: injects build vars
  BUILD: {
    //inject-build//
    //endinject//
  }
});

'use strict';
angular.module('apiscat', [
  // load your modules here
  'main'
]);
