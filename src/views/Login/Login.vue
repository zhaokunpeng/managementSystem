<template>
    <div class="login">
        <login-header>
            <el-form slot="container" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" label-position="left">
                <div class="title">
                    <h3>账号密码登录</h3>
                </div>
                <el-form-item prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
                        <i slot="prefix" class="fa fa-lock"></i>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button :loading="isLogin" type="primary" style="width: 100%" @click="login">登录</el-button>
                </el-form-item>

                <el-form-item>
                    <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内免密码登录</el-checkbox>
                    <el-button type="text" class="forget" @click="$router.push('/password')">忘记密码？</el-button>
                </el-form-item>
            </el-form>
        </login-header>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Provide} from 'vue-property-decorator'
    import { State, Getter, Mutation, Action } from "vuex-class";
    import LoginHeader from './LoginHeader.vue'
    @Component({
        components:{
            LoginHeader
        }
    })
    export default class Login extends Vue{

        // 存储用户信息
        @Action("setUser") setUser: any;

        @Provide() isLogin: boolean = false
        @Provide() ruleForm:{
            username: string,
            pwd: string,
            autoLogin: boolean
        } = {
            username: '',
            pwd: '',
            autoLogin: true
        }

        @Provide() rules = {
            username:[{ required: true, message: '请输入账号', trigger: 'blur' },],
            pwd:[{ required: true, message: '请输入密码', trigger: 'blur' },]
        }

        login(): void{
            (this.$refs['ruleForm'] as any).validate((valid:boolean)=>{
                if(valid){
//                    console.log('校验通过')
                    this.isLogin = true;
                    (this as any).$axios.post('/api/users/login',this.ruleForm).then((res: any)=>{
                        this.isLogin = false
                        localStorage.setItem('tsToken', res.data.token);
                        // 存储到vuex中
                        this.setUser(res.data.token);
                        //登陆成功后跳转首页
                        this.$router.push('/')
                    }).catch((err: any) => {
                        this.isLogin = false
                    });
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    i{
        font-size: 14px;
        margin-left: 8px;
    }
    .forget{
        float: right;
    }
</style>