<template>
    <v-app>
        <v-main>
            <!-- <SearchBook /> -->
            <Preview />
        </v-main>
    </v-app>
</template>

<script>
// import SearchBook from "./components/SearchBook";
import Preview from "./components/Preview";

export default {
    name: "App",

    components: {
        // SearchBook,
        Preview,
    },

    data: () => ({
        //
    }),
};
</script>
