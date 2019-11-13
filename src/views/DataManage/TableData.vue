<template>
  <div class="table-data">
    <div class="search-box">
      <el-input size="small" v-model="searchVal" @blur="handleSearch"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%" :height="tHeight" class="table-box">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="课程名称" prop="title"></el-table-column>
      <el-table-column width="120" label="课程等级" prop="level"></el-table-column>
      <el-table-column width="120" label="技术栈" prop="type"></el-table-column>
      <el-table-column width="120" label="报名人数" prop="count"></el-table-column>
      <el-table-column width="160" label="上线日期" prop="date"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditor(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click.native.prevent="deleteCourse(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" ref="page-box">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[5,10, 20, 30, 40]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </div>
    <EditDialog :form="formData" :dialogVisible="dialogVisible" @colseDialog="colseDialog"></EditDialog>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Provide } from "vue-property-decorator";
    import { State, Getter, Mutation, Action } from "vuex-class";
    import EditDialog from "./EditDialog.vue";
    @Component({
        components: { EditDialog }
    })
    export default class TableData extends Vue {
        @Provide() searchVal:string = '';    //搜索内容
        @Provide() tHeight: number = document.body.offsetHeight - 270;   //表格高度
        @Provide() tableData: any = [];
        @Provide() page: number = 1;
        @Provide() size: number = 5;
        @Provide() total: number = 0;

        @Provide() dialogVisible: boolean = false;
        @Provide() formData: object = {
          title:'',
          level:'',
          type:'',
          count:'',
          date:''
        }

        colseDialog(){
            this.dialogVisible = false
        }
        handleEditor(index:number,row: any): void{
          this.formData = row;
          this.dialogVisible = true
        }
        handleSizeChange(val: number): void {
            this.size = val;
            this.page = 1;
            this.searchVal ? this.loadSearchData() : this.loadData()
        }
        handleCurrentChange(val: number): void {
            this.page = val
            this.searchVal ? this.loadSearchData() : this.loadData()
        }
        handleSearch(): void{
            this.page = 1;
            this.searchVal ? this.loadSearchData() : this.loadData()
        }
        deleteCourse(ind: number,row: any): void{
            this.tableData.splice(ind,1)
        }
        loadData(): void{
            (this as any).$axios(`/api/profiles/loadMore/${ this.page}/${this.size}`).then((res: any)=>{
                console.log(res.data)
                this.tableData = res.data.data.list
                this.total = res.data.data.total
            }).catch((err: any) => {

            });
        }
        loadSearchData(){
            (this as any).$axios(`/api/profiles/search/${this.searchVal}/${ this.page}/${this.size}`).then((res: any)=>{
                console.log(res.data)
                this.tableData = res.data.datas.list
                this.total = res.data.data.total
            }).catch((err: any) => {

            });
        }
        created(){
            this.loadData()
        }
    }
</script>

<style lang="scss" scoped>
  .table-data {
    height: 100%;
    .table-box {
      font-size: 14px;
    }
    .pages {
      background: #fff;
      margin-top: 10px;
      padding: 10px 10px;
      text-align: right;
      height: 55px;
      box-sizing: border-box;
    }
    .search-box {
      background: #fff;
      margin-bottom: 10px;
      padding: 10px 10px;
      border-radius: 4px;
      height: 55px;
      box-sizing: border-box;
      .el-input {
        width: 200px;
        margin-right: 10px;
      }
    }
  }
</style>
