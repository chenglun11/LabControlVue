<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod__appoint">
      <el-form :inline="true" :model="query" @keyup.enter.native="getData()">
  <el-form-item>
    <el-select v-model="query.status" placeholder="请选择状态">
                    <el-option key="1" label="待审核" value="1"></el-option>
                    <el-option key="2" label="审核通过" value="2"></el-option>
                    <el-option key="3" label="审核不通过" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-select v-model="query.time" placeholder="请选择时间段">
                    <el-option key="1" label="08:00-10:00" value="1"></el-option>
                    <el-option key="2" label="10:00-12:00" value="2"></el-option>
                    <el-option key="3" label="14:00-16:00" value="3"></el-option>
                    <el-option key="4" label="16:00-18:00" value="4"></el-option>
    </el-select>
  </el-form-item>
            <el-form-item >
        <el-input v-model="query.labName" placeholder="实验室名" clearable></el-input>
    </el-form-item>
        <el-form-item >
        <el-input v-model="query.location" placeholder="位置" clearable></el-input>
    </el-form-item>
               <el-form-item>
          <el-button @click="getData()" type="success">查询</el-button>
          <el-button @click="reset()">重置</el-button>
   </el-form-item>
  </el-form>
      <el-table v-loading="tableDataLoading" :data="tableData" border @selection-change="selectionChange" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="realName" label="预约人2" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.realName !=null">{{scope.row.realName}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
      <el-table-column prop="labName" label="实验室名" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.labName !=null">{{scope.row.labName}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
      <el-table-column prop="location" label="位置" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.location !=null">{{scope.row.location}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
      <el-table-column prop="imageUrl" label="图片"  header-align="center" align="center">
          <template slot-scope="scope">
              <el-image
                      style="width: 60px; height: 60px"
                      v-if="scope.row.imageUrl !=null"
                      :src="scope.row.imageUrl"
                      :preview-src-list="[scope.row.imageUrl]">
              </el-image>
              <span v-else>暂无图片</span>
          </template>
      </el-table-column>
       <el-table-column prop="status" label="状态"  header-align="center" align="center">
         <template slot-scope="scope">
             <el-tag type="success" v-if="scope.row.status === 1">待审核</el-tag>
             <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
             <el-tag type="success" v-if="scope.row.status === 3">审核不通过</el-tag>
         </template>
       </el-table-column>
       <el-table-column prop="appointDay" label="日期" width="100" header-align="center" align="center"></el-table-column>
       <el-table-column prop="time" label="时间段" width="120" header-align="center" align="center">
         <template slot-scope="scope">
             <el-tag type="success" v-if="scope.row.time === 1">08:00-10:00</el-tag>
             <el-tag type="success" v-if="scope.row.time === 2">10:00-12:00</el-tag>
             <el-tag type="success" v-if="scope.row.time === 3">14:00-16:00</el-tag>
             <el-tag type="success" v-if="scope.row.time === 4">16:00-18:00</el-tag>
         </template>
       </el-table-column>
       <el-table-column prop="createTime" label="创建时间" width="160" header-align="center" align="center"></el-table-column>
       <el-table-column prop="updateTime" label="更新时间" width="160" header-align="center" align="center"></el-table-column>
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
      <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
    <el-radio :label="1">待审核</el-radio>
    <el-radio :label="2">审核通过</el-radio>
    <el-radio :label="3">审核不通过</el-radio>
          </el-radio-group>
          </el-form-item>
<!--      <el-form-item label="日期" prop="appointDay">-->
<!--          <el-date-picker-->
<!--                  class="runPicker"-->
<!--                  v-model="form.appointDay"-->
<!--                  type="date"-->
<!--                  placeholder="请选择日期"-->
<!--                  value-format="yyyy-MM-dd"-->
<!--          >-->
<!--          </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="时间段" prop="time">-->
<!--          <el-radio-group v-model="form.time">-->
<!--    <el-radio :label="1">08:00-10:00</el-radio>-->
<!--    <el-radio :label="2">10:00-12:00</el-radio>-->
<!--    <el-radio :label="3">14:00-16:00</el-radio>-->
<!--    <el-radio :label="4">16:00-18:00</el-radio>-->
<!--          </el-radio-group>-->
<!--          </el-form-item>-->
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

    import {getAppointList,saveAppointInfo,updateAppointInfo,delAppointInfo,delBatchAppointInfo} from '@/api/appoint'
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
          status:null,
          time:null,
          realName:null,
          labName:null,
          location:null,
          imageUrl:null,
        },
        form: {},
        multipleSelection: [],
        tableDataLoading: false,
        total: 0,
        addOrUpdateVisible: false,
        rule: {
         appointDay: [{required: true, message: '日期不得为空', trigger: "blur"}],
         time: [{required: true, message: '时间段不得为空', trigger: "change"}],
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
       * 获取所有预约
       */
      getData(){
        this.query.userId = sessionStorage.getItem('userId')
        getAppointList(this.query).then(res =>{
          this.tableData = res.data.list;
          this.total = res.data.total;
        });


      },

      /**
       * 打开添加框
       */
      addAppointInfo(){
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
      updateAppointInfo(row){
        this.form = JSON.parse(JSON.stringify(row));
        this.addOrUpdateVisible = true;
        },

      /**
       * 按住enter键或者确定按钮提交数据,对后台发请求
       * 如果id为null,就是走添加预约的接口
       * 如果id不为null,就是走更新预约的接口
       */
      formSubmitHandle(){
        this.$refs['form'].validate(valid => {
                if(valid){
          if (this.form.id == null){
        saveAppointInfo(this.form).then(res =>{
            if (res.code === 1){
                this.$message.success('添加成功');
                this.getData();
                this.addOrUpdateVisible = false;
            }
            })
          }else {
        updateAppointInfo(this.form).then(res =>{
              this.$message.success('审核成功');
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
      delAppointInfo(id){
        this.$confirm('确定要删除所选择的吗？', '提示', {
          type: 'warning'
        }).then(action => {
          if (action === 'confirm') {
            delAppointInfo(id).then(res=>{
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
         * 批量删除预约的接口
         */
      delBatchAppointInfo(){
        this.$confirm('确定要删除所选择的吗？', '提示', {
            type: 'warning'
        }).then(action => {
            if (action === 'confirm') {
                delBatchAppointInfo(this.multipleSelection.join(',')).then(res =>{
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
        this.query.status = null;
        this.query.time = null;
             this.query.realName=null
                  this.query.labName=null
             this.query.location=null
             this.query.imageUrl=null
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
