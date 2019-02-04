function Resource(duration, link, audios, subtitles){
    //audios y subtitulos son arrays no obligatorios, pero los pongo ahí para que se puedan meter en el contructor
    //La función se invoca con el operador new
    if (!(this instanceof Resource)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios
    if (!duration || duration == '') throw new EmptyValueException("duration");
    if (!/^[+]?\d+([:]\d+)?$/.test(duration)) throw new InvalidValueException("duration", duration); //Son minutos
    //No puede ser un número negativo, pero acepto los minutos con puntos o comas.
    //para una hora y media y quince segundos tiene que ser 90.15 o 90,15.
    if (!link || link == '' )  throw new EmptyValueException("link");
    if (!/^[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(link)) throw new InvalidValueException("link",link);	
    //Los links pueden ir con www o no y acepto cualquier teminación (.es, .com, .org...).

    
    var _duration = duration; //Son minutos
    var _link = link;
    var _audios = audios || [];
    var _subtitles = subtitles || [];
    
    Object.defineProperty(this, 'duration', {
        get: function(){
            return _duration;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("duration");
            if (!/^[+]?\d+([,.]\d+)?$/.test(duration)) throw new InvalidValueException("duration", duration);
            _duration=value;
        }
    });
    Object.defineProperty(this, 'link', {
        get: function(){
            return _link;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("link");
            if (!/^www\.[\d\w]+\.(com|net|es|org)$/.test(link)) throw new InvalidValueException("link",link);
            _link=value;
        }
    });
    Object.defineProperty(this, 'audios', {
        get: function(){
            return _audios;
        },
        set: function(value = []){
            _audios=value;
        }
    });

    Object.defineProperty(this, 'subtitles', {
        get: function(){
            return _subtitles;
        },
        set: function(value = []){
            _subtitles=value;
        }
    });
}
Resource.prototype = {};
Resource.prototype.constructor = Resource;
Resource.prototype.toString = function(){
    var str = this.duration + " " + this.link + " " + this.audios + " " + this.subtitles;
    return str;
}


/*function test(){
    var audios =["caca"," popo"," 1234"];
    var p1= new Resource("1.22","cacapopo.com",audios);
    console.log(p1.toString());
}
window.onload = test;*/