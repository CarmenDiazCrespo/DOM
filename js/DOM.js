"use strict";

function objetos(vs){
    //Creo los objetos que voy a utilizar.
    //Objetos usuarios
    var u1 = new User("kheiss","montoya@hotmail.com","Montoya123!");
    var u2 = new User("kheiss22","montoya.diaz@hotmail.com","MontoyaDiaz123!");
    vs.addUser(u1);
    vs.addUser(u2);
    //objetos director = persona
    var dir1= new Person("Pepe","Perez","","2005-2-2");
    var dir2= new Person("Manolo","Lopez","","1995-2-5");
    vs.addDirector(dir1);
    vs.addDirector(dir2);
    //Objetos Recursos
    var re1= new Resource("59:20","www.w3school.com");
    var re2= new Resource("229:10","www.gnula.nu");
    var re3= new Resource("05:00","www.gnula.nu");
    //Objetos de production
    var pro1= new Movie("Red2","USA","2025-02-25");
    pro1.resource= re1;
    var pro2= new Movie("Caza Fantasma","USA","1984-12-5");
    pro2.resource= re2;
    var pro3 = new Serie("Twin Peaks","USA", "1995-12-21");
    pro3.resource= re3;
    var pro4 = new Movie("1408","USA", "2007-06-22");
    var pro5 = new Movie("Que se mueran los feos","España", "2010-06-24");
    var pro6 = new Movie("LA tumba de las luciernagas","Japón", "1967-01-10");
    pro6.image="imagenes/tumba.jpg";
    vs.addProduction(pro1);
    vs.addProduction(pro2);
    vs.addProduction(pro3);
    vs.addProduction(pro4);
    vs.addProduction(pro5);
    vs.addProduction(pro6);
    //objetos actor = persona
    var ac1= new Person("John","Cusack","","1970-8-28");
    var ac2= new Person("Samuel","L.Jackson","","1948-12-21");
    var ac3= new Person("Javier","Cámara","Rodríguez","1967-1-19","imagenes/javier-camara.jpg");
    var ac4= new Person("María del Carmen","García","y Maura","1945-09-15");
    vs.addActor(ac1);
    vs.addActor(ac2);
    vs.addActor(ac3);
    vs.addActor(ac4);
    //objetos category
    var cat1= new Category("Comedia","Te partirás de risa.");
    var cat2= new Category("Drama", "Contexto serio, con un tono y una orientación más susceptible de inspirar tristeza y compasión. ");
    var cat3= new Category("Anime", "Monitos japoneses.");
    var cat4= new Category("Aventuras", "Las mejores experiencias, las más arriesgadas.");
    vs.addCategory(cat1);
    vs.addCategory(cat2);
    vs.addCategory(cat3);
    vs.addCategory(cat4);
    
    //Objetos de Coordenadas
    var c1 = new Coordinate(-1, 1);
    var c2 = new Coordinate(22, -22);
    var c3 = new Coordinate(-83, 13);

    //Asignar producciones a categorias
    vs.assignCategory(cat4, pro1);
    vs.assignCategory(cat4, pro2);
    vs.assignCategory(cat3, pro6);
    vs.assignCategory(cat1, pro5);
    vs.assignCategory(cat2, pro3);
    vs.assignCategory(cat2, pro4);
}
function removeAllElements(elem){
	while (elem.childNodes.length > 0){
		elem.removeChild(elem.childNodes[0]);
	}
}
function categoriesMenuPopulate(vs){
    //Recorremos las categorias.
    var ini = document.getElementsByClassName("navbar-header");
    var ul = document.getElementsByClassName("submenu");
    var categorias = vs.categorias;
    var categoria = categorias.next();

    ini[0].addEventListener("click", initPopulate(vs));
    while (categoria.done !== true){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        li.appendChild(a);
        ul[0].appendChild(li);

        a.addEventListener("click", categoryPopulate(categoria.value));
        a.appendChild(document.createTextNode(categoria.value.name));

        categoria = categorias.next();
    }
}
function categoryPopulate(category) {
    return function () {
        var ul = document.getElementsByClassName("submenu");
        removeChildsElement(ul);

        var productions = vs.getProductionsCategory(category);
        var production = productions.next();

        while (production.done !== true) {
            productionsCategoryPopulate(ul, production.value);
            production = productions.next();
        }
    }
}
function initPopulate(vs) {
    return function () {
        var actores = document.getElementById("actores");
        actores.addEventListener("click", showActors(vs));
        var directores = document.getElementById("directores");
        directores.addEventListener("click", showDirectors(vs));

        var categorias = vs.categorias;
		var categoria = categorias.next();
		
        var main = document.getElementById("div-main");

        removeChildsElement(main);

        while (categoria.done !== true){
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-12");
            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");
            var h3 = document.createElement("h3");
            var p = document.createElement("p");
            var a = document.createElement("a");
            a.setAttribute("href", "#");

            a.appendChild(document.createTextNode(categoria.value.name));
            p.appendChild(document.createTextNode(categoria.value.description));
            a.addEventListener("click", categoryPopulate(categoria.value));

            h3.appendChild(a);
            h3.appendChild(p);
            divCap.appendChild(h3);
            divCol.appendChild(divCap);
            main.appendChild(divCol);

            var productions = vs.getProductionsCategory(categoria.value);
            var production = productions.next();

            while (!production.done) {
                var col = document.createElement("div");
                col.setAttribute("class", "col-sm-2");

                var divThumb = document.createElement("div");
                divThumb.setAttribute("class", "thumbnail");
                divThumb.setAttribute("id", "divprod");

                var img = document.createElement("img");
                img.setAttribute("src", production.value.image);
                img.setAttribute("class", "img-responsive")
                divThumb.appendChild(img);

                var cap = document.createElement("div");
                cap.setAttribute("class", "caption");

                var h4 = document.createElement("h4");
                var a2 = document.createElement("a");
                a2.setAttribute("href", "#");
                a2.appendChild(document.createTextNode(production.value.title));
                h4.appendChild(a2);
                cap.appendChild(h4);

                divThumb.appendChild(cap);
                col.appendChild(divThumb);
                divCap.appendChild(col);
                production = productions.next();
            }
            categoria = categorias.next();
        }
    }
}
function showActors(vs){
    return function(){
        var main = document.getElementById("div-main");
        removeChildsElement(main);

        var actors = vs.actors;
        var actor = actors.next();
        while (actor.done !== true){
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4");

            var divThumb = document.createElement("div");
            divThumb.setAttribute("class", "thumbnail");
            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(actor.value.name + " " + actor.value.lastname1));
            divCap.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("+ informacion"));
            a.setAttribute("class", "pull-right");
            a.addEventListener("click", showActor(vs, actor.value));
            divCap.appendChild(a);

            divThumb.appendChild(divCap);
            divCol.appendChild(divThumb);
            main.appendChild(divCol);

            actor = actors.next();
        }
    }
}
function showDirectors(vs){
    return function () {
        var main = document.getElementById("div-main");
        removeChildsElement(main);

        var directores = vs.directores;
        var director = directores.next();
        while (director.done !== true){
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4");

            var divThumb = document.createElement("div");
            divThumb.setAttribute("class", "thumbnail");
            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(director.value.name + " " + director.value.lastname1));
            divCap.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("+ informacion"));
            a.setAttribute("class", "pull-right");
            a.addEventListener("click", showDirector(vs, director.value));
            divCap.appendChild(a);

            divThumb.appendChild(divCap);
            divCol.appendChild(divThumb);
            main.appendChild(divCol);

            director = directores.next();
        }
    }
}
function showActor(vs, actor) {
    return function () {
        var main = document.getElementById("div-main");
        removeChildsElement(main);

        var divFoto = document.createElement("div");
        divFoto.setAttribute("class", "col-sm-4");

        var divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");

        var img = document.createElement("img");
        img.setAttribute("src", actor.picture);
        divThumb.appendChild(img);

        var divInfo = document.createElement("div");
        divInfo.setAttribute("class", "col-sm-8");

        var name = document.createElement("h2");
        name.appendChild(document.createTextNode(actor.name + " " + actor.lastname1  + "("+ actor.born.toLocaleDateString() + ")"));
        divInfo.appendChild(name);

        var prod = document.createElement("h3");
        prod.appendChild(document.createTextNode("Producciones:"));
        divInfo.appendChild(prod);

        var productions = vs.getProductionsActor(actor);
        var production = productions.next();

        while (production.done !== true) {
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4");

            var divCar = document.createElement("div");
            divCar.setAttribute("class", "thumbnail");

            var foto = document.createElement("img");
            foto.setAttribute("src", production.value.image);
            divCar.appendChild(foto);

            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(production.value.title));
            divCap.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("+ informacion"));
            a.setAttribute("class", "pull-right");
            divCap.appendChild(a);

            divCar.appendChild(divCap);
            divCol.appendChild(divCar);
            divInfo.appendChild(divCol);

            production = productions.next();
        }

        divFoto.appendChild(divThumb);
        main.appendChild(divFoto);
        main.appendChild(divInfo);
    }
}

