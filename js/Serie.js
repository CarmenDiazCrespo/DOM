function Serie(title, nationality = "", publication,synopsis = "", image = "", seasons){ //Aunque no son obligatorios los meto por aquí para 
    //que se puedan meter en el constructor.
    //La función se invoca con el operador new.
    if (!(this instanceof Serie)) 
        throw new InvalidAccessConstructorException();
    //Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
    Production.call(this, title, nationality, publication,synopsis, image);//llamamos al constructor del padre

    var _seasons = seasons || []; //Puede estar vacio

    Object.defineProperty(this, 'seasons', {
        get: function(){
            return _seasons;
        },
        set: function(value = []){
            _seasons=value;
        }
    });

}
Serie.prototype = Object.create(Production.prototype); //llamamos al prototipo del padre
Serie.prototype.constructor = Serie;
Serie.prototype.toString = function(){
    var str = this.seasons + " " + Production.prototype.toString.call(this); 
    //Así podemos utilizar el toString del padre
    return str;
}

/*function test(){
    var p2 = new Season("Maria Antonieta",[1,2,3]);
    var p3 = new Season("RED",["E_1","E_2","E_3"]);
    var p4 = [p2,p3];
    var p1= new Serie("Queen","Espana","1955-12-22","Romance en Roma","",p4);
    console.log(p1.toString());
}
window.onload = test;*/