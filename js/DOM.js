"use strict";

var vs = VideoSystem.getInstance();

function objetos(){
    //Creo los objetos que voy a utilizar.
    //Objetos usuarios
    var u1 = new User("kheiss","montoya@hotmail.com","Montoya123!");
    var u2 = new User("kheiss22","montoya.diaz@hotmail.com","MontoyaDiaz123!");
    vs.addUser(u1);
    vs.addUser(u2);
    //objetos director = persona
    var dir1= new Person("Isao","Takahata","","1935-02-29");
    dir1.picture="imagenes/Isao_Takahata.jpg";
    var dir2= new Person("Ivan","Reitman","","1946-07-30");
    dir2.picture="imagenes/Ivan_Reitman.jpg";
    var dir3= new Person("David","Lynch","","1946-01-20");
    dir3.picture="imagenes/David_Lynch.jpg";
    var dir4= new Person("Dean","Parisot","","1952-01-01");
    dir4.picture="imagenes/Dean.jpg";
    vs.addDirector(dir1);
    vs.addDirector(dir2);
    vs.addDirector(dir3);
    vs.addDirector(dir4);
    //Objetos Recursos
    var re1= new Resource("59:20","www.w3school.com");
    var re2= new Resource("229:10","www.gnula.nu");
    var re3= new Resource("05:00","www.gnula.nu");
    //Objetos de production
    var pro1= new Movie("Red2","USA","2025-02-25");
    pro1.resource= re1;
    pro1.image="imagenes/red2.jpg";
    var pro2= new Movie("Caza Fantasmas","USA","1984-12-5");
    pro2.resource= re2;
    pro2.image="imagenes/caza-fantasmas.jpg";
    var pro3 = new Serie("Twin Peaks","USA", "1995-12-21");
    pro3.resource= re3;
    pro3.image="imagenes/twin_peaks.jpg";
    var pro4 = new Movie("1408","USA", "2007-06-22");
    pro4.image="imagenes/1408.jpg";
    var pro5 = new Movie("Que se mueran los feos","España", "2010-06-24");
    pro5.image="imagenes/feos.jpg";
    var pro6 = new Movie("La tumba de las luciernagas","Japón", "1967-01-10");
    pro6.image="imagenes/tumba.jpg";
    vs.addProduction(pro1);
    vs.addProduction(pro2);
    vs.addProduction(pro3);
    vs.addProduction(pro4);
    vs.addProduction(pro5);
    vs.addProduction(pro6);
    //objetos actor = persona
    var ac1= new Person("John","Cusack","","1970-8-28","imagenes/john.jpg");
    var ac2= new Person("Samuel","L.Jackson","","1948-12-21","imagenes/samu.jpg");
    var ac3= new Person("Javier","Cámara","Rodríguez","1967-1-19","imagenes/javier-camara.jpg");
    var ac4= new Person("María del Carmen","García","y Maura","1945-09-15","imagenes/Carmen-Maura.jpg");
    vs.addActor(ac1);
    vs.addActor(ac2);
    vs.addActor(ac3);
    vs.addActor(ac4);
    //objetos category
    var cat5= new Category("Lo más visto","Las peliculas y series más vistas...");
    var cat1= new Category("Comedia","Te partirás de risa.");
    var cat2= new Category("Drama", "Contexto serio, con un tono y una orientación más susceptible de inspirar tristeza y compasión. ");
    var cat3= new Category("Anime", "Monitos japoneses.");
    var cat4= new Category("Aventuras", "Las mejores experiencias, las más arriesgadas.");
    vs.addCategory(cat1);
    vs.addCategory(cat2);
    vs.addCategory(cat3);
    vs.addCategory(cat4);
    //vs.addCategory(cat5);
    
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

    //Asignar producciones a actores
    vs.assignActor(ac1, pro4, "" , true);
    vs.assignActor(ac2, pro4, "" , false);
    vs.assignActor(ac3, pro5, "" , false);
   
    //Asignar producciones a directores
    vs.assignDirector(dir1,[pro6,pro1]);
    vs.assignDirector(dir2,pro2);
    vs.assignDirector(dir3,pro3);
    vs.assignDirector(dir4,pro1);
}

