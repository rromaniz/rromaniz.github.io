let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

//Mostrar y ocultar contenido de cards

let cards = document.querySelectorAll('.card');
for (let c=0; c<cards.length; c++){
    cards[c].addEventListener("mouseenter",mostrarTexto);
    cards[c].addEventListener("mouseleave",ocultarTexto);    
}
function mostrarTexto(e){

    elem =e.target.querySelector('.text-card').style.opacity=1;
    elem =e.target.querySelector('.text-card').style.height="auto";
    elem = e.target.querySelector('.overlay').style.opacity=1;
}
function ocultarTexto(e){
    
    elem =e.target.querySelector('.text-card').style.opacity=0;
    elem =e.target.querySelector('.text-card').style.height=0;
    elem =e.target.querySelector('.overlay').style.opacity=0;
}