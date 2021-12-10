<template>
    <v-container style="margin-top: 80px" dense fluid fill-height>
        <v-row dense>
            <v-col>
                <v-card>
                    <v-card-title> isbn04 </v-card-title>
                    <v-card-text v-text="captions.isbn04.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title> isbn05 </v-card-title>
                    <v-card-text v-text="captions.isbn05.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title> isbn06 </v-card-title>
                    <v-card-text v-text="captions.isbn06.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title> isbn08</v-card-title>
                    <v-card-text v-text="captions.isbn08.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title> isbn09 </v-card-title>
                    <v-card-text v-text="captions.isbn09.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title> isbn11 </v-card-title>
                    <v-card-text v-text="captions.isbn11.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title> isbn12</v-card-title>
                    <v-card-text v-text="captions.isbn12.length" align="start">
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                リクエスト済み:
                {{ (finishCounter + counter) * numberOfBooksInOneRequest }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                {{ nextCounter }}
            </v-col>
        </v-row>
        <v-row class="mt-10 mb-16">
            <v-col cols="6" align="center">
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="get3Captions()"
                >
                    get additional books
                </v-btn>
            </v-col>
            <v-col cols="6" align="center">
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="downloadAdditionalCsv()"
                >
                    download CSV data
                </v-btn>
            </v-col>
            <v-col align="center">
                <v-btn
                    color="#3949AB"
                    class="white--text"
                    elevation="0"
                    @click="check04()"
                >
                    check04
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import ISBN04 from "../assets/json/isbn001004.json";
import ISBN05 from "../assets/json/isbn001005.json";
import ISBN06 from "../assets/json/isbn001006.json";
import ISBN08 from "../assets/json/isbn001008.json";
import ISBN09 from "../assets/json/isbn001009.json";
import ISBN11 from "../assets/json/isbn001011.json";
import ISBN12 from "../assets/json/isbn001012.json";

let bookNum = location.search.substr(9);

let allIsbn = {
    isbn04: ISBN04,
    isbn05: ISBN05,
    isbn06: ISBN06,
    isbn08: ISBN08,
    isbn09: ISBN09,
    isbn11: ISBN11,
    isbn12: ISBN12,
};

export default {
    data: function () {
        return {
            bookFace: "",
            title: "",
            genre: "",
            intro: "",
            baseUrl: "https://api.openbd.jp/v1/get?pretty&isbn=",
            captions: {
                isbn04: [],
                isbn05: [],
                isbn06: [],
                isbn08: [],
                isbn09: [],
                isbn11: [],
                isbn12: [],
            },
            counter: 0,
            genres: Object.keys(allIsbn),
            nextCounter: 0,
            numberOfBooksInOneRequest: 40, // 一クリックで各ジャンルからとってくる値。リクエスト数は*7（ジャンル数）
            finishCounter: 0, // ここ変えて、続きからにできる。前回の終わった時に画面下部に表示されていた値
        };
    },
    mounted: function () {
        this.nextCounter = this.finishCounter;
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
        get3Captions: function () {
            // 7ジャンルについてのループ
            for (let l of this.genres) {
                // 一回のメソッド実行で複数の本のキャプションを取得してくる
                for (let k = 0; k < this.numberOfBooksInOneRequest; k++) {
                    let num =
                        this.numberOfBooksInOneRequest *
                            (this.counter + this.finishCounter) +
                        k;
                    if (!(num in allIsbn[l])) break;
                    axios
                        .get(this.baseUrl + allIsbn[l][num])
                        .then((res) => {
                            let title = "";
                            title =
                                res.data[0].onix.DescriptiveDetail.TitleDetail
                                    .TitleElement.TitleText.content;

                            let caption = "";
                            for (let i in res.data[0].onix.CollateralDetail
                                .TextContent) {
                                let j =
                                    res.data[0].onix.CollateralDetail
                                        .TextContent[i];
                                if (j.TextType === "03") {
                                    caption = j.Text;
                                }
                            }
                            // console.log(
                            //     l +
                            //         " :" +
                            //         allIsbn[l][num] +
                            //         ": text: " +
                            //         caption
                            // );
                            if (caption !== "") {
                                this.captions[l].push({
                                    isbn: allIsbn[l][num],
                                    title: title,
                                    caption: caption,
                                });
                            }
                        })
                        .catch((err) => {
                            console.log("ERROR-> " + err);
                        });
                }
            }
            this.counter += 1;
            this.nextCounter += 1;
        },
        downloadAdditionalCsv: function () {
            for (let i in this.captions) {
                let csv = toCsv(this.captions[i]);

                const blob = new Blob([csv], {
                    type: "text/csv",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.download = "additionalCaptions" + i + ".csv";
                a.href = url;
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            }
        },
        check04: function () {
            alert("Test: " + this.captions["isbn04"][0].caption);
            const blob = new Blob(this.captions["isbn04"], {
                type: "text/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.download = "testAdditionalCaptions" + ".json";
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        },
    },
};

function toCsv(array) {
    let csv = "";
    let h = "isbn, title, caption\n";
    csv += h;

    for (let i in array) {
        let oneLine =
            array[i].isbn +
            ", " +
            array[i].title.replace(/,/g, "、").replace(/\r?\n/g, "") +
            "," +
            array[i].caption.replace(/,/g, "、").replace(/\r?\n/g, "") +
            "\n";
        csv += oneLine;
    }
    return csv;
}
</script>
