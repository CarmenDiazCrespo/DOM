"use strict";
function recursiva(){
    var div = document.createElement("div");
   
    function recorrerArbol(nodo){
        var li2 = document.createElement("li");
        var ul = document.createElement("ul");
        var children = nodo.childNodes;
        var len = children.length;
        for(var i =0; i < len; i++){
           var li = document.createElement("li");
           var txt = "";
           if(children[i].hasAttributes){
                txt += ": { ";
                for (var j = 0; j < children[i].attributes.length; j++) {
                    txt = txt + children[i].attributes[j].name + ", ";
                }
                txt += "}";
            }
            li.innerHTML = children[i].tagName + txt;
            if(children[i].nodeType === 1){
                li.appendChild(recorrerArbol(children[i]));
                ul.appendChild(li);
            }
        }
        return ul;
    } 
        div.appendChild(recorrerArbol(document.body));
        div.normalize();
        document.body.appendChild(div);
}