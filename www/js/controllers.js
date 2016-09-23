angular.module('starter.controllers', ['ngCordova'])

.controller('IngresoCtrl', function($scope, $state) {
  $scope.usuario = {};
  $scope.usuario.nombre = "";
  $scope.Ingresar = function(){
    var param = JSON.stringify($scope.usuario);
    $state.go('tab.juego', {usuario:param});
  };
})

.controller('JuegoCtrl', function($scope, $state, $stateParams, $ionicPlatform, $cordovaDeviceMotion, $cordovaNativeAudio, $cordovaMedia) {
  $scope.usuario = JSON.parse($stateParams.usuario);
  $scope.activos = {izquierda: 0, derecha: 0, parado: 0, acostado: 0, bocaAbajo:0};
  $scope.existeAudio = {izquierda: 0, derecha: 0, parado: 0, acostado: 0, bocaAbajo:0};
  $scope.imagen = "img/sinMov.png"; 
  try
  {
    $cordovaNativeAudio
    .preloadSimple('parado', 'audios/parado.mp3')
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
    .preloadSimple('acostado', 'audios/acostado.mp3')
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

  $ionicPlatform.ready(function() {
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
          if ($scope.activos["izquierda"] == 0)
          {
            if ($scope.existeAudio["izquierda"] == 1)
              $scope.audioIzquierda.play(); 
            else
              $cordovaNativeAudio.play('izquierda');

            $scope.activos = {izquierda: 1, derecha: 0, parado: 0, acostado: 0, bocaAbajo:0};
          }
        }else if(result.x < -10){
          $scope.ubicacion.x = -1;
          $scope.imagen = "img/derecha.png"; 
          if ($scope.activos["derecha"] == 0)
          {
            if ($scope.existeAudio["derecha"] == 1)
              $scope.audioDerecha.play(); 
            else
              $cordovaNativeAudio.play('derecha');
            $scope.activos = {izquierda: 0, derecha: 1, parado: 0, acostado: 0, bocaAbajo:0};
          }
        }else{
          $scope.ubicacion.x = 0;
        }

        if(result.y > 10){
          $scope.ubicacion.y = 1;
          $scope.imagen = "img/parado.png"; 
          if ($scope.activos["parado"] == 0)
          {
            if ($scope.existeAudio["parado"] == 1)
              $scope.audioParado.play(); 
            else
              $cordovaNativeAudio.play('parado');

            $scope.activos = {izquierda: 0, derecha: 0, parado: 1, acostado: 0, bocaAbajo:0};
          }   
        }else if(result.y < -10){
          $scope.ubicacion.y = -1;
          $scope.imagen = "img/parado.png"; 
          if ($scope.activos["parado"] == 0)
          {
            if ($scope.existeAudio["parado"] == 1)
              $scope.audioParado.play(); 
            else
              $cordovaNativeAudio.play('parado');
            $scope.activos = {izquierda: 0, derecha: 0, parado: 1, acostado: 0, bocaAbajo:0};
          }
        }else{
          $scope.ubicacion.y = 0;
        }

        if(result.z > 10){
          $scope.ubicacion.z = 1;
          if ($scope.activos["acostado"] == 0)
          {
            if ($scope.existeAudio["acostado"] == 1)
              $scope.audioAcostado.play(); 
            else
              $cordovaNativeAudio.play('acostado');
            $scope.activos = {izquierda: 0, derecha: 0, parado: 0, acostado: 1, bocaAbajo:0};
          }
        }else if(result.z < -10){
          $scope.ubicacion.z = -1;
          if ($scope.activos["bocaAbajo"] == 0)
          {
            if ($scope.existeAudio["bocaAbajo"] == 1)
              $scope.audioBocaAbajo.play(); 
            else
              $cordovaNativeAudio.play('bocaAbajo');
            $scope.activos = {izquierda: 0, derecha: 0, parado: 0, acostado: 0, bocaAbajo:1};
          }
        }else{
          $scope.ubicacion.z = 0;
        }

        if ($scope.ubicacion.x == 0 && $scope.ubicacion.y == 0 && $scope.ubicacion.z == 1)
        {
          $scope.imagen = "img/sinMov.png"; 
        }

        var timeStamp = result.timestamp;
    });
  });
  $scope.GrabarAudio = function(opcion){

    $ionicPlatform.ready(function() {
      try{
        switch (opcion)
        {
          case "izquierda":
              $scope.audioIzquierda = $cordovaMedia.newMedia("izquierda.mp3");
              $scope.audioIzquierda.startRecord();
              break;  
          case "derecha":
              $scope.audioDerecha = $cordovaMedia.newMedia("derecha.mp3");
              $scope.audioDerecha.startRecord();
              break;  
          case "parado":
              $scope.audioParado = $cordovaMedia.newMedia("parado.mp3");
              $scope.audioParado.startRecord();
              break;  
          case "acostado":
              $scope.audioAcostado = $cordovaMedia.newMedia("acostado.mp3");
              $scope.audioAcostado.startRecord();
              break;  
          case "bocaAbajo":
              $scope.audioBocaAbajo = $cordovaMedia.newMedia("bocaAbajo.mp3");
              $scope.audioBocaAbajo.startRecord();
              break;  
        }
      } 
      catch(error){
        alert(error);
      }
    });
  }

  $scope.DetenerAudio = function(opcion){
    $ionicPlatform.ready(function() {
      try{
        switch (opcion)
        {
          case "izquierda":
              $scope.audioIzquierda.stopRecord();
              $scope.existeAudio["izquierda"] = 1;
              break;
          case "derecha":
              $scope.audioDerecha.stopRecord();
              $scope.existeAudio["derecha"] = 1;
              break;
          case "parado":
              $scope.audioParado.stopRecord();
              $scope.existeAudio["parado"] = 1;
              break;
          case "abajo":
              $scope.audioAbajo.stopRecord();
              $scope.existeAudio["abajo"] = 1;
              break;
          case "acostado":
              $scope.audioAcostado.stopRecord();
              $scope.existeAudio["acostado"] = 1;
              break;
          case "bocaAbajo":
              $scope.audioBocaAbajo.stopRecord();
              $scope.existeAudio["bocaAbajo"] = 1;
              break;
        }
      } 
      catch(error){
        alert(error);
      }
    });
  }
})

.controller('PerfilCtrl', function($scope) {
});
