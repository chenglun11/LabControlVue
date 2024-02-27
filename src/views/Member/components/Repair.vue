<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod__repair">
      <el-form :inline="true" :model="query" @keyup.enter.native="getData()">
    <el-form-item >
        <el-input v-model="query.realName" placeholder="上报人" clearable></el-input>
    </el-form-item>
            <el-form-item >
        <el-input v-model="query.labName" placeholder="实验室" clearable></el-input>
    </el-form-item>
           <el-form-item>
          <el-button @click="getData()" type="success">查询</el-button>
          <el-button @click="reset()">重置</el-button>
   </el-form-item>

                <el-form-item>
            <el-button :disabled="this.multipleSelection.length === 0" type="danger"  @click="delBatchRepairInfo">批量删除</el-button>
        </el-form-item>

  </el-form>
      <el-table v-loading="tableDataLoading" :data="tableData" border @selection-change="selectionChange" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="realName" label="上报人" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.realName !=null">{{scope.row.realName}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
      <el-table-column prop="labName" label="实验室" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.labName !=null">{{scope.row.labName}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
     <el-table-column prop="remark" label="报修信息" header-align="center" align="center">
         <template slot-scope="scope">
         <span v-if="scope.row.remark !=null">{{scope.row.remark}}</span>
         <span v-else>暂无</span>
         </template>
     </el-table-column>
     <el-table-column prop="repairPerson" label="检修人" header-align="center" align="center">
         <template slot-scope="scope">
         <span v-if="scope.row.repairPerson !=null">{{scope.row.repairPerson}}</span>
         <span v-else>暂无</span>
         </template>
     </el-table-column>
     <el-table-column prop="repairDept" label="检修单位" header-align="center" align="center">
         <template slot-scope="scope">
         <span v-if="scope.row.repairDept !=null">{{scope.row.repairDept}}</span>
         <span v-else>暂无</span>
         </template>
     </el-table-column>
       <el-table-column prop="repairTime" label="检修时间" width="160" header-align="center" align="center">
         <template slot-scope="scope">
           <span v-if="scope.row.repairTime !=null">{{scope.row.repairTime}}</span>
           <span v-else>暂无</span>
         </template>
       </el-table-column>
     <el-table-column prop="repairRemark" label="报修说明" header-align="center" align="center">
         <template slot-scope="scope">
         <span v-if="scope.row.repairRemark !=null">{{scope.row.repairRemark}}</span>
         <span v-else>暂无</span>
         </template>
     </el-table-column>
       <el-table-column prop="createTime" label="创建时间" width="160" header-align="center" align="center"></el-table-column>
       <el-table-column prop="updateTime" label="更新时间" width="160" header-align="center" align="center"></el-table-column>
<!--            <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150" >-->
<!--            <template slot-scope="scope">-->
<!--                    <el-button type="success"  size="small"  @click="updateRepairInfo(scope.row)">更新</el-button>-->
<!--            </template>-->
<!--        </el-table-column>-->
     </el-table>
      <el-pagination
              :current-page="query.pageNum"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="query.pageSize"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              @current-change="pageCurrentChange">
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
 <el-dialog  :visible.sync="addOrUpdateVisible" :title="!form.id ? '新增' : '编辑'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="form" :rules="rule" ref="form" label-width="100px">
    <el-form-item label="报修信息" prop="remark">
        <el-input v-model="form.remark" placeholder="报修信息"></el-input>
    </el-form-item>
    <el-form-item label="检修人" prop="repairPerson">
        <el-input v-model="form.repairPerson" placeholder="检修人"></el-input>
    </el-form-item>
    <el-form-item label="检修单位" prop="repairDept">
        <el-input v-model="form.repairDept" placeholder="检修单位"></el-input>
    </el-form-item>
    <el-form-item label="检修时间" prop="repairTime">
      <el-date-picker
              class="runPicker"
              v-model="form.repairTime"
              type="datetime"
              placeholder="请选择检修时间"
              value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="报修说明" prop="repairRemark">
        <el-input v-model="form.repairRemark" placeholder="报修说明"></el-input>
    </el-form-item>
 </el-form>
        <template slot="footer">
          <el-button @click="addOrUpdateVisible = false">取消</el-button>
          <el-button type="primary" @click="formSubmitHandle()">确认</el-button>
        </template>
</el-dialog>


    </div>
  </el-card>
</template>

