Vue.createApp({
  data: function () {
    return {
      users: [],
      sort_key: "",
      sort_asc: true,
      search: "",
      search_btn: "",
      newname01: "",
      newname02: "",
      newname03: "",
      newname04: "",
      btn: "",
    };
  },

  mounted() {
    axios.get("cards.json").then((response) => (this.users = response.data));
  },

  methods: {
    //実務課題1
    sortBy(key) {
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },
    //実務課題2
    searchButton() {
      let selectValue = document.getElementById("selectValue").value;
      this.search_btn === selectValue;
      this.search_btn = selectValue;
    },
    //実務課題3
    buttonClick(bt) {
      this.btn === bt;
      this.btn = bt;
    },
  },

  computed: {
    sort_users() {
      //実務課題1
      if (this.sort_key != "") {
        let set = 1;
        this.sort_asc ? (set = 1) : (set = -1);
        this.users.sort((a, b) => {
          if (set == -1) {
            return a[this.sort_key]
              .toString()
              .localeCompare(b[this.sort_key].toString(), "ja", {
                numeric: true,
              });
          } else if (set == 1) {
            return b[this.sort_key]
              .toString()
              .localeCompare(a[this.sort_key].toString(), "ja", {
                numeric: true,
              });
          }
        });
      }
      //実務課題2
      if (this.search_btn != "") {
        let selectValue = document.getElementById("selectValue").value;
        if (selectValue == "opt1") {
          this.search_btn = "";
          return this.users.filter((user) => {
            return user.id.toString().includes(this.search.trim());
          });
        }
        if (selectValue == "opt2") {
          this.search_btn = "";
          return this.users.filter((user) => {
            return user.name.includes(this.search.trim());
          });
        }
        if (selectValue == "opt3") {
          this.search_btn = "";
          return this.users.filter((user) => {
            return user.company.includes(this.search.trim());
          });
        }
        if (selectValue == "opt4") {
          this.search_btn = "";
          return this.users.filter((user) => {
            return user.division.includes(this.search.trim());
          });
        }
        if (selectValue == "opt5") {
          this.search_btn = "";
          return this.users.filter((user) => {
            return user.title.includes(this.search.trim());
          });
        }
      }
      //実務課題3
      if (this.btn != "") {
        let trClass = document.querySelectorAll(".trClass");
        let getTable = document.getElementById("table");
        let newRow = getTable.insertRow(-1);
        let trc = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        td1.className = "td1";
        td2.className = "td2";
        td3.className = "td3";
        td4.className = "td4";
        td5.className = "td5";
        let newname1 = document.getElementById("newname1").value;
        let newname2 = document.getElementById("newname2").value;
        let newname3 = document.getElementById("newname3").value;
        let newname4 = document.getElementById("newname4").value;
        let trueFalse = true;
        let listName1 = document.getElementById("listName1");
        let listName2 = document.getElementById("listName2");
        let listName3 = document.getElementById("listName3");
        let listName4 = document.getElementById("listName4");
        if (newname1 == "") {
          listName1.innerHTML = "名前が未入力です";
          listName1.style.color = "red";
          trueFalse = false;
        } else if (/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/g.test(newname1)) {
          listName1.innerHTML = "全角文字で入力してください";
          listName1.style.color = "red";
          trueFalse = false;
        } else {
          td1.innerHTML = getTable.rows.length - 1;
          newRow.appendChild(td1);
          newRow.appendChild(td2);
          listName1.textContent = "";
          td2.innerHTML = this.newname01;
        }
        if (newname2 == "") {
          listName2.innerHTML = "会社名が未入力です";
          listName2.style.color = "red";
          trueFalse = false;
        } else if (/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(newname2)) {
          listName2.innerHTML = "全角文字で入力してください";
          listName2.style.color = "red";
          trueFalse = false;
        } else {
          newRow.appendChild(td3);
          listName2.textContent = "";
          td4.innerHTML = this.newname03;
        }
        if (newname3 == "") {
          listName3.innerHTML = "部署が未入力です";
          listName3.style.color = "red";
          trueFalse = false;
        } else if (/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/g.test(newname3)) {
          listName3.innerHTML = "全角文字で入力してください";
          listName3.style.color = "red";
          trueFalse = false;
        } else {
          newRow.appendChild(td4);
          listName3.textContent = "";
          td3.innerHTML = this.newname02;
        }
        if (/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/g.test(newname4)) {
          listName4.innerHTML = "全角文字で入力してください";
          listName4.style.color = "red";
          trueFalse = false;
        } else {
          newRow.appendChild(td5);
          listName4.textContent = "";
          td5.innerHTML = this.newname04;
        }
        if (!trueFalse) {
          console.log("a");
          getTable.deleteRow(-1);
        }
        this.btn = "";
        return this.users;
      } else {
        return this.users;
      }
    },
  },
}).mount("#app");
