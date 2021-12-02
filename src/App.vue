<template>
    <v-app>
        <div style="height: 100%">
            <router-view />
            <v-footer padless>
                <v-col class="text-center" cols="12">
                    <div id="app">
                        <div id="nav">
                            <router-link to="/">Home</router-link> |
                            <router-link to="/booklist">List</router-link>
                        </div>
                    </div>
                </v-col>
            </v-footer>
        </div>
    </v-app>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #3949ab;
        }
    }
}
</style>
