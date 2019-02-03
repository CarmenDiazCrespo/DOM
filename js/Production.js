var Production=function (title, nationality = "", publication, synopsis, image){
    //La función se invoca con el operador new.
    if (!(this instanceof Production)) 
        throw new InvalidAccessConstructorException();
    //Al ser abstracta no se puede instanciar, si se intenta crear un objeto production lanza un error
    if (this.constructor === Production) {
        throw new AbstractClassException("Production");
    }

    //Estos parametros son obligatorios, así me aseguro que no están vacios.
    if (!title || title == '') throw new EmptyValueException("title");
    if (!publication || publication == '' ) throw new EmptyValueException("publication");
    if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(publication)) 
        throw new InvalidValueException("publication",publication); //Tiene que ser AAAA-MMM-DD
    
    //Los que no son obligatorios los sustituyos por vacios.
    var _title = title;
    var _nationality = nationality;
    var _image = image || ""; 
    var _publication = new Date(publication) ;
    var _synopsis = synopsis || "";
    
    Object.defineProperty(this, 'title', {
        get: function(){
            return _title;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("title");
            _title=value;
        }
    });
    Object.defineProperty(this, 'nationality', {
        get: function(){
            return _nationality;
        },
        set: function(value = ""){
            _nationality=value;
        }
    });
    Object.defineProperty(this, 'image', {
        get: function(){
            return _image;
        },
        set: function(value = ""){
            _image=value;
        }
    });
    Object.defineProperty(this, 'publication', {
        get: function(){
            return _publication;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("publication");
            if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(publication)) 
                throw new InvalidValueException("publication",publication); //Tiene que ser AAAA-MMM-DD
            _publication= new Date(value);
        }
    });
    Object.defineProperty(this, 'synopsis', {
        get: function(){
            return _synopsis;
        },
        set: function(value = ""){
            _synopsis=value;
        }
    });
}
Production.prototype = {};
Production.prototype.constructor = Production;
Production.prototype.toString = function(){
    var str = this.title + " " + this.nationality + " " + this.image + " " + this.publication.toLocaleDateString() + " " + this.synopsis;
    return str;
}

/*function test(){
    console.log("La fecha tiene que ser AAAA-MM-DD");
    var p1= new Production("Maria","Espana","2018-11-21");
    console.log(p1.toString());
}
window.onload = test;*/