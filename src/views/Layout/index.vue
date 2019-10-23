<template>
    <div class="layout">
        layout
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    @Component({
        components:{

        }
    })
    export default class Layout extends Vue{

    }
</script>
<style lang="scss" scoped>
    .layout{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f5f7f9;
    }
</style>