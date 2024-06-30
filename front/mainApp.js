import { MenuBar } from "./classJS/classMenuBar.js";
import { DOMVisibility } from "./classJS/classRender.js";
import { Slideshow } from "./classJS/classSlideshow.js";
import {FormGio} from "./classJS/componentMain/classForm.js";
import {TableViews} from "./classJS/componentMain/classViewTable.js";
 
var objApp = {
  menuObj: null,
  hostName:'http://localhost:8000'
};
function inicia() {
  
  DOMVisibility.createApp();
  objApp.menuObj = new MenuBar({ idParen: "idMenuPlace" });
  objApp.menuObj.structureOnClick({
    f: ManagerEventMenu.onHome,
    f1: ManagerEventMenu.onRegister,
    f2: ManagerEventMenu.onTable,
  });
  Slideshow.createParent("idmainApp");
  Slideshow.restarVar("iddivp");
  
 
}

document.addEventListener("DOMContentLoaded", () => {
  inicia();
});

class ManagerEventMenu {
  static onHome(event) {
    DOMVisibility.removeAllChildren("#idmainApp");
    Slideshow.createParent("idmainApp");
    Slideshow.restarVar("iddivp");
  }
  static onRegister() {
    DOMVisibility.removeAllChildren("#idmainApp");
    FormGio.templateParent("idmainApp");
    FormGio.template();
  }
  static onTable() {
    console.log("onTable");
    DOMVisibility.removeAllChildren("#idmainApp");
    TableViews.template("idmainApp");
    TableViews.obtenerAdquisiciones({host:objApp.hostName});
  }

  static navigate(event, section) {
    history.pushState(null, "", "/" + section);
  }
}

window.objApp=objApp;

 