function Season(title, episodes){ //Aunque no son obligatorios los meto por aquí para 
    //que se puedan meter en el constructor.
    //La función se invoca con el operador new.
    if (!(this instanceof Season)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios.
    if (!title || title == '') throw new EmptyValueException("title");

    var _title = title;
    var _episodes= episodes || [];
    
    Object.defineProperty(this, 'title', {
        get: function(){
            return _title;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("title");
            _title=value;
        }
    });

    Object.defineProperty(this, 'episodes', {
        get: function(){
            return _episodes;
        },
        set: function(value = []){
            _episodes=value;
        }
    });
    
}
Season.prototype = {};
Season.prototype.constructor = Season;
Season.prototype.toString = function(){
    var str = this.title + " " + this.episodes;
    return str;
}

/*function test(){
    var episodes=["12","3",["nieve","lluvia"]];
    var p1= new Season("Pepe",episodes);
    console.log(p1.toString());
}
window.onload = test;*/