function categoriesMenuPopulate(){
    //Recorremos las categorias.
    var ini = document.getElementsByClassName("navbar-header");
    var ul = document.getElementsByClassName("submenu");
    var categorias = vs.categorias;
    var categoria = categorias.next();

    while (categoria.done !== true){
        //Voy creando el submenu
        //Tipo lista para cada categoría
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        li.appendChild(a);
        ul[0].appendChild(li);

        a.appendChild(document.createTextNode(categoria.value.name));
        a.addEventListener("click", showCategory(categoria.value));

        categoria = categorias.next();
    }

}
function showCategory(categoria) {
    return function () {
        //borro lo que haya en el main
        var main = document.getElementById("div-main");
        removeChildren(main);

        //El nombre y esas cosis de las categorías
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(categoria.name));
        main.appendChild(h2);

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(categoria.description));
        main.appendChild(p);

        var productions = vs.getProductionsCategory(categoria);
        var production = productions.next();

        while (production.done !== true) {
            //Creo un div para meterlo en columnas más pequeñas y se quede a un lado
            var fotoPro = document.createElement("div");
            fotoPro.setAttribute("class", "col-sm-4");
            main.appendChild(fotoPro);

            //Creo el div donde va la miniatura de la foto
            var galeria1 = document.createElement("div");
            galeria1.setAttribute("class", "thumbnail");
            fotoPro.appendChild(galeria1);

            //Cojo la foto de la Producción
            var imgPro = document.createElement("img");
            imgPro.setAttribute("src", production.value.image);
            galeria1.appendChild(imgPro);

            //Meto la descripción de la foto
            var desc = document.createElement("div");
            desc.setAttribute("class", "caption");
            galeria1.appendChild(desc);

            //El nombre y el link para entrar a las producciones
            var h4 = document.createElement("h4");
            desc.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(production.value.title));
            a.addEventListener("click", showProduction(production.value));
            h4.appendChild(a);

            production = productions.next();
        }
    }
}
//showProductions no la he hecho porque lo tengo hecho en cada show diferente 
//Es por culpa de actores, mejor te lo explico en persona y veo si tengo que cambiarlo

