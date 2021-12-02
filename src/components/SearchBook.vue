<template>
    <v-container fluid fill-height align="center">
        <v-row align="center">
            <v-col align="center">
                <v-card flat max-width="400px">
                    <v-text-field outlined v-model="bookNum"></v-text-field>
                    <v-card-actions>
                        <v-container>
                            <v-row>
                                <v-col align="center">
                                    <v-btn
                                        elevation="0"
                                        color="#3949AB"
                                        style="color: white"
                                        @click="check"
                                    >
                                        search
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            bookNum: "",
        };
    },
    methods: {
        check() {
            location.href = "/preview?booknum=" + this.bookNum;
        },
    },
};
</script>
