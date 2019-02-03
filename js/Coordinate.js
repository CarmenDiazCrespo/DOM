function Coordinate(latitude, longitude){
	//La función se invoca con el operador new
	if (!(this instanceof Coordinate)) 
		throw new InvalidAccessConstructorException();
    //Son elementos obligatorios y no me los pueden pasar vacios.
    if (latitude !== 0){ //La latitud puede ser 0 grados, para no me de como error de vacio si me pasan un 0
        //lo hago así
        if (!latitude || latitude == '') throw new EmptyValueException("latitude");
    }
	if (!/^[+-]?\d+([,.]\d+)?$/ || latitude < -90 || latitude > 90) //Tiene que ser un número real entre -90 y 90
        throw new InvalidValueException("latitude", latitude);
    if (latitude !== 0){//La latitud puede ser 0 grados, para no me de como error de vacio lo hago así
        if (!longitude || longitude == '') throw new EmptyValueException("longitude");
    }
	if (!/^[+-]?\d+([,.]\d+)?$/ || longitude < -180 || longitude > 180) //Tiene que ser un número real entre -180 y 180
		throw new InvalidValueException("longitude", longitude);

	var _latitude = latitude;
	var _longitude = longitude;

	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			if (value !== 0){ //La latitud puede ser 0 grados, para no me de como error de vacio si me pasan un 0
				//lo hago así
				if (!value || value == '') throw new EmptyValueException("latitude");
			}
			if (/^[+-]?\d+([,.]\d+)?$/ || value < -90 || value > 90) //Tiene que ser un número real entre -90 y 90
				throw new InvalidValueException("latitude", value);
			_latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			if (value !== 0){ //La longitude puede ser 0 grados, para no me de como error de vacio si me pasan un 0
				//lo hago así
				if (!value || value == '') throw new EmptyValueException("longitude");
			}
			if (/^[+-]?\d+([,.]\d+)?$/ || value < -180 || value > 180) //Tiene que ser un número real entre -180 y 180
				throw new InvalidValueException("longitude", value);
			_longitude = value;
		}		
	});		

}
Coordinate.prototype = {};
Coordinate.prototype.constructor = Coordinate;
Coordinate.prototype.toString = function(){
    var str = this.latitude + " " + this.longitude;
    return str;
}

/*function test(){
    var p1= new Coordinate("hola","0.000");
    console.log(p1.toString());
}
window.onload = test;*/

Coordinate.prototype.getSexagesimalLatitude = function (){	
	var direction = this.latitude >= 0 ? "N" : "S";
	var latitude = Math.abs(this.latitude);
	var grades =  Math.floor (latitude);
	var tmpMinutes = (latitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}

Coordinate.prototype.getSexagesimalLongitude = function (){	
	var direction = this.longitude >= 0 ? "E" : "W";
	var longitude = Math.abs(this.longitude);
	var grades =  Math.floor (longitude);
	var tmpMinutes = (longitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}