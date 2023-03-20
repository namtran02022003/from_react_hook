function renderDatas() {
    let dataLocal = JSON.parse(localStorage.getItem("dataUsers"));
    if (dataLocal.length > 0) {
      let itemchildren = Object.keys(dataLocal[0]);
      let th = itemchildren.map((item) => `<th>${item}</th>`);
      let td = dataLocal.map((datas) => {
        let html_ths = Object.keys(datas);
        let htmltd = html_ths.map((item) => `<td>${datas[item]}</td>`);
        return `<tr>${htmltd.join("")} <td>
                  <button type="button" class="btn-edit" onclick="editUser(${
                    datas.id
                  })">edit</button></td>
                   <td><button class="btn-remove" type="button" onclick="removeUser(${
                     datas.id
                   })">remove</button></td<tr/>`;
      });
      document.getElementById("root").innerHTML = `<table>
                  <tr>${th.join("")}</tr>
                  <tr>${td.join("")}</tr>
          </table>`;
    } else {
      document.getElementById("root").innerHTML = "";
    }
  }
  renderDatas();
  // delete err
  const dataForm = document.querySelectorAll(".form-values");
  Array.from(dataForm).map((element) => {
    element.addEventListener("input", () => {
      if (element.parentElement.querySelector(".err")) {
        element.parentElement.querySelector(".err").innerHTML = "";
      }
    });
  });
  
  function HandleSubmit(type, id) {
    var datas = {};
    var listDateElement = Array.from(dataForm);
    var length = listDateElement.length;
    for (let i = 0; i < length; i++) {
      var element = listDateElement[i];
      if (element.type == "radio") {
        if (element.checked) {
          datas.gender = element.value;
        }
      }
      if (element.type == "text") {
        if (element.name == "phoneNumber") {
          if (
            /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(
              element.value
            )
          ) {
            datas[element.getAttribute("id")] = element.value;
          } else {
            element.focus();
            element.parentElement.querySelector(".err").innerHTML =
              "Phone number không hợp lệ";
            return;
          }
        } else {
          if (element.value.trim().length > 20) {
            element.focus();
            element.parentElement.querySelector(".err").innerHTML =
              "Vui lòng chỉ nhập tối đa 20 ký tự";
            return;
          } else if (element.value.trim().length < 6) {
            element.focus();
            element.parentElement.querySelector(".err").innerHTML =
              "Vui lòng nhập tối thiểu 6 ký tự!";
            return;
          }
          datas[element.getAttribute("id")] = element.value;
        }
      }
      if (element.type == "textarea") {
        datas[element.getAttribute("id")] = element.value;
      }
      if (element.type == "password") {
        if (element.value.trim().length > 20) {
          element.focus();
          element.parentElement.querySelector(".err").innerHTML =
            "Vui lòng nhập tối đa 20 ký tự";
          return;
        }
        if (element.value.trim().length < 6) {
          element.focus();
          element.parentElement.querySelector(".err").innerHTML =
            "Vui lòng nhập tối thiểu 6 ký tự!";
          return;
        }
        datas[element.getAttribute("id")] = element.value;
      }
      if (element.type == "date") {
        if (element.value) {
          datas[element.getAttribute("id")] = element.value;
        } else {
          element.focus();
          element.parentElement.querySelector(".err").innerHTML =
            "Vui lòng nhập trường này!";
          return;
        }
      }
      if (element.type == "email") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value)) {
          datas[element.getAttribute("id")] = element.value;
        } else {
          element.focus();
          element.parentElement.querySelector(".err").innerHTML =
            "Email không hợp lệ!";
          return;
        }
      }
      if (element.type == "select-one") {
        if (element.value) {
          datas[element.getAttribute("id")] = element.value;
        } else {
          element.focus();
          element.parentElement.querySelector(".err").innerHTML =
            "Vui lòng nhập trường này!";
          return;
        }
      }
    }
  
    Array.from(dataForm).map((element) => {
      if (element.type == "radio") {
        if (element.value == "female") {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        element.value = "";
      }
    });
  
    if (type == "submit") {
      datas.id = Math.random().toFixed(5);
      const preData = JSON.parse(localStorage.getItem("dataUsers"));
      if (preData) {
        localStorage.setItem("dataUsers", JSON.stringify([...preData, datas]));
      } else {
        localStorage.setItem("dataUsers", JSON.stringify([datas]));
      }
      renderDatas();
    } else {
      document.getElementById("btnUpdate").disabled = true;
      const preData = JSON.parse(localStorage.getItem("dataUsers"));
      let newListUser = preData.map((user) => {
        if (user.id == id) {
          user = {
            ...datas,
            id: id
          };
        }
        return user;
      });
      localStorage.setItem("dataUsers", JSON.stringify(newListUser));
      renderDatas();
    }
  }
  
  function editUser(id) {
    let dataLocal = JSON.parse(localStorage.getItem("dataUsers"));
    let userEdit = dataLocal.filter((data) => {
      return data.id == id;
    });
    userEdit.map((dataUser) => {
      var idElements = Object.keys(dataUser);
      idElements.map((id) => {
        if (id == "gender") {
          document.querySelector(`#${dataUser[id]}`).checked = true;
        } else {
          if (document.querySelector(`#${id}`)) {
            document.querySelector(`#${id}`).value = dataUser[id];
          }
        }
      });
    });
    let btn = document.getElementById("btnUpdate");
    btn.disabled = null;
    btn.onclick = () => HandleSubmit("update", id);
  }
  
  function removeUser(id) {
    let dataLocal = JSON.parse(localStorage.getItem("dataUsers"));
    let NewListUsers = dataLocal.filter((data) => {
      return data.id != id;
    });
    localStorage.setItem("dataUsers", JSON.stringify(NewListUsers));
    renderDatas();
  }
  