<template>
    <div class="layout-header">
        <el-row>
            <el-col :span="16" >
                <div class="information">
                    <img class="logo" src="@/assets/logo.png" alt="">
                    <span class="title">华创世纪</span>
                </div>
            </el-col>
            <el-col :span="8">
                <el-dropdown class="userinfo"  @command="handleCommand">
                  <span>
                      {{getUser.username}}
                      <img :src="require('@/assets/'+ getUser.key + '.jpg')" alt="">
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="usercentre">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import { State, Getter, Mutation, Action } from "vuex-class";
    @Component({
        components:{

        }
    })
    export default class LayoutHeader extends Vue{
        @Getter('user') getUser: any;
        handleCommand(command: string): void {
            if(command == 'logout'){
                localStorage.removeItem('tsToken')
                this.$router.push('/login')
            }
        }
        created(){

        }
    }
</script>
<style lang="scss" scoped>
    .layout-header {
        background: #495060;
        line-height: 64px;
        height: 64px;

    }
    .information{
        .logo{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            position: relative;
            top: 12px;
            margin-left: 10px;
            margin-right: 10px;
        }
        .title{
            font-size: 18px;
            font-weight: bold;
            color: azure;
            line-height: 64px;
        }
    }
    .userinfo{
        margin-right: 10px;
        color: azure;
        float: right;
        img{
            width: 40px;
            height: 40px;
            position: relative;
            top:12px;
            margin-left: 15px;
        }
    }
</style>