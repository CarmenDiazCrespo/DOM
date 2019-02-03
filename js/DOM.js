"use strict";

function objetos(vs){
    //Creo los objetos que voy a utilizar.
    //Objetos usuarios
    var u1 = new User("kheiss","montoya@hotmail.com","Montoya123!");
    var u2 = new User("kheiss22","montoya.diaz@hotmail.com","MontoyaDiaz123*");
    vs.addUser(u1);
    vs.addUser(u2);
    //objetos director = persona
    var dir1= new Person("Pepe","Perez","","2005-2-2");
    var dir2= new Person("Manolo","Lopez","","1995-2-5");
    vs.addDirector(dir1);
    vs.addDirector(dir2);
    //Objetos Recursos
    var re1= new Resource("59:20","www.w3school.com");
    //Objetos de production
    var pro1= new Movie("Red2","USA","2025-02-25");
    pro1.resource= re1;
    var pro2= new Movie("Caza Fantasma","USA","1984-12-5");
    var pro3 = new Serie("Twin Peaks","USA", "1995-12-21");
    var pro4 = new Movie("1408","USA", "1995-12-21");
    vs.addProduction(pro1);
    vs.addProduction(pro2);
    vs.addProduction(pro3);
    vs.addProduction(pro4);
    //objetos actor = persona
    var ac1= new Person("John","Cusack","","1970-8-28");
    var ac2= new Person("Samuel","L.Jackson","","1948-12-21");
    var ac3= new Person("Manolo","Lopez","","1993-12-16");
    vs.addActor(ac1);
    vs.addActor(ac2);
    vs.addActor(ac3);
    //objetos category
    var cat1= new Category("Terror","Las películas que más miedo dan");
    var cat2= new Category("Drama", "contexto serio, con un tono y una orientación más susceptible de inspirar tristeza y compasión. ");
    var cat3= new Category("Anime", "Monitos japoneses");
    var cat4= new Category("Aventuras", "Las mejores experiencias, las más arriesgadas");
    vs.addCategory(cat1);
    vs.addCategory(cat2);
    vs.addCategory(cat3);
    vs.addCategory(cat4);
    
    //Objetos de Coordenadas
    var c1 = new Coordinate(-1, 1);
    var c2 = new Coordinate(22, -22);
    var c3 = new Coordinate(-333, 333);
}
function removeAllElements(elem){
	while (elem.childNodes.length > 0){
		elem.removeChild(elem.childNodes[0]);
	}
}
function categoriesMenuPopulate(vs){
    //Recorremos las categorias.
    var ul = document.getElementsByClassName("submenu");
    var categorias = vs.categorias;
    var categoria = categorias.next();

    //ini[0].addEventListener("click", initPopulate());
    while (categoria.done !== true){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        li.appendChild(a);
        ul.appendChild(li);

        a.innerHTML= (categoria.value.name);
        categoria = categorias.next();
    }
}
function init() {
    var vs = VideoSystem.getInstance();
    objetos(vs);
    categoriesMenuPopulate(vs);
}

window.onload = init();