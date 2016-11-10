# Factoría: CacheService

## Descripción

Factoría que implementa el servicio del core de ángular $cacheFactory. Crea el nameSpace cacheData para compartir información entre controladores, providers, factorías y servicios.

## Implementación

Debe ser inyectado en algún controlador, provider, factoría o servicio donde se require almacenar información en caché y trasladarla a otro nameSpace (controlador, provider, ...).

Controlador donde se almacena en caché el objeto emailRemember

```javascript
function RecoveryModalController($scope, $modalInstance, modalMessage, patterns, cacheService) {
  $scope.modalMessage = modalMessage;

  $scope.patterns = {
    emailRemember: patterns.email
  };

  $scope.accept = function () {
    cacheService.put('emailRemember', $scope.emailRemember);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}
```

Controlador donde se recupera el objeto emailRemember
```javascript
function LoginController(directiveTemplate, modal, patterns, loginService, cacheService) {
  var cacheData;

  this.request = {};

  this.patterns = {
    email: patterns.email,
    password: patterns.password
  };

  var sendEmailService = function sendEmailService(){   
    cacheData = cacheService.get('emailRemember');

    if (cacheData) {
      cacheService.remove('emailRemember');

      loginService
      .confirmEmail({
        params: {
          correoElectronico: cacheData
        }
      })
      .then(successConfirmation);  
    }
  };

  var successConfirmation = function successConfirmation() {      
    modal.open({
      error: cacheData,
      size: 'sm',
      templateUrl: '/access/login/modal-send-email.html'
    });
  };

  this.gotForgotPass = function gotForgotPass(options){
    modal.open({
      controller: 'RecoveryModalController',
      size: 'sm',
      templateUrl: '/access/login/modal-recovery-password.html'
    })
    .result.then(sendEmailService);
  };
}
```