<script>
    import { } from '@/utils/validator'

    import {getRepairList,saveRepairInfo,updateRepairInfo,delRepairInfo,delBatchRepairInfo} from '@/api/repair'
                                import {getUserList,} from '@/api/user'
                                            import {getLabList,} from '@/api/lab'
                    import SingleUpload from '@/components/common/singleUpload';


  export default {
    components: {
    },

    data () {
      return {
        tableData: [],
        query: {
          pageNum: 1,
          pageSize: 10,

          userId:null,
          labId:null,
          realName:null,
          labName:null,
        },
        form: {},
        multipleSelection: [],
        tableDataLoading: false,
        total: 0,
        addOrUpdateVisible: false,
        rule: {
         remark: [{required: true, message: '报修信息不得为空', trigger: "blur"}],
         repairPerson: [{required: true, message: '检修人不得为空', trigger: "blur"}],
         repairDept: [{required: true, message: '检修单位不得为空', trigger: "blur"}],
         repairTime: [{required: true, message: '检修时间不得为空', trigger: "blur"}],
         repairRemark: [{required: true, message: '报修说明不得为空', trigger: "blur"}],
        },
    }
   },
    created() {
      this.getData();
    },
    computed:{
        userType(){
            return Number(sessionStorage.getItem('userType'))
        }
    },

    methods:{


      /**
       * 获取所有报修
       */
      getData(){
        this.query.userId = sessionStorage.getItem('userId')
        getRepairList(this.query).then(res =>{
          this.tableData = res.data.list;
          this.total = res.data.total;
        });


      },

      /**
       * 打开添加框
       */
      addRepairInfo(){
        this.form = {};
        this.form.id = null;
        if (this.$refs['form'] !==undefined){
          this.$refs['form'].resetFields();
        }
        this.addOrUpdateVisible = true;
      },

      /**
       * 打开更新框
       */
      updateRepairInfo(row){
        this.form = JSON.parse(JSON.stringify(row));
        this.addOrUpdateVisible = true;
        },

      /**
       * 按住enter键或者确定按钮提交数据,对后台发请求
       * 如果id为null,就是走添加报修的接口
       * 如果id不为null,就是走更新报修的接口
       */
      formSubmitHandle(){
        this.$refs['form'].validate(valid => {
                if(valid){
          if (this.form.id == null){
        saveRepairInfo(this.form).then(res =>{
            if (res.code === 1){
                this.$message.success('添加成功');
                this.getData();
                this.addOrUpdateVisible = false;
            }
            })
          }else {
        updateRepairInfo(this.form).then(res =>{
              this.$message.success('更新成功');
              this.getData();
              this.addOrUpdateVisible = false;
            })
          }
          // this.$refs['form'].resetFields()

        }
        })
      },

      /**
       *单个删除数据
       */
      delRepairInfo(id){
        this.$confirm('确定要删除所选择的吗？', '提示', {
          type: 'warning'
        }).then(action => {
          if (action === 'confirm') {
            delRepairInfo(id).then(res=>{
              if (res.code === 1){
                this.$message.success('删除成功');
                this.getData();
              }else {
                return this.$message.error(res.msg)
              }

            })
          }
        }).catch(() => {});

      },



      /**
       * 选中table表格事件
       */
      selectionChange(val){
        this.multipleSelection = [];
        val.forEach((item) => {
          this.multipleSelection.push(item.id);
        });
      },

        /**
         * 批量删除报修的接口
         */
      delBatchRepairInfo(){
        this.$confirm('确定要删除所选择的吗？', '提示', {
            type: 'warning'
        }).then(action => {
            if (action === 'confirm') {
                delBatchRepairInfo(this.multipleSelection.join(',')).then(res =>{
                    this.$message.success('批量删除成功');
                    this.getData();
                })
            }
        }).catch(() => {});

      },

      /**
       * 重置数据
       */
      reset(){
        this.query.userId = null;
        this.query.labId = null;
             this.query.realName=null
                  this.query.labName=null
             this.$set(this.query, 'pageNum', 1);
        this.getData();
      },



      /**
       * 分页(改变页码)
       * @param val
       */
      pageCurrentChange(val){
        this.$set(this.query, 'pageNum', val);
        this.getData();
      },

      /**
       * 分页(改变每页条数)
       * @param val
       */
      pageSizeChange(val){
        this.$set(this.query, 'pageSize', val);
        this.getData();
      },

      /**
       * 关闭弹窗
       */
     clearAddForm(){
     this.addOrUpdateVisible = false;
    },



    },


  }
</script>


<style scoped>

                                                                                    </style>
