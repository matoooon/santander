(function wrapper() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController(homeFactory) {
    console.log('Home controller OK OK')
  	this.products = [{
  		name: 'Nómina',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Credito',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Seguro',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Paquetes',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Captación',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Lealtad',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Domicilación',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Paquetes',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Afiliación de canales',
  		value: '45%',
  		color: 'green'
  	}];

  	this.segments = [{
  		name: 'Select',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Preferente',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Clasico',
  		value: '45%',
  		color: 'green'
  	},{
  		name: 'Premier',
  		value: '45%',
  		color: 'green'
  	}];
    this.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    this.data = [300, 500, 100];
    homeFactory
      .attach(this)
      .getClients({
        listasSegmentos :[{
          nombre:"select",
          clientes:"200"
        }],
        listaProducto:[{
          nombre:"TDC",
          clientes:"200"
        }]})
      .then(this.afterGetClients.bind(this));

  }
  HomeController.prototype.afterGetClients = function afterGetClients(data) {
    console.log("Resultados: ", data);
  };
})();