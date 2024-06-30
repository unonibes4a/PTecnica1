import { ModalActualizar } from "./classModalUpdate.js";

class TableViews {
  static dataBackend = [];

  static template(idAddElement) {
    let templateVar = `  
    
     <div id="idparenrtable">
   <label for="">Lista de Adquisiciones</label>
      <div id="table-container">
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <table id="modalTable"></table>
          </div>
        </div>
      </div>
    </div>
      `;

    document.getElementById(idAddElement).innerHTML += templateVar;
  }

  static async obtenerAdquisiciones({ hostName = "http://localhost:8000" }) {
    const url = hostName + "/api/adquisiciones/";

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

      let datos = await response.json();
      TableViews.dataBackend = datos;
      console.log(datos);
      const tableContainer = document.getElementById("table-container");
      tableContainer.appendChild(TableViews.createTable(datos));
    } catch (error) {
      console.error("Error al obtener adquisiciones:", error);
    }
  }

  static createTable(data) {
    console.log(ModalActualizar, "ModalActualizar");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const excluir = ["", "type"];
    const columns = Object.keys(data[0]).filter(
      (key) => !excluir.includes(key)
    );

    const trHead = document.createElement("tr");
    columns.forEach((col) => {
      const th = document.createElement("th");
      th.textContent = col.charAt(0).toUpperCase() + col.slice(1);
      th.onclick = () => TableViews.sortTableByColumn(data, col);
      trHead.appendChild(th);
    });

    const thActions = document.createElement("th");
    thActions.textContent = "Acciones";
    trHead.appendChild(thActions);

    thead.appendChild(trHead);
    table.appendChild(thead);

    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      let clickCount = 0;
      let clickTimer;
      if(!item.activado){
        tr.classList.add('classTdesh');
      }
        tr.onclick = () => {
            clickCount++;
            if (clickCount === 3) {
              clearTimeout(clickTimer);
              TableViews.showModal(item, columns);
              clickCount = 0;
            } else {
              clearTimeout(clickTimer);
              clickTimer = setTimeout(() => {
                clickCount = 0;
              }, 500);
            }
          };
      

      

      columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = item[col];
        tr.appendChild(td);
      });

      const tdActions = document.createElement("td");
      const btnDelete = document.createElement("img");
       btnDelete.textContent = "D";
    
      btnDelete.classList.add('btredodne');
      btnDelete.width=23;
      btnDelete.height=23;
      if(item.activado){
        btnDelete.onclick = (e) => {
            e.stopPropagation();
            TableViews.deleteRow(tr, index, item);
          };
        btnDelete.src='./textures/dimg.png';
      }
      else{

        btnDelete.src='./textures/deshdimg.png';
      }
       
      const btnUpdate = document.createElement("img");
      btnUpdate.textContent = "A";
    
      btnUpdate.width=23;
      btnUpdate.height=23;
     
      if(item.activado){
        btnUpdate.onclick = (e) => {
            e.stopPropagation();
            TableViews.updateRow(tr, index, item);
            ModalActualizar.openModal(window.idUpdate);
          };
          btnUpdate.src='./textures/imgUpdate.png';
      }
      else{

        btnUpdate.src='./textures/hdeshimgUpdate.png';
      }

      const btnMove = document.createElement("button");
      btnMove.textContent = "Mover";
      btnMove.onclick = (e) => {
        e.stopPropagation();
        TableViews.moveRow(tr, index, item);
      };

      tdActions.appendChild(btnDelete);
      tdActions.appendChild(btnUpdate);
 
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }

  static deleteRow(row, index, item) {
    row.remove();
    console.log(`Fila ${index + 1} eliminada v`);
    window.idUpdate = item.id;
  }

  static updateRow(row, index, item) {
    console.log(row, "row v");

    console.log(`Fila ${index + 1} actualizada v`);
    if (window.modalmini) {
      window.modalmini.style.display = "none";
    }

    window.idUpdate = item.id;
    ModalActualizar.openModal(window.idUpdate);
  }

  static moveRow(row, index, item) {
    console.log(row.children, item, "rowv");

    console.log(`Fila ${index + 1} movida v`);
    window.idUpdate = item.id;
  }

  static sortTableByColumn(data, column) {
    const isNumericColumn = typeof data[0][column] === "number";
    const sortedData = data.slice().sort((a, b) => {
      if (isNumericColumn) {
        return currentSortOrder === "asc"
          ? a[column] - b[column]
          : b[column] - a[column];
      } else {
        return currentSortOrder === "asc"
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
    });

    currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    currentSortColumn = column;

    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(TableViews.createTable(sortedData));

    const ths = document.querySelectorAll("th");
    ths.forEach((th) => {
      th.classList.remove("sorted-asc", "sorted-desc");
      if (th.textContent.toLowerCase() === column.toLowerCase()) {
        th.classList.add(
          currentSortOrder === "asc" ? "sorted-asc" : "sorted-desc"
        );
      }
    });
  }

  static showModal(item, columns) {
    const modal = document.getElementById("myModal");
    const modalTable = document.getElementById("modalTable");

    modalTable.innerHTML = "";

    columns.forEach((col) => {
      const tr = document.createElement("tr");
      const tdKey = document.createElement("td");
      tdKey.textContent = col.charAt(0).toUpperCase() + col.slice(1);
      const tdValue = document.createElement("td");
      tdValue.textContent = item[col];
      tr.appendChild(tdKey);
      tr.appendChild(tdValue);
      modalTable.appendChild(tr);
    });

    const trButtons = document.createElement("tr");
    const tdButtons = document.createElement("td");
    tdButtons.colSpan = 2;

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar";
    btnDelete.onclick = () => TableViews.deleteRow(modal, item.id, item);

    const btnUpdate = document.createElement("button");
    btnUpdate.textContent = "Actualizar";
    btnUpdate.onclick = () => TableViews.updateRow(modal, item.id, item);

    const btnMove = document.createElement("button");
    btnMove.textContent = "Mover";
    btnMove.onclick = () => TableViews.moveRow(modal, item.id, item);

    tdButtons.appendChild(btnDelete);
    tdButtons.appendChild(btnUpdate);
    tdButtons.appendChild(btnMove);
    trButtons.appendChild(tdButtons);
    modalTable.appendChild(trButtons);

    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = () => {
      modal.style.display = "none";
    };
    window.modalmini = modal;

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  static async actualizarAdquisicion(host, id, newData) {
    const url = host + `/api/adquisiciones/${id}/`;

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
    } catch (error) {
      console.error("Error al actualizar la adquisición:", error);
    }
  }
  static async eliminarAdquisicion(host, id) {
    const url = host + `/api/adquisiciones/${id}/`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      console.log(`Adquisición con ID ${id} eliminada correctamente`);
    } catch (error) {
      console.error("Error al eliminar la adquisición:", error);
    }
  }
}

export { TableViews };