function showDirector(vs, director) {
    return function () {
        var main = document.getElementById("div-main");
        removeChildsElement(main);

        var divFoto = document.createElement("div");
        divFoto.setAttribute("class", "col-sm-4");

        var divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");

        var img = document.createElement("img");
        img.setAttribute("src", director.picture);
        divThumb.appendChild(img);

        var divInfo = document.createElement("div");
        divInfo.setAttribute("class", "col-sm-8");

        var name = document.createElement("h2");
        name.appendChild(document.createTextNode(director.name + " " + director.lastname1  + "("+ director.born.toLocaleDateString() + ")"));
        divInfo.appendChild(name);

        var prod = document.createElement("h3");
        prod.appendChild(document.createTextNode("Producciones:"));
        divInfo.appendChild(prod);

        var productions =vs.getProductionsDirector(director);
        var production = productions.next();

        while (production.done !== true) {
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4");

            var divCar = document.createElement("div");
            divCar.setAttribute("class", "thumbnail");

            var foto = document.createElement("img");
            foto.setAttribute("src", production.value.image);
            divCar.appendChild(foto);

            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(production.value.title));
            divCap.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("+ informacion"));
            a.setAttribute("class", "pull-right");
            divCap.appendChild(a);

            divCar.appendChild(divCap);
            divCol.appendChild(divCar);
            divInfo.appendChild(divCol);

            production = productions.next();
        }

        divFoto.appendChild(divThumb);
        main.appendChild(divFoto);
        main.appendChild(divInfo);
    }
}
function removeChildsElement(elem) {
    var len = elem.children.length - 1;
    for (var i = len; i > -1; i--) {
        elem.removeChild(elem.children[i]);
    }
}
function init(vs) {
    objetos(vs);
    categoriesMenuPopulate(vs);
    var initPop = initPopulate(vs);
    initPop();
}
var vs = VideoSystem.getInstance();
window.onload = init(vs);