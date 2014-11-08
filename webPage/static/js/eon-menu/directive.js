///modulo creado por: Gabriel isaac munoz garcia.
///PLEASE BE AWARE OF YOUR ACTION CODER.
///DESCRIPTCION: este modulo contiene la aplicacion, los controladores y las directivas
//necesarias para la creacion de un menu dinamico con n nivels de profundidad desde a partir de un json q llega desde le servidor
//esto con propostio de brindar informacion personalizada a cada 1.


//TENER EN CUENTA Q SE DEBE CREAR EL SERVICIO UNA VEZ ESTE DEFINIDA LA BASE DE DATOS PARA ESA ESTRUCTURA.

//directiva y controllador para etiqueta  EON-MENU.


        var App = angular.module('App', []);
		
		App.controller('Controller', ['$scope', function($scope) {

	    var convertJson= function(sourceList) {
		     // init
		var targetJson = [];
		var roots = { 0 : targetJson};

		// actual code:

		sourceList.forEach(function(item){
		  if (!roots[item.indent].splice){
		        roots[item.indent] = roots[item.indent].children = [];
		      }
		  roots[item.indent].push(item);


		  if (item.folder)
		      {
		        roots[+item.indent+1] = item;

		      }

		});

		  return targetJson;

  }

            $scope.menu = [
                { title: "home", url: "#" ,indent: "0",folder:true},
                { title: "games", url: "#" ,indent: "1",folder:false},
                { title: "books", url: "#" ,indent: "1",folder:false},
                { title: "researches", url: "#" ,indent: "1",folder:false},
                { title: "user", url: "#" ,indent: "0",folder:true },
                { title: "medals", url: "#" ,indent: "1",folder:false },
                { title: "stats", url: "#" ,indent: "1",folder:false },
                { title: "us", url: "#" ,indent: "0",folder:true },
                { title: "mision", url:"#" ,indent: "1", folder:false},
                { title: "vision", url:"#" ,indent: "1", folder:false},
            ];

            $scope.tree = convertJson($scope.menu);

}]);


App.directive('eonMenu', function($compile) {
			return {
						restrict: 'EC',
						template: '<div></div>',

						link:{

								post: function postLink(scope, iElement, iAttrs, controller) {


									var forEach = angular.forEach;

									function readTreeAngular(node,htmlElement) {
									    if(node.children){

									        var myTabElement = document.createElement('ul');

                                                htmlElement.appendChild(myTabElement);

                                                forEach(node.children,function(value){
                                                    var myPaneElement = document.createElement('li');
                                                    myTabElement.appendChild(myPaneElement);
                                                    /////////////////////////////////////////////
                                                    //ELEMENTS TO SHOW ON THE VIEW FROM JSON/////
                                                    myPaneElement.title = value.title;
                                                    myPaneElement.innerHTML = "<div class='"+node.title+"-icon'>"+"</div>";
                                                    readTreeAngular(value,myPaneElement);
                                                })

									    }else{
									       htmlElement.innerHTML ="<div class='"+node.title+"-icon'>"+"<a href="+node.url+">"+ node.title+"</a></div>";
									    }
									}
                                            scope.tabELement = document.createElement('ul');

                                            forEach(scope.tree,function(value){
                                                var myPaneElement = document.createElement('li');
                                                scope.tabELement.appendChild(myPaneElement);
                                                myPaneElement.title = value.title;
                                                myPaneElement.innerHTML = "<div class='"+value.title+"-icon'><a href='"+value.url+"'>"+value.title+"</a></div>"
                                                readTreeAngular(value,myPaneElement);

                                            });


                                            scope.to_render = angular.element(scope.tabELement);
                                            var clonedElement = $compile(scope.to_render)(scope);

                                            iElement.append(clonedElement);


                                            console.log(scope.tabELement);
                                            //console.log(scope.to_render);



								}

						
					          }
					};
			});

