<template>
    <v-container fluid fill-height>
        <v-row dense align="start" class="mt-16">
            <v-col cols="12"> books: {{ Object.keys(books).length }} </v-col>
            <v-col v-for="(item, i) in books" :key="i" cols="12">
                <v-card outlined>
                    <div class="d-flex flex-no-wrap text-left">
                        <v-row no-gutters>
                            <v-col cols="3" md="2">
                                <v-avatar
                                    class="ma-3"
                                    tile
                                    size="80"
                                    style="height: 180"
                                >
                                    <v-img :src="item.image"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col>
                                <v-row>
                                    <v-col cols="12" class="mt-n2">
                                        <v-card-title>
                                            <div
                                                v-text="item.title"
                                                class="text-h6"
                                            ></div>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <div v-text="i"></div>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols="12" class="mt-n11">
                                        <v-card-text>
                                            <div v-text="item.intro"></div>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="12" class="mt-n9">
                                        <v-row justify="end">
                                            <v-card-actions class="mr-5 mb-4">
                                                <v-btn
                                                    text
                                                    color="error"
                                                    @click="onClickDelete(item)"
                                                >
                                                    削除ぉ
                                                </v-btn>
                                            </v-card-actions>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-col>
            <v-dialog v-model="dialog" v-if="currentItem" width="500">
                <v-card>
                    <v-card-title> ほんまに消してええか？ </v-card-title>
                    <v-card-subtitle
                        class="text-left"
                        v-text="currentItem.title"
                    >
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dialog = false"> やっぱだめ </v-btn>
                        <v-btn text color="error" @click="deleteBook">
                            ええで</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-btn
            fixed
            right
            bottom
            class="mb-8 white--text"
            color="indigo"
            elevation="0"
            @click="downloadCSV"
        >
            csvでダウンロード
        </v-btn>
    </v-container>
</template>

<script>
import axios from "axios";

function toCsv(books) {
    let csv = "";
    let header = "isbn, title, text, image" + "\n";
    csv += header;
    let isbns = Object.keys(books);
    for (let i = 0; i < isbns.length; i++) {
        let book = books[isbns[i]];
        let oneData =
            isbns[i] +
            "," +
            book.title.replace(/,/g, "、").replace(/\r?\n/g, "") +
            "," +
            book.intro.replace(/,/g, "、").replace(/\r?\n/g, "") +
            "," +
            book.image.replace(/,/g, "、").replace(/\r?\n/g, "") +
            "\n";
        csv += oneData;
    }
    return csv;
}

export default {
    data: function () {
        return {
            books: {},
            dialog: false,
            currentItem: null,
        };
    },
    mounted: function () {
        axios
            .get(
                "https://booklist-2212d-default-rtdb.firebaseio.com/books.json"
            )
            .then((res) => {
                this.books = res.data;
            });
    },
    methods: {
        downloadCSV: function () {
            let csv = toCsv(this.books);
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.download = "books.csv";
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        },
        deleteBook() {
            this.dialog = false;
            let title = this.currentItem.title;
            let isbn;
            for (let book in this.books) {
                if (this.books[book].title === title) {
                    isbn = book;
                    break;
                }
            }

            let url =
                "https://booklist-2212d-default-rtdb.firebaseio.com/books/";
            let delUrl = url + isbn + ".json";
            axios
                .delete(delUrl)
                .then(() => {
                    location.href = "/booklist";
                })
                .catch(() => {
                    alert("削除時にfirebase関連のエラー発生です");
                });
        },
        onClickDelete(book) {
            this.currentItem = book;
            this.dialog = true;
        },
    },
};
</script>
