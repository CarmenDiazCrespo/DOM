function Category(name,description){
    //La función se invoca con el operador new
    if (!(this instanceof Category)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios
    if (!name || name == '') throw new EmptyValueException("name");

    var _name = name;
    var _description = description || ""; //Puede estar vacio, si no me lo pasan lo pongo yo en vacio
    
    Object.defineProperty(this, 'name', {
        get: function(){
            return _name;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("name");
            _name=value;
        }
    });

    Object.defineProperty(this, 'description', {
        get: function(){
            return _description;
        },
        set: function(value = ""){
            _description=value;
        }
    });
}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function(){
    var str = this.name + " " + this.description;
    return str;
}

/*function test(){
    var p1= new Category("Terror");
    console.log(p1.toString());
}
window.onload = test;*/