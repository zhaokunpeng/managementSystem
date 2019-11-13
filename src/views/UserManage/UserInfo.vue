<!--个人中心-->
<template>
  <div class="user-info">
    <el-card shadow="always" class="img-box">
      <img :src="require('@/assets/'+ getUser.key + '.jpg')" alt="">
      <span>{{getUser.username}}</span>
    </el-card>
    <el-card shadow="always" class="info-box">
      <el-form :model="UserData" ref="UserData" label-width="80px">
        <el-form-item label="用户名">
          <el-input readonly v-model="getUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="UserData.pwd">

          </el-input>
        </el-form-item>
        <el-button :disabled="!UserData.pwd" :loading="loading" type="primary" @click="alterPwd">
          修改密码
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Provide } from "vue-property-decorator";
    import { State, Getter, Mutation, Action } from "vuex-class";
    @Component({
        components: {}
    })
    export default class UserInfo extends Vue {
        @Getter('user') getUser: any;
        @Provide() UserData:{
            username: string,
            pwd: string
        } = {
            username: '',
            pwd: ''
        }
        @Provide() loading: boolean = false;

        alterPwd(){
            this.UserData.username = this.getUser.username;
            this.loading = true;
            (this as any).$axios.post('/api/users/changePwd',this.UserData).then((res: any)=>{
                this.loading = false
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
                this.$router.push('/login')
            }).catch((err: any) => {
                this.loading = false
            });
        }
        created(){
            console.log(this.getUser)
        }
    }
</script>

<style lang="scss" scoped>
  .user-info {
    height: calc(100% - 70px);
    display: flex;
    overflow: auto;
    color: #606266;
    .img-box,
    .info-box {
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      background: #fff;
      .title {
        border-bottom: 1px solid #dcdfe6;
        padding: 10px;
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .img-box {
      text-align: center;
      width: 30%;
      margin-right: 10px;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      h4 {
        margin-top: 20px;
        font-size: 16px;
      }
    }
    .info-box {
      flex: 1;
      .form-box {
        padding: 10px;
      }
    }
  }
</style>
