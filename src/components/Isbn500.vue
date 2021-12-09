<template>
    <v-container fluid fill-height>
        <v-row justify="center" class="mt-16">
            <v-col cols="12" sm="8" md="5">
                <v-data-table
                    :headers="labels"
                    :items="books"
                    item-key="name"
                    sort-by="name"
                    group-by="category"
                    class="elevation-1"
                    show-group-by
                >
                </v-data-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn @click="getGenreFromOpenBD"> 追加で取得 </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import genre01 from "../assets/json/genre01.json";
import openbdBooks from "../assets/json/openBD.json";

let genreList = {};

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
            books: genre01.Items,
            genre01: genre01,
            baseUrl:
                "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?" +
                "format=json&applicationId=1094298346051492403",
        };
    },
    methods: {
        getIsbn30: function () {
            let appId = "1094298346051492403";
            let page = 1;
            let genre = "002";
            let url =
                this.baseUrl +
                genre +
                "&page=" +
                page +
                "&applicationId=" +
                appId;
            alert(url);
            axios.get(url).then((res) => {
                alert(Object.keys(res.data.Items).length);
            });
        },
        getGenreFromOpenBD: function () {
            let obdIsbnList = openbdBooks.ISBNs;

            // for (let isbn in obdIsbnList) {
            //     let url = this.baseUrl + "&isbn=" + isbn;
            //     axios.get(url).then((res) => {
            //         alert(Object.keys(res.data.Items).length);
            //     });
            // }
            alert("yeeeeeeeees");
            for (let j in 3) {
                let url = this.baseUrl + "&isbn=" + obdIsbnList[j];
                alert("isbn: " + obdIsbnList[j]);
                axios
                    .get(url)
                    .then((res) => {
                        alert(
                            "取得できた本の冊数: " +
                                Object.keys(res.data.Items).length
                        );
                        const genres =
                            res.data.Items[0].Item.booksGenreId.split("/");
                        for (let i in genres) {
                            if (!(genres[i] in genreList)) {
                                genreList[genres[i]] = "";
                            }
                        }
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }
            alert(Object.keys(genreList));
        },
    },
};
</script>