function showHomePage(){
    //Borro lo que haya en el main
    var main = document.getElementById("div-main");
    removeChildren(main);
    var divCon = document.createElement("div");
    divCon.setAttribute("class","container");
    main.appendChild(divCon);

    //Recorro las categorías para visualizarlas
    var categorias = vs.categorias;
    var categoria = categorias.next();
    while (categoria.done !== true){
        //Creo los contenedores de las categorías que serán tantos como categorías haya
        var colCat = document.createElement("div");
        colCat.setAttribute("class", "col-sm-8");
        divCon.appendChild(colCat);

        var cap = document.createElement("div");
        cap.setAttribute("class", "caption");
        colCat.appendChild(cap);

        //El nombre y esas cosis de las categorías
        var h3 = document.createElement("h3");
        cap.appendChild(h3);

        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode(categoria.value.name));
        a.addEventListener("click", showCategory(categoria.value));
        h3.appendChild(a);

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(categoria.value.description));
        cap.appendChild(p);
        
        //Creo un div para meterlo en columnas más pequeñas y se quede a un lado
        var fotoDiv = document.createElement("div");
        fotoDiv.setAttribute("class", "col-sm-6");
        cap.appendChild(fotoDiv);

        //Creo el carrusel
        var divCar = document.createElement("div");
        divCar.setAttribute("id", "myCarousel");
        divCar.setAttribute("class", "carousel slide");
        divCar.setAttribute("data-ride", "carousel");
        fotoDiv.appendChild(divCar);

        //Los circulitos que indica en cual está
        var ol = document.createElement("ol");
        ol.setAttribute("class", "carousel-indicators");
        divCar.appendChild(ol);
         
        //El div para las fotos
        var divInner = document.createElement("div");
        divInner.setAttribute("class", "carousel-inner");
        divCar.appendChild(divInner);

        //Muestro las producciones de cada categoría 
        var productions = vs.getProductionsCategory(categoria.value);
        var production = productions.next();
        var i = 0;

        while (production.done !== true) {

            var li =document.createElement("li");
            li.setAttribute("data-target", "#myCarousel");
            li.setAttribute("data-slide-to", "'"+i+"'");
            if(i == 0){
                li.setAttribute("class", "active");
            }
            ol.appendChild(li);

            //div para las imagenes e info
            var divItem = document.createElement("div");
            if(i == 0 ){
                divItem.setAttribute("class", "item active");
            }else{
                divItem.setAttribute("class", "item");
            }
            divInner.appendChild(divItem);

            //Cojo la foto de la Producción
            var imgPro = document.createElement("img");
            imgPro.setAttribute("src", production.value.image);
            divItem.appendChild(imgPro);

            //Div para la info
            var divInfo = document.createElement("div");
            divInfo.setAttribute("class", "carousel-caption");
            divItem.appendChild(divInfo);

            //El nombre y el link para entrar a las producciones
            var h4 = document.createElement("h4");
            divInfo.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(production.value.title));
            a.addEventListener("click", showProduction(production.value));
            h4.appendChild(a);

            production = productions.next();
            i++;

        }//Fin del while de producciones

        //Botones para mover el carrusel
        var lft = document.createElement("a");
        lft.setAttribute("class", "left carousel-control");
        lft.setAttribute("href", "#myCarousel");
        lft.setAttribute("data-slide", "prev");
        divCar.appendChild(lft);

        var spanl1 = document.createElement("span");
        spanl1.setAttribute("class", "glyphicon glyphicon-chevron-left");
        lft.appendChild(spanl1);

        var rgt = document.createElement("a");
        rgt.setAttribute("class", "right carousel-control");
        rgt.setAttribute("href", "#myCarousel");
        rgt.setAttribute("data-slide", "next");
        divCar.appendChild(rgt);

        var spanR1 = document.createElement("span");
        spanR1.setAttribute("class", "glyphicon glyphicon-chevron-right");
        rgt.appendChild(spanR1);
        
        categoria = categorias.next();
    }//Fin del while de categorías
}
function showActors(){
    return function(){
        //borro lo que haya en el main
        var main = document.getElementById("div-main");
        removeChildren(main);

        //Creo la tabla
        var div = document.createElement("div");
        div.setAttribute("class", "container");
        main.appendChild(div);

        var table = document.createElement("table");
        table.setAttribute("class", "table");
        div.appendChild(table);
        var thead = document.createElement("thead");
        table.appendChild(thead);
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        var th1 = document.createElement("th");
        tr.appendChild(th1);
        th1.appendChild(document.createTextNode("Foto"));
        var th2 = document.createElement("th");
        tr.appendChild(th2);
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        tr.appendChild(th3);
        th3.appendChild(document.createTextNode("Apellido"));
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        //Recorro los actores
        var actors = vs.actors;
        var actor = actors.next();
        while (actor.done !== true){
            //termino de crear lo que va dentro de la tabla
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var td1 = document.createElement("td");
            tr.appendChild(td1);
            var td2 = document.createElement("td");
            tr.appendChild(td2);
            var td3 = document.createElement("td");
            tr.appendChild(td3);
            //Añado los valores a las tablas
            var ft = document.createElement("img");
            ft.setAttribute("src", actor.value.picture);
            ft.addEventListener("click", showActor(actor.value));
            td1.appendChild(ft);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(actor.value.name));
            a.addEventListener("click", showActor(actor.value));
            td2.appendChild(a);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(actor.value.lastname1));
            a.addEventListener("click", showActor(actor.value));
            td3.appendChild(a);

            actor = actors.next();
        }
    }
}

