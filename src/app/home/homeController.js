(function wrapper() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController(homeFactory, colorsEnum) {
    var vc = this;

    this.getFilterData = function getFilterData(){
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
    };

    this.mapName = function mapName(name, args){
      var data = args;
      var info = [];
      angular.forEach(data, function(item){
        info.push(item[name])
      })
      return info;
    }

    this.sumClients = function sumClients(list) {
      var num = 0;
      angular.forEach(list, function(item){
        num += item.clientes;
      })
      return num;
    }

    this.getColor = function getColor(color) {
      var col = {};
      col['border-color'] = ' ' + this.colorsCharts[color];
      return col;
    }

    google.charts.load("current", {packages:["corechart"]});

    function drawChart(info) {
      var mapInfo = [['Productos', 'Total de clientes']];
      vc.colorsCharts = [];

      angular.forEach(info, function (item){
        mapInfo.push([item.nombre, item.clientes]);
        vc.colorsCharts.push(colorsEnum[item.tipoProducto]);
      })

      var data = google.visualization.arrayToDataTable(mapInfo);

      var options = {
        title: 'Productos',
        pieHole: 0.5,
        colors: vc.colorsCharts,
        titleTextStyle: {
          fontSize: 24,
          bold: true
        },
        pieStartAngle: 100
      };

      vc.showGraph = true;
      var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
      chart.draw(data, options);
    }

    this.initCharts = function initCharts(data){
      google.charts.setOnLoadCallback(drawChart(data));
    }


    this.getFilterData();

  }
  HomeController.prototype.afterGetClients = function afterGetClients(data) {
    this.products = this.mapName('nombre', data.listaProductos);
    this.porcentaje = data.porcentaje;
    this.version = data.version;
    this.totalClients = this.sumClients(data.listaProductos);
    this.initCharts(data.listaProductos);
  };
})();