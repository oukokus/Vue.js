<!--実務課題1-->
    Vue.createApp({
        data: function () {
            return {
                users: [],
                sort_key: "",
                sort_asc: true,
            }
        },

        mounted() {
            axios
                .get("cards.json")
                .then((response) => (this.users = response.data));
        },

        methods: {
            sortBy(key) {
                this.sort_key === key
                    ? (this.sort_asc = !this.sort_asc)
                    : (this.sort_asc = true);
                this.sort_key = key;
            },
        },

        computed: {
            sort_users() {
                if (this.sort_key != "") {
                    let set = 1;
                    this.sort_asc ? (set = 1) : (set = -1);
                    this.users.sort((a, b) => {
                        if (set == -1) {
                            return a[this.sort_key].toString().localeCompare(b[this.sort_key].toString(), 'ja', { numeric: true })
                        } else if (set == 1) {
                            return b[this.sort_key].toString().localeCompare(a[this.sort_key].toString(), 'ja', { numeric: true });
                        }
                    })
                    return this.users;
                } else {
                    return this.users;
                }
            }
        }
    }).mount("#app")

