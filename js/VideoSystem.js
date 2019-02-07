"use strict";
function VideoSystemException() {
	this.name = "VideoSystemException";
	this.message = "Error: Image Manger Generic Exception.";
}
VideoSystemException.prototype = new BaseException(); //Heredamos de BaseException
VideoSystemException.prototype.constructor = VideoSystemException;

function InvalidAccessMethodException() {
	this.name = "InvalidAccessMethodException";
	this.message = "Error: El objeto no puede acceder a este método.";
}
InvalidAccessMethodException.prototype = new VideoSystemException(); //Heredamos de VideoSystem Exception
InvalidAccessMethodException.prototype.constructor = InvalidAccessMethodException;

function RepeatException(elem) {
	this.name = "RepeatException";
	this.message = "Error: El "+ elem +" ya existe.";
}
RepeatException.prototype = new VideoSystemException(); //Heredamos de VideoSystem Exception
RepeatException.prototype.constructor = RepeatException;

function NotExistException(elem) {
	this.name = "NotExistException";
	this.message = "Error: El "+ elem +" no existe.";
}
NotExistException.prototype = new VideoSystemException(); //Heredamos de VideoSystem Exception
NotExistException.prototype.constructor = NotExistException;

var VideoSystem = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	var instantiated; //Objeto con la instancia única VideoSystem

	function init() { //Inicialización del Singleton

		//Declaración de la función constructora de la instancia VideoSystem
		function VideoSystem(){
			//La función se invoca con el operador new
			if (!(this instanceof VideoSystem)) 
				throw new InvalidAccessConstructorException();
			// Tributo name
			var _name;
			Object.defineProperty(this, 'name', {
				get: function(){
					return _name;
				},
				set: function(value){
					//Name no puede estar vacio
					if (!value|| value == '') throw new EmptyValueException("name");
					_name=value;
				}
			});
			//Definición de users
			var _users = [];
			//Devuelve un iterator de los usuarios del gestor
			Object.defineProperty(this, 'users', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _users.length ?
				               {value: _users[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Si el username devuelve true
			function userExistUsername(user){
				var e = false;
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username === user.username){
						e = true;
					}
				}
				return e;
			}
			//Si existe Email devuelve true
			function userExistEmail(user){
				var e = false;
				for(var i = 0; i<_users.length; i++){
					if(_users[i].email == user.email){
						e = true;
					}
				}	
				return e;
			}
			function getUserPosition(user){
				var post=-1;
				for(var i = 0; i<_users.length; i++){
					if(_users[i].username === user.username){ //Busco el indice del elemento que me han pasado
						post=i;
					}
				}
				return post;
			}
			//Dado un autor, devuelve la posición de ese autor en el array de autores.
			this.addUser = function(user){
				//user tiene que ser un objeto tipo User.
				if (!(user instanceof User)) { 
					throw new InvalidAccessMethodException();
				}		

				//User no puede estar vacio.
				if (!user|| user === '') throw new EmptyValueException("user");

				//Busco que no exista el username que me han pasado.
				var t = userExistUsername(user);
				if(t){
					throw new RepeatException("username");
				}
				
				//Busco que no exista el email que me han pasado.
				if(userExistEmail(user)){
					throw new RepeatException("email");
				}	
				//Si todo va bien añado el usuario
				_users.push(user);
				//Devuelvo el número de elementos del array _users
				return _users.length;
			}	
			//Borro el usuario que me han pasado por el parametro
			this.removeUser = function(user){
				//user tiene que ser un objeto tipo User.
				if (!(user instanceof User)) { 
					throw new InvalidAccessMethodException();
				}		

				//User no puede estar vacio.
				if (!user|| user == '') throw new EmptyValueException("user");

				//Busco que no exista el username que me han pasado
				if(!userExistUsername(user)){
					throw new NotExistException("user");
				}
				//Si todo va bien añado el usuario
				var post= getUserPosition(user)//Busco el indice del elemento que me han pasado
				_users.splice(post,1);
				//Devuelvo el número de elementos del array _users.
				return _users.length;
			}	
			//Empezamos con directores.
			var _directores = [];
			//Devuelve un iterator de los directores del gestor.
			Object.defineProperty(this, 'directores', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _directores.length ?
				               {value: _directores[nextIndex++].director, done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el director
			function directorExist(director){
				var e = false;
				for(var i = 0; i<_directores.length; i++){
					//Compruebo que nombre y apellido porque es muy raro que el nombre y el apellido sea el mismo.
					if(_directores[i].name === director.name && _directores[i].lastname1 === director.lastname1){
						e = true;
					}
				}
				return e;
			}
			//Devuelve la posición del elemento pasado.
			function getDirectorPosition(director){
				for(var i = 0; i<_directores.length; i++){
					if(_directores[i].director.name === director.name && _directores[i].director.lastname1 === director.lastname1){ 
						return i;
					}
				}
				return -1;
			}
			
			//Dado un director, devuelve la posición del director en el array de directores.
			this.addDirector = function (director){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");

				//Busco si existe el director.
				if(directorExist(director)){
					throw new RepeatException("director");
				}
				//Si todo va bien añado el director.
				_directores.push(
					{director: director,
					dProductions:[] }
				);
				//Devuelvo el número de elementos del array _directores.
				return _directores.length;
			}
			this.removeDirector = function (director){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");

				//Busco que no exista el director que me han pasado.
				if(getDirectorPosition(director)===-1){
					throw new NotExistException("director");
				}
				//Si todo va bien añado el direcctor.
				var post = getDirectorPosition(director);//Busco el indice del elemento.
				_directores.splice(post,1);
				//Devuelvo el número de elementos del array de directores.
				return _directores.length;
			}
			
			var _productions = [];
			//Devuelve un iterator de los productions del gestor.
			Object.defineProperty(this, 'productions', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _productions.length ?
				               {value: _productions[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el production.
			function productionExist(production){
				var e = false;
				for(var i = 0; i<_productions.length; i++){ //Compruebo que no se repite el título.
					if(_productions[i].title === production.title){
						e = true;
					}
				}
				return e;
			}
			function getProductionPosition(production){
				for(var i = 0; i<_productions.length; i++){
					if(_productions[i].title === production.title){ 
						return i;
					}
				}
			}
			//Dado un production, devuelve la posición de esa producción en el array de producciones.
			this.addProduction = function (production){
				//El parametro que me pasan tiene que ser un objeto tipo Production.
				if (!(production instanceof Production)) { 
					throw new InvalidAccessMethodException();
				}		
				//production no puede estar vacio.
				if (!production || production === '') throw new EmptyValueException("production");

				//Busco si existe el production.
				if(productionExist(production)){
					throw new RepeatException("production");
				}
				//Si todo va bien añado el production.
				_productions.push(production);
				//Devuelvo el número de elementos que tiene el array _productions.
				return _productions.length;
			}
			//Borrar una producción del array _productions.
			this.removeProduction = function (production){
				//El parametro que me pasan tiene que ser un objeto tipo Production.
				if (!(production instanceof Production)) { 
					throw new InvalidAccessMethodException();
				}		
				//production no puede estar vacio.
				if (!production || production === '') throw new EmptyValueException("production");

				//Busco que no exista el production que me han pasado.
				if(!productionExist(production)){
					throw new NotExistException("production");
				}
				//Si todo va bien añado la producción.
				var post = getProductionPosition(production);//Busco el indice del elemento que me han pasado.
				_productions.splice(post,1);
				//Devuelvo el número de elementos del array de producciones.
				return _productions.length;
			}
			
			var _actors = [];
			//Devuelve un iterator de los actors del gestor.
			Object.defineProperty(this, 'actors', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _actors.length ?
				               {value: _actors[nextIndex++].actor, done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el actor.
			function actorExist(actor){
				var e = false;
				for(var i = 0; i<_actors.length; i++){ //Compruebo que no se repite el nombre y apellido.
					if(_actors[i].actor.name === actor.name && _actors[i].actor.lastname1 === actor.lastname1){
						e = true;
					}
				}
				return e;
			}
			function getActorPosition(actor){
				for(var i = 0; i<_actors.length; i++){
					if(_actors[i].actor.name === actor.name && _actors[i].actor.lastname1 === actor.lastname1){ 
						return i;
					}
				}
				return -1;
			}
			//Dado un actor, devuelve la posición de ese autor en el array de autores.
			this.addActor = function (actor){
				//El parametro que me pasan tiene que ser un objeto tipo actor.
				if (!(actor instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//actor no puede estar vacio.
				if (!actor || actor === '') throw new EmptyValueException("actor");

				//Busco si existe el actor.
				if(actorExist(actor)){
					throw new RepeatException("actor");
				}
				//Si todo va bien añado el actor.
				_actors.push({
					actor: actor,
					aProductions:[]});
				//Devuelvo el número de elementos que tiene el array _actors.
				return _actors.length;
			}
			//Borrar un actor del array _actors.
			this.removeActor = function (actor){
				//El parametro que me pasan tiene que ser un objeto tipo Person.
				if (!(actor instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//actor no puede estar vacio.
				if (!actor || actor === '') throw new EmptyValueException("actor");

				//Busco que no exista el actor que me han pasado.
				if(!actorExist(actor)){
					throw new NotExistException("actor");
				}
				//Si todo va bien añado el usuario.
				for(var i = 0; i<_actors.length; i++){
					if(_actors[i].name === actor.name && _actors[i].lastname1 === actor.lastname1){ 
						//Busco el indice del elemento que me han pasado comparando nombre y el primer apellido.						//Busco el indice del elemento que me han pasado comparando el título.
						_actors.splice(i,1);
					}
				}
				//Devuelvo el número de elementos del array de actores.
				return _actors.length;
			}
			var _categorias = [];
			//Devuelve un iterator de categorias
			Object.defineProperty(this, 'categorias', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _categorias.length ?
				               {value: _categorias[nextIndex++].categoria, done: false} :
				               {done: true};
				       }
				    }
				}	
			});
			//Devuelve true si existe el categoria.
			function getCategoryPosition(categoria){
				for(var i = 0; i<_categorias.length; i++){ //Compruebo que no se repite el nombre.
					if(_categorias[i].categoria.name === categoria.name){
						return i;
					}
				}
				return -1;
			}
			//Dado un categoria, devuelve la posición de esa categoria en el array de categorias.
			this.addCategory = function (categoria){
				//El parametro que me pasan tiene que ser un objeto tipo categoria.
				if (!(categoria instanceof Category)) { 
					throw new InvalidAccessMethodException();
				}		
				//categoria no puede estar vacio.
				if (!categoria || categoria === '') throw new EmptyValueException("categoria");

				//Busco si existe el categoria.
				if(getCategoryPosition(categoria) !== -1){
					throw new RepeatException("categoria");
				}
				//Si todo va bien añado el categoria.
				_categorias.push(
					{categoria:categoria,
					cProductions:[]}
				);
				//Devuelvo el número de elementos que tiene el array _categorias.
				return _categorias.length;
			}
			//Borrar una categoría del array _categorias.
			this.removeCategory = function (categoria){
				//El parametro que me pasan tiene que ser un objeto tipo categoria.
				if (!(categoria instanceof Category)) { 
					throw new InvalidAccessMethodException();
				}		
				//categoria no puede estar vacio.
				if (!categoria || categoria === '') throw new EmptyValueException("categoria");

				//Busco que no exista el categoria que me han pasado.
				if(getCategoryPosition(categoria)===-1){
					throw new NotExistException("categoria");
				}
				//Si todo va bien lo añado.
				var post = getCategoryPosition(categoria); 
				//Busco el indice del elemento que me han pasado comparando el nombre.
				_categorias.splice(post,1);
				//Devuelvo el número de elementos del array de categoria.
				return _categorias.length;
			}
			//Fin de adds and removes
			function getProPosition(production, categoryProduction){
				if (!(production instanceof Production)) { 
					throw new ProductionVideoSystemException();
				}		
				for(var i=0; i<categoryProduction.length; i++){
					if(categoryProduction[i].title === production.title){
						return i;
					}
				}
				return -1;		
			}
			function getProPositionActor(production, actorProduction){
				if (!(production instanceof Production)) { 
					throw new ProductionVideoSystemException();
				}		
				for(var i=0; i<actorProduction.length; i++){
					if(actorProduction[i].Production.title === production.title){
						return i;
					}
				}
				return -1;		
			}
        	this.assignDirector = function (director, production){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");
				//Si el director no existe lo añado.
				var directorPosition = getDirectorPosition(director);
                if (directorPosition === -1) {
                    this.addDirector(director);
                }
				//production no puede estar vacio.
				if (!production|| production === '') throw new EmptyValueException("productions");
				//Si no existe se añade.
				if(Array.isArray(production)){
					for(var i=0;i<production.length;i++){ //Por si en el array que me pasan no hay una producción.
						if(!productionExist(production[i])){
							this.addProduction(production[i]);
						}
					}
				}else if(!productionExist(production)){
					this.addProduction(production);
				}
				//Añadimos al director la/las producciones.
				var directorPosition = getDirectorPosition(director);
				if(Array.isArray(production)){
					for(var i=0; i<production.length; i++){
						var posProduction = getProPosition(production[i], _directores[directorPosition].dProductions);
						if (posProduction !== -1) {
							console.log("La producción "+ production[i].title +" ya está asignada");
						}else{
							_directores[directorPosition].dProductions.push(production[i]);
						}
					}
				}else{
					var posProduction = getProPosition(production, _directores[directorPosition].dProductions);
					if (posProduction !== -1) {
						throw new ExistException(director);
					}
					_directores[directorPosition].dProductions.push(production);
				}
				return _directores[directorPosition].dProductions.length;
			}
			this.deassignDirector = function (director, production){
				//director tiene que ser un objeto tipo Person.
				if (!(director instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//director no puede estar vacio.
				if (!director|| director === '') throw new EmptyValueException("director");
				
                //Obtenemos posición del director, si no existe se lanza excepcion.
                var directorPosition = getDirectorPosition(director);
                if (directorPosition === -1) {
                    throw new NotExistException();
                }
				//Obtenemos posición de la production en el director, si no existe se lanza excepcion.
				directorPosition = getDirectorPosition(director);
				if(Array.isArray(production)){
					for(var i=0; i<production.length; i++){
						var positionPro = getProPosition(production[i], _directores[directorPosition].dProductions);
						if (positionPro === -1) {
							console.log("No existe la producción "+production[i].title);  
						}else{
							_directores[directorPosition].dProductions.splice(positionPro, 1);							
						}
					}
					
				}else{
					directorPosition = getDirectorPosition(director);
					var positionPro = getProPosition(production, _directores[directorPosition].dProductions);
					if (positionPro === -1) {
						throw new NotExistException(production.title);  
					}
					_directores[directorPosition].dProductions.splice(positionPro, 1);
				}
				return _directores[directorPosition].dProductions.length;
			}
			this.assignCategory = function (categoria, production){
				//categoria tiene que ser un objeto tipo CAtegory.
				if (!(categoria instanceof Category)) { 
					throw new InvalidAccessMethodException();
				}		
				//categoria no puede estar vacio.
				if (!categoria|| categoria === '') throw new EmptyValueException("categoria");
				//Si el categoria no existe lo añado.
				var categoriaPosition = getCategoryPosition(categoria);
                if (categoriaPosition === -1) {
                    this.addCategory(categoria);
                }
				//categoria no puede estar vacio.
				if (!categoria|| categoria === '') throw new EmptyValueException("categoria");
				//Si no existe se añade.
				if(Array.isArray(production)){
					for(var i=0;i<_productions.length;i++){ //Por si en el array que me pasan no hay una producción.
						if(!productionExist(production)){
							this.addProduction(production);
						}
					}
				}else if(!productionExist(production)){
					this.addProduction(production);
				}
				//Añadimos al categoria la/las producciones.
				var categoriaPosition = getCategoryPosition(categoria);
				var posProduction = getProPosition(production, _categorias[categoriaPosition].cProductions);
                if (posProduction !== -1) {
					throw new NotExistException(categoria);
                }
				_categorias[categoriaPosition].cProductions.push(production);
				return _categorias[categoriaPosition].cProductions.length;
			}
			this.deassignCategory = function (categoria, production){
				//categoria tiene que ser un objeto tipo Categoria.
				if (!(categoria instanceof Category)) { 
					throw new InvalidAccessMethodException();
				}		
				//categoria no puede estar vacio.
				if (!categoria|| categoria === '') throw new EmptyValueException("categoria");
				
                //Obtenemos posición del categoria, si no existe se lanza excepcion.
                var categoriaPosition = getCategoryPosition(categoria);
                if (categoriaPosition === -1) {
                    throw new NotExistException();
                }
				//Obtenemos posición de la production en el categoria, si no existe se lanza excepcion.
				categoriaPosition = getCategoryPosition(categoria);
				if(Array.isArray(production)){
					for(var i=0; i<production.length; i++){
						var positionPro = getProPosition(production[i], _categorias[categoriaPosition].cProductions);
						if (positionPro === -1) {
							console.log("No existe la producción "+production[i].title);  
						}else{
							_catgorias[categoriaPosition].dProductions.splice(positionPro, 1);							
						}
					}
					
				}else{
					categoriaPosition = getCategoryPosition(categoria);
					var positionPro = getProPosition(production, _categorias[categoriaPosition].cProductions);
					if (positionPro === -1) {
						throw new NotExistException(production.title);  
					}
					_categorias[categoriaPosition].cProductions.splice(positionPro, 1);
				}
				return _categorias[categoriaPosition].cProductions.length;
			}
			this.assignActor = function (actor, production, character, main){
				//actor tiene que ser un objeto tipo Person.
				if (!(actor instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//actor no puede estar vacio.
				if (!actor|| actor === '') throw new EmptyValueException("actor");
				//Si el actor no existe lo añado.
				var actorPosition = getActorPosition(actor);
                if (actorPosition === -1) {
                    this.addActor(actor);
                }
				//production no puede estar vacio.
				if (!production|| production === '') throw new EmptyValueException("productions");
				//Si no existe se añade.
				if(Array.isArray(production)){
					for(var i=0;i<production.length;i++){ //Por si en el array que me pasan no hay una producción.
						if(!productionExist(production[i])){
							this.addProduction(production[i]);
						}
					}
				}else if(!productionExist(production)){
					this.addProduction(production);
				}
				//Añadimos al actor la/las producciones.
				var actorPosition = getActorPosition(actor);
				if(Array.isArray(production)){
					for(var i=0; i<production.length; i++){
						var posProduction = getProPositionActor(production[i], _actors[actorPosition].aProductions);
						if (posProduction !== -1) {
							console.log("La producción "+ production[i].title +" ya está asignada");
						}else{
							_actors[actorPosition].aProductions.push({
								Production:production[i],
								character:character,
								main:main								
							});
						}
					}
				}else{
					var posProduction = getProPositionActor(production, _actors[actorPosition].aProductions);
					if (posProduction !== -1) {
						throw new ExistException(actor);
					}
					_actors[actorPosition].aProductions.push(
						{Production:production,
						character:character,
						main:main	});
				}
				return _actors[actorPosition].aProductions.length;
			}
			this.deassignActor = function (actor, production){
				//actor tiene que ser un objeto tipo Person.
				if (!(actor instanceof Person)) { 
					throw new InvalidAccessMethodException();
				}		
				//actor no puede estar vacio.
				if (!actor|| actor === '') throw new EmptyValueException("actor");
				
                //Obtenemos posición del actor, si no existe se lanza excepcion.
                var actorPosition = getActorPosition(actor);
                if (actorPosition === -1) {
                    throw new NotExistException();
                }
				//Obtenemos posición de la production en el actor, si no existe se lanza excepcion.
				actorPosition = getActorPosition(actor);
				if(Array.isArray(production)){
					for(var i=0; i<production.length; i++){
						var positionPro = getProPositionActor(production[i], _actors[actorPosition].aProductions);
						if (positionPro === -1) {
							console.log("No existe la producción "+production[i].title);  
						}else{
							_actors[actorPosition].aProductions.splice(positionPro, 1);							
						}
					}
					
				}else{
					actorPosition = getActorPosition(actor);				
					var positionPro = getProPositionActor(production, _actors[actorPosition].aProductions);
					if (positionPro === -1) {
						throw new NotExistException(production.title);  
					}
					_actors[actorPosition].aProductions.splice(positionPro, 1);
				}
				return _actors[actorPosition].aProductions.length;
			}
			this.getProductionsDirector = function(director){
                if (!(director instanceof Person)) {
                    throw new InvalidAccessMethodException();
                }

                var directorPosition = getDirectorPosition(director);
                if (directorPosition === -1) throw new NotExistsException();
                var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < _directores[directorPosition].dProductions.length ?
                            {value: _directores[directorPosition].dProductions[nextIndex++], done: false} :
                            {done: true};
                    }
                }
			}
			this.getProductionsCategory = function(categoria){
                if (!(categoria instanceof Category)) {
                    throw new InvalidAccessMethodException();
                }

                var categoriaPosition = getCategoryPosition(categoria);
                if (categoriaPosition === -1) throw new NotExistsException();
                var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < _categorias[categoriaPosition].cProductions.length ?
                            {value: _categorias[categoriaPosition].cProductions[nextIndex++], done: false} :
                            {done: true};
                    }
                }
			}
			this.getProductionsActor = function(actor){
                if (!(actor instanceof Person)) {
                    throw new InvalidAccessMethodException();
                }

                var actorPosition = getActorPosition(actor);
                if (actorPosition === -1) throw new NotExistsException();
                var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < _actors[actorPosition].aProductions.length ?
							{value: _actors[actorPosition].aProductions[nextIndex++], done: false}:
                            {done: true};
                    }
                }
			}
			this.getCast = function(production){
                if (!(production instanceof Production)) {
                    throw new InvalidAccessMethodException();
                }

                var productionPosition = getProductionPosition(production);
				if (productionPosition === -1) throw new NotExistsException();
				//creo un array aux con los actores que si tienen la producción que nos han pasado
				var iterador= { 
					actores: [],
					directores: []
				};
					
				var proPosition = 0;
				for(var i=0; i<_actors.length; i++){
					proPosition = getProPositionActor(production, _actors[i].aProductions);
					if( proPosition!= -1){
						iterador.actores.push({
							actor:_actors[i].actor,
							character:_actors[i].aProductions[proPosition].character
						});
					}
				}
				for(var i=0; i<_directores.length; i++){
					proPosition = getProPosition(production, _directores[i].dProductions);
					if( proPosition!= -1){
						iterador.directores.push({
							director:_directores[i].director,
						});
					}
				}
				return iterador;
			}
			
        }
        VideoSystem.prototype = {}; 
		VideoSystem.prototype.constructor = VideoSystem;

		var instance = new VideoSystem();//Devolvemos el objeto VideoSystem para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();
