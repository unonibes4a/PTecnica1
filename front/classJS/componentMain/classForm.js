class FormGio {

   static template(idAddElement) {
        let templateVar = `  
        
        
          `;
    
        document.getElementById(idAddElement).innerHTML += templateVar;
      }
  constructor() {
    FormGio.form = null;
    FormGio.valorSelector = 0;
    FormGio.initCustomSelect();
    FormGio.addEventListeners();
  }
  ini() {
    FormGio.form = null;
    FormGio.valorSelector = 0;
    FormGio.initCustomSelect();
    FormGio.addEventListeners();
  }

  static initCustomSelect() {
    const x = document.getElementsByClassName("custom-select");
    const l = x.length;
    for (let i = 0; i < l; i++) {
      const selElmnt = x[i].getElementsByTagName("select")[0];
      const ll = selElmnt.length;

      const a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);

      const b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (let j = 1; j < ll; j++) {
        const c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", (e) =>
          FormGio.selectItem(e, c, selElmnt, a)
        );
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", (e) => FormGio.toggleSelect(e, a, b));
    }
  }

  static selectItem(e, c, selElmnt, a) {
    const s = selElmnt;
    const h = a;
    for (let i = 0; i < s.length; i++) {
      if (s.options[i].innerHTML === c.innerHTML) {
        s.selectedIndex = i;
        h.innerHTML = c.innerHTML;
        const y = c.parentNode.getElementsByClassName("same-as-selected");
        for (let k = 0; k < y.length; k++) {
          y[k].removeAttribute("class");
        }
        c.setAttribute("class", "same-as-selected");
        break;
      }
    }
    h.click();
  }

  static toggleSelect(e, a, b) {
    e.stopPropagation();
    FormGio.closeAllSelect(a);
    b.classList.toggle("select-hide");
    a.classList.toggle("select-arrow-active");
  }

  static closeAllSelect(elmnt) {
    if (elmnt && elmnt.textContent) {
      FormGio.valorSelector = elmnt.textContent;
      console.log(FormGio.valorSelector, "elmnt");
    }

    const x = document.getElementsByClassName("select-items");
    const y = document.getElementsByClassName("select-selected");
    for (let i = 0; i < y.length; i++) {
      if (elmnt !== y[i]) {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (let i = 0; i < x.length; i++) {
      x[i].classList.add("select-hide");
    }
  }

  addEventListeners() {
    document.addEventListener("click", (e) => FormGio.closeAllSelect(e.target));
    document.addEventListener("DOMContentLoaded", () => FormGio.initForm());
  }

  static initForm() {

 
    FormGio.form = document.getElementById("adquisicion-form"); 
 
  }
static callAxiosGio(){
    FormGio.form = document.getElementById("adquisicion-form");
 
        let nuevaAdquisicion = {
          presupuesto: FormGio.form.presupuesto.value,
          unidad: FormGio.form.unidad.value,
          tipo_bien_servicio:document.getElementById("selector1").value, 
          cantidad: FormGio.form.cantidad.value,
          valor_unitario: FormGio.form.valor_unitario.value,
          valor_total: FormGio.form.valor_total.value,
          fecha_adquisicion: FormGio.form.fecha_adquisicion.value,
          proveedor: FormGio.form.proveedor.value,
          documentacion: FormGio.form.documentacion.value,
          activado:document.getElementById("idhabilitarcheck").checked
        };
        console.log(nuevaAdquisicion, "nuevaAdquisicion"); 

          fetch("http://localhost:8000/api/adquisiciones/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaAdquisicion)
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
              }
              return response.json();
            })
            .then((data) => {
              console.log(data,'formulario');
            })
            .catch((error) => {
              console.error("Error adding adquisicion:", error);
            });
          
   
}
  static template(idAddElement="parentForm") {
    let templateVar = ` 
        
    <div class="containerBase">
      <label class="clH2Form">Gestión de Adquisiciones</label>
      <form id="adquisicion-form" class="form containerBase2">
        <label class="clH2Form">Gestión de Adquisiciones</label>
        <div class="grid-item">
          <label class="clLabelorm" for="presupuesto">Presupuesto:</label>
          <input
            class="css-input"
            type="number"
            id="presupuesto"
            name="presupuesto"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="unidad">Unidad:</label>
          <input
            class="css-input"
            type="text"
            id="unidad"
            name="unidad"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="tipo_bien_servicio">Tipo :</label>
      
          <div class="custom-select" style="width: 200px">
            <select id="selector1">
              <option value="0">Select:</option>
              <option value="1">Bien</option>
              <option value="2">Servicio</option>
            </select>
          </div>
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="cantidad">Cantidad:</label>
          <input
            class="css-input"
            type="number"
            id="cantidad"
            name="cantidad"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="valor_unitario">Valor Unitario:</label>
          <input
            class="css-input"
            type="number"
            id="valor_unitario"
            name="valor_unitario"
            step="0.01"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="valor_total">Valor Total:</label>
          <input
            class="css-input"
            type="number"
            id="valor_total"
            name="valor_total"
            step="0.01"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="fecha_adquisicion"
            >Fecha de Adquisición:</label
          >
          <input
            type="date"
            id="fecha_adquisicion"
            name="fecha_adquisicion"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm"  for="proveedor">Proveedor:</label>
          <input
            class="css-input"
            type="text"
            id="proveedor"
            name="proveedor"
            required
          />
        </div>

        <div class="grid-item">
          <label class="clLabelorm" for="documentacion">Documentación:</label>
          <input
            class="css-input"
            type="text"
            id="documentacion"
            name="documentacion"
            required
          />
        </div>

         <div class="grid-item">
          <label class="clLabelorm" for="documentacion">Habilitar</label>
 <input  class="clinputHabilitar"   type="checkbox" id="idhabilitarcheck" name="habilitar" checked    value="true">
        </div>

        <div class="grid-item"></div>
       <div id="idBtSend" class="clbutton"  > gregar Adquisición</div>  
      </form>
  
    </div>


            
            `;
    if (document.getElementById(idAddElement)) {
      document.getElementById(idAddElement).innerHTML += templateVar;


      document.getElementById("idBtSend").onclick=()=>{
        FormGio.callAxiosGio();
      };
    }
  }

  static templateParent(idAddElement) {
    let templateVar = `  
          <div id="parentForm"  class="flex-center"></div>  
            `;
    if (document.getElementById(idAddElement)) {
      document.getElementById(idAddElement).innerHTML += templateVar;
    }
  }
}


export {FormGio};