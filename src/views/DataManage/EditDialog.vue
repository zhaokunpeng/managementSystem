<template>
    <div class="EditDialog">
        <el-dialog title="编辑课程"
                   :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="100px" size="small">
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
                <!--<el-form-item label="技术栈">-->
                    <!--<el-input v-model="form.type" placeholder="请输入"></el-input>-->
                <!--</el-form-item>-->
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
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="$emit('colseDialog')">取 消</el-button>
                <el-button type="primary" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component({
  components: {}
})
export default class EditDialog extends Vue {
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
    @Prop(Boolean) dialogVisible!: boolean;
    @Prop(Object) form!:{
        title:string;
        level:string;
        type:string;
        count:string;
        date:string;
        _id:string;
    };

    created(){

    }
}
</script>

<style lang="scss" scoped>

</style>
