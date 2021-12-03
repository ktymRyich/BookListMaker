<template>
    <v-container style="margin-top: 80px">
        <v-row class="mt-16 mx-0">
            <v-col cols="4">
                <v-img :src="bookFace"></v-img>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="7" class="text-left pt-3">
                <v-row>
                    <div>
                        <h4>タイトル</h4>
                        <h2>{{ title }}</h2>
                    </div>
                </v-row>
                <v-row style="margin: 40px 0px 40px -12px">
                    <div>
                        <h4>ジャンル</h4>
                        <h2>{{ genre }}</h2>
                    </div>
                </v-row>
                <v-row>
                    <div>
                        <h4>紹介文</h4>
                        <h2>{{ intro }}</h2>
                    </div>
                </v-row>
            </v-col>
        </v-row>
        <v-row style="margin-top: 40px; margin-bottom: 100px">
            <v-col cols="12" align="center">
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="addBook()"
                >
                    登録する
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";

let bookNum = location.search.substr(9);

export default {
    data: function () {
        return {
            bookFace: "",
            title: "",
            genre: "",
            intro: "",
        };
    },
    mounted: function () {
        axios
            .get("https://api.openbd.jp/v1/get?isbn=" + bookNum + "&pretty")
            .then((res) => {
                this.bookFace = this.bookFace = res.data[0].summary.cover;
                this.title =
                    res.data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content;

                for (let i in res.data[0].onix.DescriptiveDetail.Subject) {
                    let j = res.data[0].onix.DescriptiveDetail.Subject[i];
                    if (j.SubjectHeadingText != null) {
                        this.genre = j.SubjectHeadingText;
                        break;
                    }
                }
                this.genre = this.genre === "" ? "----" : this.genre;

                for (let i in res.data[0].onix.CollateralDetail.TextContent) {
                    let j = res.data[0].onix.CollateralDetail.TextContent[i];
                    if (j.Text != null) {
                        this.intro = j.Text;
                        break;
                    }
                }
                this.intro = this.intro === "" ? "----" : this.intro;
            })
            .catch(() => {
                alert(
                    "ISBN" + bookNum + "の有用な書籍情報を取得できませんでした"
                );
                location.href = "/";
            });
    },
    methods: {
        addBook: function () {
            let bookData = {
                genre: this.genre,
                intro: this.intro,
                title: this.title,
                image: this.bookFace,
            };
            axios
                .put(
                    "https://booklist-2212d-default-rtdb.firebaseio.com/books/" +
                        bookNum +
                        ".json",
                    bookData
                )
                .then(() => {
                    location.href = "/booklist";
                })
                .catch((err) => {
                    alert("firebaseで次のエラーが発生しました。\n" + err);
                    location.href = "/booklist";
                });
        },
    },
};
</script>
