<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod__period">
        <el-form :inline="true" :model="query" @keyup.enter.native="getData()">
            <el-form-item>
                <el-input v-model="query.realName" placeholder="评论人" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getData()" type="success">查询</el-button>
                <el-button @click="reset()">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="this.multipleSelection.length === 0" type="danger"  @click="delBatchCommentInfo">批量删除</el-button>
            </el-form-item>

        </el-form>
      <el-table v-loading="tableDataLoading" :data="tableData" border @selection-change="selectionChange" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
          <el-table-column prop="realName" label="评论人" header-align="center" align="center"></el-table-column>
       <el-table-column prop="comment" label="评论信息" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="browserName" label="浏览器" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="browserVersion" label="浏览器版本" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="systemName" label="系统" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="systemVersion" label="系统版本" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="ipAddress" label="地址" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="title" label="档案名" width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="imageUrl" label="海报" width="160" header-align="center" align="center">
              <template slot-scope="scope">
                  <el-image
                          style="width: 60px; height: 60px"
                          v-if="scope.row.imageUrl != null"
                          :src="scope.row.imageUrl"
                          :preview-src-list="[scope.row.imageUrl]">
                  </el-image>
                  <span v-else>暂无图片</span>
              </template>
          </el-table-column>
       <el-table-column prop="createTime" width="160" label="发布时间" header-align="center" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
              <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="delCommentInfo(scope.row.id)">删除</el-button>
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

    </div>
  </el-card>
</template>

<script>

    import { delBatchCommentInfo, delCommentInfo, getCommentList } from '@/api/comment';
  export default {

    data () {
      return {
        tableData: [],
        query: {
          pageNum: 1,
          pageSize: 10,
          userId:null,
    realName:null,
                },
        form: {},
        multipleSelection: [],
        tableDataLoading: false,
        total: 0,
        addOrUpdateVisible: false,
        rule: {
         startTime: [{required: true, message: '开始时间不得为空', trigger: "blur"}],
         endTime: [{required: true, message: '结束时间不得为空', trigger: "blur"}],
         createTime: [{required: true, message: '创建时间不得为空', trigger: "blur"}],
        },
    }
   },
    created() {
      this.getData();
    },

    methods:{
      /**
       * 获取所有VIP时常
       */
      getData(){
        this.query.userId = sessionStorage.getItem('userId')
        getCommentList(this.query).then(res =>{
          this.tableData = res.data.list;
          this.total = res.data.total;
        })

      },

        /**
         * 批量删除评论
         */
        delBatchCommentInfo(){
            this.$confirm('确定要删除所选择的吗？', '提示', {
                type: 'warning'
            }).then(action => {
                if (action === 'confirm') {
                    delBatchCommentInfo(this.multipleSelection.join(',')).then(res =>{
                        this.$message.success('批量删除成功');
                        this.getData();
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
       * 重置数据
       */
      reset(){
        this.query.userId = null;
                                          this.query.realName=null
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
        delCommentInfo(id){
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(action => {
                if (action === 'confirm') {
                    delCommentInfo(id).then(res=>{
                        if (res.code === 1){
                            this.$message.success('删除成功');
                            this.getData()
                        }else {
                            return this.$message.error(res.msg)
                        }

                    })
                }
            }).catch(() => {});

        },

      /**
       * 关闭弹窗
       */
      clearAddForm(){
        this.addOrUpdateVisible = false;
      }
    },


  }
</script>
