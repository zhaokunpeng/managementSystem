<template>
  <div class="form-data">
    <el-form :model="form" label-width="80px">
        <el-form-item label="课程名称">
            <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="课程等级">
            <el-select v-model="form.level">
                <el-option label="初级" value="初级"></el-option>
                <el-option label="中级" value="中级"></el-option>
                <el-option label="高级" value="高级"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="报名人数">
            <el-input v-model="form.count" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="上线日期">
            <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="技术栈">
            <el-radio-group v-model="form.type">
                <el-radio label="vue" >vue</el-radio>
                <el-radio label="react">react</el-radio>
                <el-radio label="node">node</el-radio>
                <el-radio label="小程序">小程序</el-radio>
                <el-radio label="angular">angular</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: {}
})
export default class FormData extends Vue {
    @Provide() form: object = {
        title:'',
        level:'',
        type:'',
        count:'',
        date:''
    }
}
</script>

<style lang="scss" scoped>
.form-data {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .el-input,
  .el-select {
    width: 200px !important;
  }
  .division {
    margin: 0 10px;
    color: #606266;
  }
}
</style>
