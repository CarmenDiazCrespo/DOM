function PasswordException(){
    this.name = "PasswordException";
	this.message = "Error: La contraseña debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.";
}
PasswordException.prototype = new BaseException(); //Heredamos de BaseException
PasswordException.prototype.constructor = PasswordException;

function User(username, email, password){
    //La función se invoca con el operador new
    if (!(this instanceof User)) 
        throw new InvalidAccessConstructorException();
        
    //Estos parametros son obligatorios, así me aseguro que no están vacios
    if (!username || username == '') throw new EmptyValueException("username");
    if (!email || email == '' )  throw new EmptyValueException("email");
    if (!/^(.+\@.+\..+)$/.test(email)) throw new InvalidValueException("email",email);
    //Ejemplo de la esturctura de email: carmen.diaz@yahoo.org
    if (!password || password == '' ) throw new EmptyValueException("password");
    if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(password)) 
        throw new PasswordException();
    //La contraseña debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula, al menos 
    //una mayúscula y al menos un caracter no alfanumérico.

    var _username = username;
    var _email = email;
    var _password = password;
    
    Object.defineProperty(this, 'username', {
        get: function(){
            return _username;
        },
        set: function(value){
            if (!value|| value == '') throw new EmptyValueException("username");
            _username=value;
        }
    });
    Object.defineProperty(this, 'email', {
        get: function(){
            return _email;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("email");
            if (!/^(.+\@.+\..+)$/.test(email)) throw new InvalidValueException("email",email);
            _email=value;
        }
    });
    Object.defineProperty(this, 'password', {
        get: function(){
            return _password;
        },
        set: function(value){
            if (!value || value == '') throw new EmptyValueException("password");
            if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(password)) 
                throw new PasswordException();
                //La contraseña debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula, al menos 
                //una mayúscula y al menos un caracter no alfanumérico.

            _password=value;
        }
    });

}
User.prototype = {};
User.prototype.constructor = User;
User.prototype.toString = function(){
    var str = this.username + " " + this.email + " " + this.password;
    return str;
}

/*function test(){
    var p1= new User("Maria","carmenmario@gmail.com","holiwis123");
    console.log(p1.toString());
}
window.onload = test;*/