<template>
    <v-container fluid fill-height>
        <v-row class="mt-16">
            <v-col class="text-h1" v-text="genreList[dore]"></v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(0)"
                >
                    05
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(1)"
                >
                    06
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(2)"
                >
                    08
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(3)"
                >
                    12
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="#6979DB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(4)"
                >
                    04
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="#6979DB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(5)"
                >
                    09
                </v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="#6979DB"
                    class="white--text"
                    elevation="0"
                    @click="setDore(6)"
                >
                    11
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <v-col cols="12">
                        1秒くらい間を開けて押してください。rakutenから怒られる。そしてバグる。
                    </v-col>
                    <v-col cols="12">
                        <v-btn @click="getAdditionalBooks"> 追加で取得 </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-btn @click="download"> DOWNLOAD </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-h4" v-text="isbn00100x.length"> </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
// import genre01 from "../assets/json/genre01.json";

let genreList = [
    "001005",
    "001006",
    "001008",
    "001012",
    "001004",
    "001009",
    "001011",
];

export default {
    data: function () {
        return {
            labels: [
                {
                    text: "書籍名",
                    align: "start",
                    value: "title",
                    groupable: false,
                },
                { text: "Category", value: "category", align: "right" },
                { text: "ISBN", value: "isbn", align: "right" },
            ],
            // books: genre01.Items,
            // genre01: genre01,
            baseUrl:
                "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?" +
                "format=json&applicationId=1094298346051492403",
            counterGet: 0,
            isbn00100x: [],
            dore: 0,
            genreList: genreList,
        };
    },
    methods: {
        setDore: function (dore) {
            this.counterGet = 0;
            this.isbn00100x = [];
            this.dore = dore;
        },
        getAdditionalBooks: function () {
            let booksGenreId = "";
            let url = this.baseUrl;
            booksGenreId = genreList[this.dore];
            url += "&booksGenreId=" + booksGenreId;
            for (let j = 0; j < 3; j++) {
                let pages = "&page=" + (3 * this.counterGet + j + 1);
                axios
                    .get(url + pages)
                    .then((res) => {
                        for (let i in res.data.Items) {
                            this.isbn00100x.push(res.data.Items[i].Item.isbn);
                            // alert("isbn: " + res.data.Items[i].Item.isbn);
                        }
                    })
                    .catch((err) => {
                        alert(
                            err + "\nもう一度ジャンル指定してやり直してください"
                        );
                    });
            }
            this.counterGet += 1;
        },
        checkIsbns: function () {
            alert(this.isbn00100x[0]);
        },
        download: function () {
            const blob = new Blob([this.isbn00100x], { type: "text/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.download = "isbn" + genreList[this.dore] + ".json";
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        },
    },
};
</script>
