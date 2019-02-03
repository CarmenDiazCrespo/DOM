function Movie(title, nationality = "", publication, synopsis = "", image = "", resource, locations){ //Aunque no son obligatorios los meto por aquí para 
    //que se puedan meter en el constructor.
    //La función se invoca con el operador new.
    if (!(this instanceof Movie)) 
        throw new InvalidAccessConstructorException();
    //Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
    Production.call(this, title, nationality, publication,synopsis, image); //llamamos al constructor del padre

    //Ninguno de las propiedades es obligatorias
    var _resource = resource || "";
    var _locations = locations || [];
    
    Object.defineProperty(this, 'resource', {
        get: function(){
            return _resource;
        },
        set: function(value = ""){
            _resource=value;
        }
    });
    
    Object.defineProperty(this, 'locations', {
        get: function(){
            return _locations;
        },
        set: function(value){
            if(Array.isArray(value)){ //Por si me pasan un array entero
                _locations = value;
            }else{ // o un solo valor para añadir
                _locations.push(value);
            }
            
        }
    });

}
Movie.prototype = Object.create(Production.prototype); //Hereda de Production
Movie.prototype.constructor = Movie;
Movie.prototype.toString = function(){
    var str = this.resource + " " + this.locations + " " + Production.prototype.toString.call(this);
    //llamamos al toString del padre
    return str;
}

/*function test(){
    var p1= new Movie("Queen","España","1955-12-22","Romance en Roma","","Hola",["Maria"]);
    console.log(p1.toString());
    p1.locations = new Coordinate (0.5, -3);
    console.log(p1.toString());
}
window.onload = test;*/