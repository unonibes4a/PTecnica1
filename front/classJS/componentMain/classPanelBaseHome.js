class Home {
  template(idAddElement) {
    let templateVar = ` 
            <section class="panelBase1">
      <div class="area1" id="area1Id">
      
       
      </div>
      <div class="area1a" id="">
        <div class="clLeterGrid"><label class="clLabel" for="">0</label>  <label class="clLabel" for="">0</label>  <label  class="clLabel" for="">0</label> <label class="clLabel" for="">0</label>  <label class="clLabel" for="">0</label>   </div>
      </div>
      <div class="sldierArea" id="idarea1">
        
      </div>
      <div class="area2" id="idarea2"></div>
    </section>
        
        `;

    document.getElementById(idAddElement).innerHTML += templateVar;
  }

  constructor({ idParen }) {
    console.log(idParen, "constructor");
    this.template(idParen);
    this.checkAdded(idParen, this.onHtmlloaded);
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

  onHtmlloaded() {}
}

export { Home };
