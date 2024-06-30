class Slideshow {
  
static templateHTML = `
<div class="slideshow-container2">
  <div class="slideshow-containerb">
    <div class="mySlidesb fadeb">
      <div class="numbertextb">1 / 3</div> 
      <img class="imgSlide" src="https://www.w3schools.com/howto/img_nature_wide.jpg" style="width:100%">
      <div class="textb">Caption Text</div>
    </div>
    <div class="mySlidesb fadeb">
      <div class="numbertextb">2 / 3</div>
      <img class="imgSlide" src="https://www.w3schools.com/howto/img_snow_wide.jpg" style="width:100%">
      <div class="textb">Caption Two</div>
    </div>
    <div class="mySlidesb fadeb">
      <div class="numbertextb">3 / 3</div>
      <img class="imgSlide" src="https://www.w3schools.com/howto/img_mountains_wide.jpg" style="width:100%">
      <div class="textb">Caption Three</div>
    </div>
  </div>
  <br>
  <div style="text-align:center">
    <span class="dotb"></span> 
    <span class="dotb"></span> 
    <span class="dotb"></span> 
  </div>
</div>
`;
 static idAddElement = null;
 static slideIndex = 0;
  constructor(idAddElement) {
    Slideshow.idAddElement = idAddElement;
    Slideshow.slideIndex = 0;
    Slideshow.addTemplate(Slideshow.templateHTML);
  }
  static restarVar(idAddElement){
    Slideshow.idAddElement = idAddElement;
    Slideshow.slideIndex = 0;
    Slideshow.addTemplate(Slideshow.templateHTML,Slideshow.idAddElement);
  }

 static addTemplate(templateVar,id) {     
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = "";      
      element.innerHTML = templateVar;
      this.showSlides();
    }
  }

  static showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlidesb");
    let dots = document.getElementsByClassName("dotb");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    Slideshow.slideIndex++;
    if (Slideshow.slideIndex > slides.length) {
      Slideshow.slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeb", "");
    }
    if (slides.length > 0) {
      slides[Slideshow.slideIndex - 1].style.display = "block";
      dots[Slideshow.slideIndex - 1].className += " activeb";
      setTimeout(() => Slideshow.showSlides(), 2000);  
    }
  }

static createParent(id){
  let st= `
  <div class="cl-grid-base2 cl-max">
  <div class="clLeterGrid">
  <img src="./textures/imgBody.png" alt="">  

  </div>
  <div class="cl-slider cl-max  " id="iddivp">

  </div>
</div>  `

Slideshow.addTemplate(st,id);
}

}
 

 

 

export { Slideshow };
