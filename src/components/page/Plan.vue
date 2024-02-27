<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod__plan">
      <el-form :inline="true" :model="query" @keyup.enter.native="getData()">
  <el-form-item>
    <el-select v-model="query.time" placeholder="请选择时间段">
                    <el-option key="1" label="08:00-10:00" value="1"></el-option>
                    <el-option key="2" label="10:00-12:00" value="2"></el-option>
                    <el-option key="3" label="14:00-16:00" value="3"></el-option>
                    <el-option key="4" label="16:00-18:00" value="4"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item >
        <el-input v-model="query.labName" placeholder="实验室" clearable></el-input>
    </el-form-item>
           <el-form-item>
          <el-button @click="getData()" type="success">查询</el-button>
          <el-button @click="reset()">重置</el-button>
   </el-form-item>
            <el-form-item>
            <el-button type="primary"  @click="addPlanInfo">添加</el-button>
        </el-form-item>
                <el-form-item>
            <el-button :disabled="this.multipleSelection.length === 0" type="danger"  @click="delBatchPlanInfo">批量删除</el-button>
        </el-form-item>
        
  </el-form>
      <el-table v-loading="tableDataLoading" :data="tableData" border @selection-change="selectionChange" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="labName" label="实验室" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.labName !=null">{{scope.row.labName}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
       <el-table-column prop="appointDay" label="日期" width="100" header-align="center" align="center"></el-table-column>
       <el-table-column prop="time" label="时间段"  header-align="center" align="center">
         <template slot-scope="scope">
             <el-tag type="success" v-if="scope.row.time === 1">08:00-10:00</el-tag>
             <el-tag type="success" v-if="scope.row.time === 2">10:00-12:00</el-tag>
             <el-tag type="success" v-if="scope.row.time === 3">14:00-16:00</el-tag>
             <el-tag type="success" v-if="scope.row.time === 4">16:00-18:00</el-tag>
         </template>
       </el-table-column>
     <el-table-column prop="remark" label="备注" header-align="center" align="center">
         <template slot-scope="scope">
         <span v-if="scope.row.remark !=null">{{scope.row.remark}}</span>
         <span v-else>暂无</span>
         </template>
     </el-table-column>
       <el-table-column prop="createTime" label="创建时间" width="160" header-align="center" align="center"></el-table-column>
       <el-table-column prop="updateTime" label="更新时间" width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150" >
            <template slot-scope="scope">
                    <el-button type="success"  size="small"  @click="updatePlanInfo(scope.row)">更新</el-button>
                    <el-button type="danger"  size="small"  @click="delPlanInfo(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
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
      <el-form-item label="日期" prop="appointDay">
          <el-date-picker
                  class="runPicker"
                  v-model="form.appointDay"
                  type="date"
                  placeholder="请选择日期"
                  value-format="yyyy-MM-dd"
          >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="时间段" prop="time">
          <el-radio-group v-model="form.time">
    <el-radio :label="1">08:00-10:00</el-radio>
    <el-radio :label="2">10:00-12:00</el-radio>
    <el-radio :label="3">14:00-16:00</el-radio>
    <el-radio :label="4">16:00-18:00</el-radio>
          </el-radio-group>
          </el-form-item>
    <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="实验室" prop="labId">
        <el-select v-model="form.labId" placeholder="请选择实验室">
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.labName"
                    :value="item.id">
            </el-option>
        </el-select>
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

    import {getPlanList,savePlanInfo,updatePlanInfo,delPlanInfo,delBatchPlanInfo} from '@/api/plan'
                                import {getLabList,} from '@/api/lab'
                    import SingleUpload from '@/components/common/singleUpload';


  export default {
    components: {
    },

    data () {
      return {
        options:[],
        tableData: [],
        query: {
          pageNum: 1,
          pageSize: 10,

          time:null,
          labId:null,
          labName:null,
        },
        form: {},
        multipleSelection: [],
        tableDataLoading: false,
        total: 0,
        addOrUpdateVisible: false,
        rule: {
         appointDay: [{required: true, message: '日期不得为空', trigger: "blur"}],
         time: [{required: true, message: '时间段不得为空', trigger: "change"}],
         remark: [{required: true, message: '备注不得为空', trigger: "blur"}],
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
       * 获取所有计划
       */
      getData(){
        getPlanList(this.query).then(res =>{
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
            getLabList({pageSize:100}).then(res =>{
            this.options = res.data.list;
        });
    
      },

      /**
       * 打开添加框
       */
      addPlanInfo(){
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
      updatePlanInfo(row){
        this.form = JSON.parse(JSON.stringify(row));
        this.addOrUpdateVisible = true;
        },

      /**
       * 按住enter键或者确定按钮提交数据,对后台发请求
       * 如果id为null,就是走添加计划的接口
       * 如果id不为null,就是走更新计划的接口
       */
      formSubmitHandle(){
        this.$refs['form'].validate(valid => {
                if(valid){
          if (this.form.id == null){
        savePlanInfo(this.form).then(res =>{
            if (res.code === 1){
                this.$message.success('添加成功');
                this.getData();
                this.addOrUpdateVisible = false;
            }
            })
          }else {
        updatePlanInfo(this.form).then(res =>{
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
      delPlanInfo(id){
        this.$confirm('确定要删除所选择的吗？', '提示', {
          type: 'warning'
        }).then(action => {
          if (action === 'confirm') {
            delPlanInfo(id).then(res=>{
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
         * 批量删除计划的接口
         */
      delBatchPlanInfo(){
        this.$confirm('确定要删除所选择的吗？', '提示', {
            type: 'warning'
        }).then(action => {
            if (action === 'confirm') {
                delBatchPlanInfo(this.multipleSelection.join(',')).then(res =>{
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
        this.query.time = null;
        this.query.labId = null;
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
