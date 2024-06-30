class DOMVisibility {
  static hideElement(element) {
    element.classList.add("hidden");
  }

  static showElement(element) {
    element.classList.remove("hidden");
  }

  static toggleElement(element) {
    element.classList.toggle("hidden");
  }
  static removeElement(querySelector) {
    let elementos = document.querySelectorAll(querySelector);
    elementos.forEach(function (elemento) {
      elemento.remove();
    });
  }
  static removeAllChildren(querySelector) {
    let elements = document.querySelectorAll(querySelector);

    elements.forEach(function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });
  }
  static templateBase=`
  <section class="cl-idPanelView" id="idPanelView">
  <div class="cl-max" id="idMenuPlace"></div>
  <div class=" " id="idmainApp">
  
  </div>
  <div class="cl-max"></div>
  </section>
  `;
  static addTemplate(templateVar,id=null) { 
    if(document.getElementById(id)){
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = "";      
          element.innerHTML = templateVar;
          
        }
    }    
    else{
        const element = document.body;
        if (element) {
          element.innerHTML = "";      
          element.innerHTML = templateVar;
          
        }
    }
    
  }
  static createApp( ) { 
    const element = document.body;
    if (element) {
      element.innerHTML = "";      
      element.innerHTML = DOMVisibility.templateBase;
      
    }
    
  }
 
}

export { DOMVisibility };
