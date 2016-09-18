angular.module('starter.controllers', ['ngCordova'])

.controller('IngresoCtrl', function($scope, $state) {
  $scope.usuario = {};
  $scope.usuario.nombre = "";
  $scope.Ingresar = function(){
    var param = JSON.stringify($scope.usuario);
    $state.go('tab.juego', {usuario:param});
  };
})

.controller('JuegoCtrl', function($scope, $state, $stateParams, $cordovaDeviceMotion, $cordovaMedia, $cordovaNativeAudio) {
  $scope.usuario = JSON.parse($stateParams.usuario);
  $scope.izquierda = 0;
  $scope.derecha = 0;
  $scope.arriba = 0;
  $scope.abajo = 0;
  $scope.bocaArriba = 0;
  $scope.bocaAbajo = 0;
  $scope.imagen = "img/sinMov.png"; 
  try
  {
    $cordovaNativeAudio
    .preloadSimple('arriba', 'audios/arriba.mp3')
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });

    $cordovaNativeAudio
    .preloadSimple('abajo', 'audios/abajo.mp3')
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });

    $cordovaNativeAudio
    .preloadSimple('izquierda', 'audios/izquierda.mp3')
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });

    $cordovaNativeAudio
    .preloadSimple('derecha', 'audios/derecha.mp3')
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });

    $cordovaNativeAudio
    .preloadSimple('bocaArriba', 'audios/bocaArriba.mp3')
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });

    $cordovaNativeAudio
    .preloadSimple('bocaAbajo', 'audios/bocaAbajo.mp3')
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      alert(error);
    });
  }
  catch(error)
  {
    console.log(error);
  }


  $scope.opciones = { frequency: 100 };
  $scope.ubicacion = {
      x : null,
      y : null,
      z : null,
      timestamp : null
  }
  
  $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.opciones);

  $scope.watch.then(
    null,
    function(error) {
    // An error occurred
    },
    function(result) {
      if(result.x > 10){
        $scope.ubicacion.x = 1;
        $scope.imagen = "img/izquierda.png"; 
        if ($scope.izquierda == 0)
        {
          $cordovaNativeAudio.play('izquierda');
          $scope.izquierda = 1;
        }
        $scope.derecha = 0;
        $scope.arriba = 0;
        $scope.abajo = 0;
        $scope.bocaArriba = 0;
        $scope.bocaAbajo = 0;

      }else if(result.x < -10){
        $scope.ubicacion.x = -1;
        $scope.imagen = "img/derecha.png"; 
        if ($scope.derecha == 0)
        {
          $cordovaNativeAudio.play('derecha');
          $scope.derecha = 1;
        }
        $scope.izquierda = 0;
        $scope.arriba = 0;
        $scope.abajo = 0;
        $scope.bocaArriba = 0;
        $scope.bocaAbajo = 0;
      }else{
        $scope.ubicacion.x = 0;
      }

      if(result.y > 10){
        $scope.ubicacion.y = 1;
        $scope.imagen = "img/abajo.png"; 
        if ($scope.abajo == 0)
        {
          $cordovaNativeAudio.play('abajo');  
          $scope.abajo = 1;
        }
        $scope.izquierda = 0;
        $scope.derecha = 0;
        $scope.arriba = 0;
        $scope.bocaArriba = 0;
        $scope.bocaAbajo = 0;      
      }else if(result.y < -10){
        $scope.ubicacion.y = -1;
        $scope.imagen = "img/arriba.png"; 
        if ($scope.arriba == 0)
        {
          $cordovaNativeAudio.play('arriba');
          $scope.arriba = 1;
        }
        $scope.izquierda = 0;
        $scope.derecha = 0;
        $scope.abajo = 0;
        $scope.bocaArriba = 0;
        $scope.bocaAbajo = 0;   

      }else{
        $scope.ubicacion.y = 0;
      }

      if(result.z > 10){
        $scope.ubicacion.z = 1;
        if ($scope.bocaArriba == 0)
        {
          $cordovaNativeAudio.play('bocaArriba');
          $scope.bocaArriba = 1;
        }
        $scope.izquierda = 0;
        $scope.derecha = 0;
        $scope.abajo = 0;   
        $scope.arriva = 0;
        $scope.bocaArriva = 0;

      }else if(result.z < -10){
        $scope.ubicacion.z = -1;
        if ($scope.bocaAbajo == 0)
        {
          $cordovaNativeAudio.play('bocaAbajo');
          $scope.bocaAbajo = 1;
        }
        $scope.izquierda = 0;
        $scope.derecha = 0;
        $scope.abajo = 0;   
        $scope.arriba = 0;
        $scope.bocaArriba = 0;

      }else{
        $scope.ubicacion.z = 0;
      }

      if ($scope.ubicacion.x == 0 && $scope.ubicacion.y == 0 && $scope.ubicacion.z == 1)
      {
        $scope.imagen = "img/sinMov.png"; 
      }

      var timeStamp = result.timestamp;
  });


})
.controller('GrabarCtrl', function($scope) {
})

.controller('PerfilCtrl', function($scope) {
});
