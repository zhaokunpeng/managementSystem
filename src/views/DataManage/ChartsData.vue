<template>
  <div class="charts-data">
    <el-tabs type="border-card">
      <el-tab-pane label="折线图" name="line">

      </el-tab-pane>
      <el-tab-pane label="柱状图" name="pillar">柱状图</el-tab-pane>
      <el-tab-pane label="饼状图" name="pie">饼状图</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
    filters: {                      //过滤器
        filterName(value: any) {
            console.log(value)
            return 'Hello filter'
        }
    },
    directives: {
        focus: {
            // 指令的定义
            inserted:  (el,binding) => {
                el.focus()
//          (Array.from({ length: 10 }, (__, index) => index + 1))
            }
        },
        move: {
            inserted:  (el,binding) => {
                let dv = el;
                let x = 0;
                let y = 0;
                let l = 0;
                let t = 0;
                let isDown = false;
                //鼠标按下事件
                dv.onmousedown = function(e) {
                    //获取x坐标和y坐标
                    x = e.clientX;
                    y = e.clientY;

                    //获取左部和顶部的偏移量
                    l = dv.offsetLeft;
                    t = dv.offsetTop;
                    //开关打开
                    isDown = true;
                    //设置样式
                    dv.style.cursor = 'move';
                }
                //鼠标移动
                window.onmousemove = function(e) {
                    if (isDown == false) {
                        return;
                    }
                    //获取x和y
                    var nx = e.clientX;
                    var ny = e.clientY;
                    //计算移动后的左偏移量和顶部的偏移量
                    var nl = nx - (x - l);
                    var nt = ny - (y - t);

                    dv.style.left = nl + 'px';
                    dv.style.top = nt + 'px';
                }
                //鼠标抬起事件
                dv.onmouseup = function() {
                    //开关关闭
                    isDown = false;
                    dv.style.cursor = 'default';
                }
            }
        }
    }
})
export default class ChartsData extends Vue {
    private tabsData:any
    private digit: string = '我现在是'
}
</script>

<style>
</style>
