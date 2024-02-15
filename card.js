Vue.createApp({
  data: function () {
    return {
      users: [],
      sort_key: "",
      sort_asc: true,
      search: "",
      search_btn: "",
    };
  },

  mounted() {
    axios.get("cards.json").then((response) => (this.users = response.data));
  },

  methods: {
    sortBy(key) {
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },

    searchButton() {
      let selectValue = document.getElementById("selectValue").value;
      this.search_btn === selectValue;
      this.search_btn = selectValue;
    },
  },

  computed: {
    sort_users() {
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

      if (this.search_btn != "") {
        let selectValue = document.getElementById("selectValue").value;
        if (this.search_btn == "opt1") {
          return this.users.filter((user) => {
            return user.id.toString().includes(this.search.trim());
          });
        }
        if (this.search_btn == "opt2") {
          return this.users.filter((user) => {
            return user.name.includes(this.search.trim());
          });
        }
        if (this.search_btn == "opt3") {
          return this.users.filter((user) => {
            return user.company.includes(this.search.trim());
          });
        }
        if (this.search_btn == "opt4") {
          return this.users.filter((user) => {
            return user.division.includes(this.search.trim());
          });
        }
        if (this.search_btn == "opt5") {
          return this.users.filter((user) => {
            return user.title.includes(this.search.trim());
          });
        }
        return this.users;
      } else {
        return this.users;
      }
    },
  },
}).mount("#app");
