<template>
    <el-container class="layout-content">
        <!--左侧的菜单-->
        <el-aside width="200px">
            <slot name="left"></slot>
        </el-aside>

        <!--右侧内容-->
        <el-main>
            <!-- 面包屑 -->
            <div class="top">
                <i class="fa fa-reorder"></i>
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item
                            v-for="(item,index) in breadcrumbItems"
                            :key="index"
                            :to="{path:item.path}"
                    >{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 内容 -->
            <div class="content">
                <slot name="content"></slot>
            </div>
        </el-main>
    </el-container>
</template>
<script lang="ts">
    import {Component, Vue, Provide, Watch} from 'vue-property-decorator'
    @Component({
        components:{

        }
    })
    export default class Content extends Vue{

        @Provide() breadcrumbItems: any;

        @Watch("$route") handleRouteChange(to: any) {
            this.inquireAddress(to);
        }
        inquireAddress(router: any){
            let baseBreadcrumbItems: any = [{path:'/',title:'管理系统'}]
            for(let index in router.matched ){
                if (router.matched[index].meta && router.matched[index].meta.title) {
                    baseBreadcrumbItems.push(
                        {
                            path: router.matched[index].path ? router.matched[index].path : "/",
                            title: router.matched[index].meta.title
                        }
                    )
                }
            }
            this.breadcrumbItems = baseBreadcrumbItems;
        }
        created(){
            this.inquireAddress(this.$route)
        }
    }
</script>
<style lang="scss" scoped>
    .layout-content {
        width: 100%;
        height: 100%;
        .el-main {
            padding: 10px;
            .top {
                background: #fff;
                height: 54px;
                border-right: none;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                i {
                    font-size: 20px;
                    cursor: pointer;
                    padding-left: 16px;
                    padding-right: 16px;
                }
                .breadcrumb {
                    padding-left: 16px;
                }
            }
            .content {
                padding: 10px;
                height: calc(100% - 54px);
                box-sizing: border-box;
            }
        }
    }
</style>
