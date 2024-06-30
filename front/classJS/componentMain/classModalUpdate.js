 
import { DOMVisibility } from "../classRender.js"; 
import {TableViews} from "./classViewTable.js";

class ModalActualizar {
    static idUpdate=null;
    static openModal(id) {
        ModalActualizar.template();
 
       document.getElementById("myModalUpdate").style.display = "block";
      ModalActualizar.fetchAdquisicion({id:window.idUpdate ,hostname:window.objApp.hostName});  
   
      window.openModalUpdate=function()  {
 
        if(window.idUpdate){
            ModalActualizar.submitUpdateForm({id:window.idUpdate ,hostname:window.objApp.hostName});

         
        }
         
       
      }
      
       
       
      window.closeModalUpdate=function()  {
        DOMVisibility.removeAllChildren("#idmainApp");
        TableViews.template("idmainApp");
        TableViews.obtenerAdquisiciones({host:window.objApp.hostName});
        
       
          
      }
      
    }
  
    static closeModal() {
      document.getElementById("myModalUpdate").style.display = "none";
    }
  
    static async fetchAdquisicion({id=1,hostname='http://localhost:8000'}) {
      const url =hostname+ `/api/adquisiciones/${id}/`;
  console.log(id,' idfetch actual');
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data,'data');
        if(data.activado){
            document.getElementById("idhabilitarcheck2").checked = true;
        }
        else{
            document.getElementById("idhabilitarcheck2").checked = false;
        }
  
        document.getElementById("presupuesto").value = data.presupuesto;
        document.getElementById("unidad").value = data.unidad;
        document.getElementById("tipo_bien_servicio").value = data.tipo_bien_servicio;
        document.getElementById("cantidad").value = data.cantidad;
        document.getElementById("valor_unitario").value = data.valor_unitario;
        document.getElementById("valor_total").value = data.valor_total;
        document.getElementById("fecha_adquisicion").value = data.fecha_adquisicion;
        document.getElementById("proveedor").value = data.proveedor;
        document.getElementById("documentacion").value = data.documentacion;
      } catch (error) {
        console.error("Error al obtener la adquisición:", error);
      }
    }
  
    static async submitUpdateForm({id=1,hostname='http://localhost:8000'}) {
  
      const url = hostname+`/api/adquisiciones/${id}/`;
  
      const newData = {
        presupuesto: document.getElementById("presupuesto").value,
        unidad: document.getElementById("unidad").value,
        tipo_bien_servicio: document.getElementById("tipo_bien_servicio").value,
        cantidad: document.getElementById("cantidad").value,
        valor_unitario: document.getElementById("valor_unitario").value,
        valor_total: document.getElementById("valor_total").value,
        fecha_adquisicion: document.getElementById("fecha_adquisicion").value,
        proveedor: document.getElementById("proveedor").value,
        documentacion: document.getElementById("documentacion").value,
        activado: document.getElementById("idhabilitarcheck2").checked 
      };
  
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newData),
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
  
        const updatedData = await response.json();
        console.log("Adquisición actualizada:", updatedData);
        ModalActualizar.closeModal();
        DOMVisibility.removeAllChildren("#idmainApp");
        TableViews.template("idmainApp");
        TableViews.obtenerAdquisiciones({host:window.objApp.hostName});
      } catch (error) {
        DOMVisibility.removeAllChildren("#idmainApp");
        TableViews.template("idmainApp");
        TableViews.obtenerAdquisiciones({host:window.objApp.hostName});
        console.error("Error al actualizar la adquisición:", error);
      }
    }

   static template(idAddElement="idmainApp") {

    console.log(idAddElement,"template ");
        let templateVar = ` 
 
        
    <div id="myModalUpdate" class="modal2">
      <div class="modal-content2">
        <div id=" idcerrarModalUpdate" onclick="window.closeModalUpdate();" class="close2"  ">&times;</div>
        <h2 class="actualih2">Actualizar Adquisición</h2>
        <form id="updateForm" class="formUdate containerAutoGrid">
          <div class="itemAutoGrid">
            <label for="presupuesto">Presupuesto:</label>
            <input class="formUdateinput" 
              type="number"
              id="presupuesto"
              name="presupuesto"
              step="0.01"
            />
          </div>
          <div class="itemAutoGrid">
            <label for="unidad">Unidad:</label>
            <input class="formUdateinput"  type="text" id="unidad" name="unidad" />
          </div>
          <div class="itemAutoGrid">
            <label for="tipo_bien_servicio">Tipo de Bien o Servicio:</label>
            <input class="formUdateinput" 
              type="text"
              id="tipo_bien_servicio"
              name="tipo_bien_servicio"
            />
          </div>
          <div class="itemAutoGrid">
            <label for="cantidad">Cantidad:</label>
            <input class="formUdateinput"  type="number" id="cantidad" name="cantidad" />
          </div>
          <div class="itemAutoGrid">
            <label for="valor_unitario">Valor Unitario:</label>
            <input class="formUdateinput" 
              type="number"
              id="valor_unitario"
              name="valor_unitario"
              step="0.01"
            />
          </div>
          <div class="itemAutoGrid">
            <label for="valor_total">Valor Total:</label>
            <input class="formUdateinput" 
              type="number"
              id="valor_total"
              name="valor_total"
              step="0.01"
            />
          </div>
          <div class="itemAutoGrid">
            <label for="fecha_adquisicion">Fecha de Adquisición:</label>
            <input class="formUdateinput" 
              type="date"
              id="fecha_adquisicion"
              name="fecha_adquisicion"
            />
          </div>
          <div class="itemAutoGrid">
            <label for="proveedor">Proveedor:</label>
            <input class="formUdateinput"  type="text" id="proveedor" name="proveedor" />
          </div>
          <div class="itemAutoGrid">
            <label for="documentacion">Documentación:</label>
            <textarea id="documentacion" name="documentacion"></textarea>
          </div>
      
              <div class="itemAutoGrid">
            <label for="habilitar">Habilitar:</label>
          <input    class="clinputHabilitar"   type="checkbox" id="idhabilitarcheck2" name="habilitar"      value="true">
          </div>   
               
        </form>
        
      </div>
      <div onclick="window.openModalUpdate();"    class="btactualiza"   >
              Actualizar
            </div> 
    </div>


 
            
            `;
            if(!document.getElementById("myModalUpdate")){

                document.getElementById(idAddElement).innerHTML += templateVar;
            }
            else{
                document.getElementById("myModalUpdate").style.display = "block";
            }
     
      }
    
  }
 
 
  export {ModalActualizar};