function showActor(actor) {
    return function () {
        //Limpiar main
        var main = document.getElementById("div-main");
        removeChildren(main);
        
        //Creo un div para meter las fotos
        var foto = document.createElement("div");
        foto.setAttribute("class", "col-sm-4");
        main.appendChild(foto);
        
        //Hago la galería de fotos
        var galeria = document.createElement("div");
        galeria.setAttribute("class", "thumbnail");
        foto.appendChild(galeria);

        //Hago la foto, la redondeo y la meto en la galería 
        var img = document.createElement("img");
        img.setAttribute("src", actor.picture);
        img.setAttribute("class", "img-rounded");
        galeria.appendChild(img);

        //Hago un div para la info
        var info = document.createElement("div");
        info.setAttribute("class", "col-sm-8");
        main.appendChild(info);

        var name = document.createElement("h2");
        name.appendChild(document.createTextNode(actor.name + " " + actor.lastname1 + " " + actor.lastname2));
        info.appendChild(name);

        var born = document.createElement("h4");
        born.appendChild(document.createTextNode("Fecha de nacimiento: "+ actor.born.toLocaleDateString()));
        info.appendChild(born);

        var pro = document.createElement("h3");
        pro.appendChild(document.createTextNode("Producciones:"));
        info.appendChild(pro);

        //Recorrer las producciones de los actores:
        var productions = vs.getProductionsActor(actor);
        var production = productions.next();

        while (production.done !== true) {
            //Creo un div para meterlo en columnas más pequeñas y se quede a un lado
            var fotoPro = document.createElement("div");
            fotoPro.setAttribute("class", "col-sm-4");
            info.appendChild(fotoPro);

            //Creo el div donde va la miniatura de la foto
            var galeria1 = document.createElement("div");
            galeria1.setAttribute("class", "thumbnail");
            fotoPro.appendChild(galeria1);

            //Cojo la foto de la Producción
            var imgPro = document.createElement("img");
            imgPro.setAttribute("src", production.value.Production.image);
            galeria1.appendChild(imgPro);

            //Meto la descripción de la foto
            var desc = document.createElement("div");
            desc.setAttribute("class", "caption");
            galeria1.appendChild(desc);

            //El nombre y el link para entrar a las producciones
            var h4 = document.createElement("h4");
            desc.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(production.value.Production.title));
            a.addEventListener("click", showProduction(production.value.Production));
            h4.appendChild(a);

            production = productions.next();
        }
        
    }
}
function showDirectors(){
    return function () {
        //Borro lo que haya en el main
        var main = document.getElementById("div-main");
        removeChildren(main);

        //Creo un contenedor para la tabla
        var div = document.createElement("div");
        div.setAttribute("class", "container");
        main.appendChild(div);

        //Creo la tabla
        var table = document.createElement("table");
        table.setAttribute("class", "table");
        div.appendChild(table);
        var thead = document.createElement("thead");
        table.appendChild(thead);
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        var th1 = document.createElement("th");
        tr.appendChild(th1);
        th1.appendChild(document.createTextNode("Foto"));
        var th2 = document.createElement("th");
        tr.appendChild(th2);
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        tr.appendChild(th3);
        th3.appendChild(document.createTextNode("Apellido"));
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        

        //Recorro los directores
        var directores = vs.directores;
        var director = directores.next();
        while (director.done !== true){
            //Termino de crear la tabla con los elementos que quiero que se vayan creando
            //según la cantidad de directores que haya
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var td1 = document.createElement("td");
            tr.appendChild(td1);
            var td2 = document.createElement("td");
            tr.appendChild(td2);
            var td3 = document.createElement("td");
            tr.appendChild(td3);
            //Añado los valores a las tablas
            var ft = document.createElement("img");
            ft.setAttribute("src", director.value.picture);
            ft.addEventListener("click", showDirector(director.value));
            td1.appendChild(ft);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(director.value.name));
            a.addEventListener("click", showDirector(director.value));
            td2.appendChild(a);
            
            var a = document.createElement("a");
            a.appendChild(document.createTextNode(director.value.lastname1));
            a.addEventListener("click", showDirector(director.value));
            td3.appendChild(a);

            director = directores.next();
        }
        //Explico como funciona la tabla, por si el usu no tiene ni idea ?.?
        var p = document.createElement("p");
        p.setAttribute("class", "notas");
        p.appendChild(document.createTextNode("Para saber más pulse sobre la foto, nombre o apellido."));
        div.appendChild(p);
    }
}


