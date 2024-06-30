class MenuBar {
  template(idAddElement) {
    let templateVar = ` 
 <div  id="mySidenavBasico3">  
       <nav id='menu'>
            <input type='checkbox' id='responsive-menu' '><label></label>
            <ul>
              <li class="clickHome" id='idHome' ><a >Inicio</a></li>             
              <li class="clickRegistro" id='idRegistro'><a >Registro</a></li> 
              <li class="clickTabla" id='idReclickTabla'><a >Lista Aqdquisiciones</a></li>          
         
            </ul>
          </nav>
</div>


<div  id="mySidenavBasico2">       
<div id="mySidenavBasico" class="sidenavBasico ">
  <a id="menuLateralClose"   class="closebtn"  >&times;</a>
  <a class="clickHome"  >Inicio</a>
  <a class="clickRegistro"   >Registro</a>
  <a class="clickTabla"   >Tabla</a>
 
</div>

 
<span id="menuLateralOpen" class="clasMove1" style="font-size:30px;cursor:pointer"  >&#9776;</span>
</div>     
      `;

    document.getElementById(idAddElement).innerHTML += templateVar;
  }

  constructor({ idParen }) {
    console.log(idParen, "constructor");
    this.template(idParen);
    this.checkAdded(idParen, this.onHtmlloaded);
  }
  structureOnClick({ f, f1,f2 }) {
    MenuBar.screenRun();
    for (let element of document.getElementsByClassName("clickHome")) { 
      element.onclick=f;
    };
    for (let element of document.getElementsByClassName("clickRegistro")) { 
      element.onclick=f1;
    };

    for (let element of document.getElementsByClassName("clickTabla")) { 
      element.onclick=f2;
    };
    
    document.getElementById("menuLateralOpen").onclick = () => {
      MenuBar.openNav();
    };
    document.getElementById("menuLateralClose").onclick = () => {
      MenuBar.closeNav();
    };
  }

  checkAdded(idAddElement, callback) {
    let element = document.getElementById(idAddElement);
    if (element.innerHTML.includes("slideshow-container")) {
      if (typeof callback === "function") {
        callback();
      }
    } else {
    }
  }

  static openNav() {
    document.getElementById("mySidenavBasico").style.width = "250px";
  }

  static closeNav() {
    document.getElementById("mySidenavBasico").style.width = "0";
  }
  onHtmlloaded() {}
  static screenRun(){
    let  w=window.innerWidth;
    let  h=window.innerHeight;
    if(w<801){
document.getElementById("mySidenavBasico2").style.display="block";
document.getElementById("mySidenavBasico3").style.display="none";
    }
    else{
      document.getElementById("mySidenavBasico2").style.display="none";
      document.getElementById("mySidenavBasico3").style.display="block";
    }
    window.addEventListener('resize', ()=>{
      w=window.innerWidth;
       h=window.innerHeight;
    if(w<801){
document.getElementById("mySidenavBasico2").style.display="block";
document.getElementById("mySidenavBasico3").style.display="none";
    }
    else{
      document.getElementById("mySidenavBasico2").style.display="none";
      document.getElementById("mySidenavBasico3").style.display="block";
    }
    });
  }

 
}

export { MenuBar };