function showDirector(director) {
    return function () {
        //Borro lo que hay en el main
        var main = document.getElementById("div-main");
        removeChildren(main);

        //Creo un div para meter las fotos
        var foto = document.createElement("div");
        foto.setAttribute("class", "col-sm-4");
        main.appendChild(foto);

        //Hago la galería de fotos
        var galeria = document.createElement("div");
        galeria.setAttribute("class", "thumbnail");
        foto.appendChild(galeria);

        var img = document.createElement("img");
        img.setAttribute("src", director.picture);
        galeria.appendChild(img);

        //Creo un div para meter la info
        var info = document.createElement("div");
        info.setAttribute("class", "col-sm-8");
        main.appendChild(info);

        var name = document.createElement("h2");
        name.appendChild(document.createTextNode(director.name + " " + director.lastname1  + " " + director.lastname2));
        info.appendChild(name);

        var born = document.createElement("h4");
        born.appendChild(document.createTextNode("Fecha de nacimiento: "+ director.born.toLocaleDateString()));
        info.appendChild(born);

        var prod = document.createElement("h3");
        prod.appendChild(document.createTextNode("Producciones:"));
        info.appendChild(prod);

        var productions =vs.getProductionsDirector(director);
        var production = productions.next();

        while (production.done !== true) {
            //Creo un div para meterlo en columnas más pequeñas y se quede a un lado
            var fotoPro = document.createElement("div");
            fotoPro.setAttribute("class", "col-sm-4");
            info.appendChild(fotoPro);

            //Creo el div donde va la miniatura de la foto
            var galeria1 = document.createElement("div");
            galeria1.setAttribute("class", "thumbnail");
            fotoPro.appendChild(galeria1);

            //Cojo la foto de la Producción
            var imgPro = document.createElement("img");
            imgPro.setAttribute("src", production.value.image);
            galeria1.appendChild(imgPro);

            //Meto la descripción de la foto
            var desc = document.createElement("div");
            desc.setAttribute("class", "caption");
            galeria1.appendChild(desc);

            //El nombre y el link para entrar a las producciones
            var h4 = document.createElement("h4");
            desc.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(production.value.title));
            a.addEventListener("click", showProduction(production.value));
            h4.appendChild(a);

            production = productions.next();
        }
        
    }
}
function showProduction(production) {
    return function () {
        //Borro el main
        var main = document.getElementById("div-main");
        removeChildren(main);
        //Empiezo con los actores
        //Foto de la producción 
        var foto = document.createElement("div");
        foto.setAttribute("class", "col-sm-4");
        main.appendChild(foto);

        var galeria = document.createElement("div");
        galeria.setAttribute("class", "thumbnail");
        foto.appendChild(galeria);

        var img = document.createElement("img");
        img.setAttribute("src", production.image);
        galeria.appendChild(img);

        //Empiezo a meter la info
        var info = document.createElement("div");
        info.setAttribute("class", "col-sm-8");
        main.appendChild(info);

        var title = document.createElement("h2");
        title.appendChild(document.createTextNode(production.title));
        info.appendChild(title);

        var iterador = vs.getCast(production);
        var len1 = iterador.actores.length;
        var div_actores = document.createElement("div");
        //Por si no tiene director que no salga
        if(len1 > 0 ){
            var actores = document.createElement("h3");
            actores.appendChild(document.createTextNode("Actores:"));
            div_actores.appendChild(actores);
        }
        info.appendChild(div_actores);
        for (var i = 0; i < len1; i++) {
           //Lo mismo que arriba, pero de directores
            var col1 = document.createElement("div");
            col1.setAttribute("class", "col-sm-3");
            div_actores.appendChild(col1);

            var galeria = document.createElement("div");
            galeria.setAttribute("class", "thumbnail");

            var foto = document.createElement("img");
            foto.setAttribute("src", iterador.actores[i].actor.picture);
            galeria.appendChild(foto);

            var cap = document.createElement("div");
            cap.setAttribute("class", "caption");
            //Nombre de los actores
            var h4 = document.createElement("h4");
            cap.appendChild(h4);

            var a = document.createElement("a");
            a.appendChild(document.createTextNode(iterador.actores[i].actor.name + " " + iterador.actores[i].actor.lastname1));
            a.addEventListener("click", showActor(iterador.actores[i].actor)); //Si pulsa en el nombre sale la info
            h4.appendChild(a);

            galeria.appendChild(cap);
            col1.appendChild(galeria);
            
        }//Fin actores
        //Array de directores dentro del iterador
        var div_directores = document.createElement("div");
        info.appendChild(div_directores);
        //Por si no hay directores, que no salga lo de directores: 
        var len2 = iterador.directores.length;
        if(len2 > 0){
            var director = document.createElement("h3");
            director.appendChild(document.createTextNode("Directores:"));
            div_directores.appendChild(director);    
        }
        for (var i = 0; i < len2; i++) {
            
            var col2 = document.createElement("div");
            col2.setAttribute("class", "col-sm-3");
            div_directores.appendChild(col2);
            //Aquí voy metiendo la foto
            var galeria2 = document.createElement("div");
            galeria2.setAttribute("class", "thumbnail");
            col2.appendChild(galeria2);

            var foto2 = document.createElement("img");
            foto2.setAttribute("src", iterador.directores[i].director.picture);
            galeria2.appendChild(foto2);

            var cap2 = document.createElement("div");
            cap2.setAttribute("class", "caption");
            galeria2.appendChild(cap2);
            //Muestro el nombre
            var h42 = document.createElement("h4");
            cap2.appendChild(h42);

            var a2 = document.createElement("a");
            a2.appendChild(document.createTextNode(iterador.directores[i].director.name + " " + iterador.directores[i].director.lastname1));
            a2.addEventListener("click", showDirector(iterador.directores[i].director));
            cap2.appendChild(a2);
            
        }
    }
}
function showResource(production) {
    return function () {
        var main = document.getElementById("div-main");

        var divFoto = document.createElement("div");
        divFoto.setAttribute("class", "col-sm-4");
        main.appendChild(divFoto);

        var divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");
        divFoto.appendChild(divThumb);

        var img = document.createElement("img");
        img.setAttribute("src", production.image);
        divThumb.appendChild(img);

        var divInfo = document.createElement("div");
        divInfo.setAttribute("class", "col-sm-8");
        divInfo.setAttribute("id", "info");

        var title = document.createElement("h2");
        title.appendChild(document.createTextNode(production.title + "(" + production.publication.toLocaleDateString() + ")"));
        divInfo.appendChild(title);

        var table = document.createElement("table");

        var tr1 = document.createElement("tr");
        table.appendChild(tr1);
        var dur = document.createElement("td");
        dur.appendChild(document.createTextNode("Duración"));
        tr1.appendChild(dur);
        var td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(production.resource.duration + " minutos."));
        tr1.appendChild(td1);

        var tr2 = document.createElement("tr");
        table.appendChild(tr2);
        var link = document.createElement("td");
        link.appendChild(document.createTextNode("Link"));
        tr2.appendChild(link);
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(production.resource.link));
        tr2.appendChild(td2);

        var tr3 = document.createElement("tr");
        table.appendChild(tr3);
        var aud = document.createElement("td");
        aud.appendChild(document.createTextNode("Audios"));
        tr3.appendChild(aud);
        var td3 = document.createElement("td");

        var audios = "";
        for (var i = 0; i < production.resource.audios.length; i++) {
            audios += production.resource.audios[i];
        }
        td3.appendChild(document.createTextNode(audios));
        tr3.appendChild(td3);

        var tr4 = document.createElement("tr");
        table.appendChild(tr4);
        var subs = document.createElement("td");
        subs.appendChild(document.createTextNode("Subtitulos"));
        tr4.appendChild(subs);
        var td4 = document.createElement("td");

        var subtitulos = "";
        for (var i = 0; i < production.resource.subtitles.length; i++) {
            subtitulos += production.resource.subtitles[i];
        }
        td4.appendChild(document.createTextNode(subtitulos));
        tr4.appendChild(td4);

    }

}

function removeChildren(elem) {
    //recorro los hijos y los borros, es así para no borrar también al padre
    var len = elem.children.length - 1;
    for (var i = len; i > -1; i--) {
        elem.removeChild(elem.children[i]);
    }
}

function initPopulate() {
    //Creo los eventos que de si pulsan el menú 
    var actores = document.getElementById("actores");
    actores.addEventListener("click", showActors());
    var directores = document.getElementById("directores");
    directores.addEventListener("click", showDirectors());

    //Método para crear los objetos
    objetos();
    //Llamo al método para poder desplegar el menu categoría
    categoriesMenuPopulate();
    //Llamo al método para que se vean las categorías en el main
    showHomePage();

}

window.onload = initPopulate;