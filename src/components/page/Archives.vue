<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod__Archives">
      <el-form :inline="true" :model="query" @keyup.enter.native="getData()">
  <el-form-item>
    <el-input v-model="query.title" placeholder="档案标题" clearable></el-input>
  </el-form-item>
  <el-form-item>
    <el-select v-model="query.isBanner" placeholder="请选择是否推荐">
                    <el-option key="1" label="不推荐" value="1"></el-option>
                    <el-option key="2" label="推荐" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-select v-model="query.type" placeholder="请选择状态">
                    <el-option key="1" label="文字" value="1"></el-option>
                    <el-option key="2" label="语音" value="2"></el-option>
                    <el-option key="3" label="图像" value="3"></el-option>
      <el-option key="4" label="视频" value="4"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item >
        <el-input v-model="query.sortName" placeholder="分类" clearable></el-input>
    </el-form-item>
            <el-form-item >
        <el-input v-model="query.realName" placeholder="发布人" clearable></el-input>
    </el-form-item>
               <el-form-item>
          <el-button @click="getData()" type="success">查询</el-button>
          <el-button @click="reset()">重置</el-button>
   </el-form-item>
            <el-form-item>
            <el-button type="primary"  @click="addArchivesInfo">添加</el-button>
        </el-form-item>
                <el-form-item v-if="userType === 1">
            <el-button :disabled="this.multipleSelection.length === 0" type="danger"  @click="delBatchArchivesInfo">批量删除</el-button>
        </el-form-item>

  </el-form>
      <el-table v-loading="tableDataLoading" :data="tableData" border @selection-change="selectionChange" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="sortName" label="分类" header-align="center" align="center">
          <template slot-scope="scope">
              <span v-if="scope.row.sortName !=null">{{scope.row.sortName}}</span>
              <span v-else>暂无</span>
          </template>
      </el-table-column>
<!--      <el-table-column prop="realName" label="发布人" header-align="center" align="center">-->
<!--          <template slot-scope="scope">-->
<!--              <span v-if="scope.row.realName !=null">{{scope.row.realName}}</span>-->
<!--              <span v-else>暂无</span>-->
<!--          </template>-->
<!--      </el-table-column>-->

     <el-table-column prop="title" label="档案标题" width="120" header-align="center" align="center">
         <template slot-scope="scope">
         <span v-if="scope.row.title !=null">{{scope.row.title}}</span>
         <span v-else>暂无</span>
         </template>
     </el-table-column>
       <el-table-column prop="isBanner" label="是否推荐"  header-align="center" align="center">
         <template slot-scope="scope">
             <el-tag type="success" v-if="scope.row.isBanner === 1">不推荐</el-tag>
             <el-tag type="success" v-if="scope.row.isBanner === 2">推荐</el-tag>
         </template>
       </el-table-column>
       <el-table-column prop="imageUrl" label="图片"  header-align="center" align="center">
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
       <el-table-column prop="type" label="状态"  header-align="center" align="center">
         <template slot-scope="scope">
             <el-tag type="success" v-if="scope.row.type === 1">文字</el-tag>
             <el-tag type="success" v-if="scope.row.type === 2">语音</el-tag>
             <el-tag type="success" v-if="scope.row.type === 3">图像</el-tag>
           <el-tag type="success" v-if="scope.row.type === 4">视频</el-tag>
         </template>
       </el-table-column>
        <el-table-column prop="documentUrl" label="档案" width="460" header-align="center" align="center">
          <template slot-scope="scope">
            <el-image
                style="width: 60px; height: 60px"
                v-if="scope.row.documentUrl != null && scope.row.type === 3"
                :src="baseUrl + scope.row.documentUrl"
                :preview-src-list="[baseUrl + scope.row.documentUrl]">
            </el-image>
            <AudioPlay :audio-url="baseUrl + scope.row.documentUrl" v-if="scope.row.documentUrl != null && scope.row.type === 2"></AudioPlay>
            <VideoPlay style="height: 100%" :play-url="baseUrl + scope.row.documentUrl" v-if="scope.row.documentUrl != null && scope.row.type === 4"></VideoPlay>
            <span  v-if="scope.row.documentUrl != null && scope.row.type === 1">
              {{scope.row.documentUrl}}
            </span>

            <span v-if="scope.row.documentUrl == null">暂无</span>
          </template>
        </el-table-column>
       <el-table-column prop="createTime" label="创建时间" width="160" header-align="center" align="center"></el-table-column>
       <el-table-column prop="updateTime" label="更新时间" width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" header-align="center" align="center" width="220" >
            <template slot-scope="scope">
                    <el-button type="success"  size="small"  @click="updateArchivesInfo(scope.row)">更新</el-button>
              <el-button type="success"  size="small"  @click="updateArchivesInfo2(scope.row)">下载</el-button>
                    <el-button type="danger"  size="small"  @click="delArchivesInfo(scope.row.id)" v-if="userType === 1">删除</el-button>
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
 <el-dialog  width="80%" :visible.sync="addOrUpdateVisible" :title="!form.id ? '新增' : '编辑'" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="form" :rules="rule" ref="form" label-width="100px">
    <el-form-item label="档案标题" prop="title">
        <el-input v-model="form.title" placeholder="档案标题"></el-input>
    </el-form-item>
    <el-form-item label="档案简介" prop="summary">
        <textarea cols="80" rows="10" v-model="form.summary" placeholder="档案简介"></textarea>
    </el-form-item>
    <el-form-item label="详细内容" prop="content">
        <mavon-editor
                v-model="form.content"
                ref="md"
                @change="contentChangeMarkdown"
                style="min-height: 600px"
                @imgAdd="contentImgAddMarkdown"
        />
    </el-form-item>
      <el-form-item label="是否推荐" prop="isBanner">
          <el-radio-group v-model="form.isBanner">
    <el-radio :label="1">不推荐</el-radio>
    <el-radio :label="2">推荐</el-radio>
          </el-radio-group>
          </el-form-item>
      <el-form-item label="图片" prop="imageUrl">
          <single-upload v-model="form.imageUrl"></single-upload>
      </el-form-item>
      <el-form-item label="状态" prop="type">
          <el-radio-group v-model="form.type">
    <el-radio :label="1">文字</el-radio>
    <el-radio :label="2">语音</el-radio>
    <el-radio :label="3">图像</el-radio>
            <el-radio :label="4">视频</el-radio>
          </el-radio-group>
          </el-form-item>

      <el-form-item label="文字" prop="documentUrl" v-if="form.type === 1">
        <textarea cols="80" rows="10" v-model="form.documentUrl" placeholder="文字"></textarea>
      </el-form-item>
      <el-form-item label="语音" prop="documentUrl" v-else>
        <SingleUploadLocal type="text" title="请上传档案" v-model="form.documentUrl"></SingleUploadLocal>
      </el-form-item>

    <el-form-item label="分类" prop="sortId">
        <el-select v-model="form.sortId"  placeholder="请选择分类">
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.sortName"
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

    import {getArchivesList,saveArchivesInfo,updateArchivesInfo,delArchivesInfo,delBatchArchivesInfo,createArchivesData,} from '@/api/archives'
                                import {getSortList,} from '@/api/sort'

                    import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {getUUID, policy} from "../../api/policy";
import axios from 'axios'
import SingleUpload from '@/components/common/singleUpload';
    import SingleUploadLocal from '@/components/upload/SingleUploadLocal.vue';
    import AudioPlay from '@/components/media/AudioPlay.vue';
    import VideoPlay from '@/components/media/VideoPlay.vue';

    import { saveAs as FileSaver } from 'file-saver'
  export default {
    components: {
      VideoPlay,
      AudioPlay,
      SingleUploadLocal,
    mavonEditor,
    SingleUpload,
    },

    data () {
      return {
        baseUrl:null,
        options:[],
        options2:[],
        tableData: [],
        query: {
          pageNum: 1,
          pageSize: 10,

          title:null,
          sortId:null,
          address:null,
          isBanner:null,
          userId:null,
          type:null,
          placeId:null,
          sortName:null,
          realName:null,
          name:null,
          placeImageUrl:null,
        },
        form: {},
        multipleSelection: [],
        tableDataLoading: false,
        total: 0,
        addOrUpdateVisible: false,
        rule: {
         title: [{required: true, message: '档案标题不得为空', trigger: "blur"}],
         summary: [{required: true, message: '档案简介不得为空', trigger: "blur"}],
         content: [{required: true, message: '详细内容不得为空', trigger: "blur"}],
         address: [{required: true, message: '所在城市不得为空', trigger: "blur"}],
         isBanner: [{required: true, message: '是否推荐不得为空', trigger: "change"}],
         imageUrl: [{required: true, message: '图片不得为空', trigger: "blur"}],
         type: [{required: true, message: '状态不得为空', trigger: "change"}],
        },
        placeIdList:[]
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
       * 获取所有档案
       */
      getData(){
        getArchivesList(this.query).then(res =>{
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.baseUrl = res.baseUrl;
        });
            getSortList({pageSize:100}).then(res =>{
            this.options = res.data.list;
        });

      },
    contentChangeMarkdown(value, render) {
    // render 为 markdown 解析后的结果[html]
    this.form.content = render;
    },

    contentImgAddMarkdown(pos, $file){
    const ossInfo = {};
    policy().then(response => {
        console.log(response)
        ossInfo.policy = response.policy;
        ossInfo.signature = response.signature;
        ossInfo.ossaccessKeyId = response.accessid;
        ossInfo.key = response.dir + '/'+getUUID()+'_${filename}';
        ossInfo.dir = response.dir;
        ossInfo.host = response.host;
        const formData = new FormData();
        formData.append('policy', response.policy);
        formData.append('signature', response.signature);
        formData.append('ossaccessKeyId', response.accessid);
        formData.append('key', response.dir + '/'+getUUID());
        formData.append('dir', response.dir);
        formData.append('host', response.host);
        formData.append('file', $file);
        axios.post('http://gulimall-psw.oss-cn-hangzhou.aliyuncs.com',formData).then(res =>{
            const imageUrl = response.host + '/' + formData.get('key')
            console.log(imageUrl)
            this.$refs.md.$img2Url(pos,imageUrl);
        })

        // resolve(true)
    });
},


      /**
       * 打开添加框
       */
      addArchivesInfo(){
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
      updateArchivesInfo(row){
        this.form = JSON.parse(JSON.stringify(row));
        this.placeIdList = row.placeIdList;
        this.addOrUpdateVisible = true;
        },
      updateArchivesInfo2(detailInfo){
        console.log(url);
        const url = this.baseUrl + detailInfo.documentUrl;
        const oReq = new XMLHttpRequest()
        const URL= url // URL 为下载的URL地址
        oReq.open('GET', URL, true)
        oReq.responseType = 'blob'
        oReq.onload = function() {
          const file = new Blob([oReq.response], {
            type: 'blob'
          })
          FileSaver.saveAs(file,  detailInfo.documentUrl) // fileName为文件名
        }
        oReq.send()
      },

      /**
       * 按住enter键或者确定按钮提交数据,对后台发请求
       * 如果id为null,就是走添加档案的接口
       * 如果id不为null,就是走更新档案的接口
       */
      formSubmitHandle(){
        this.$refs['form'].validate(valid => {
                if(valid){
          if (this.form.id == null){
            this.form.userId = sessionStorage.getItem('userId')
        saveArchivesInfo(this.form).then(res =>{
            if (res.code === 1){
                this.$message.success('添加成功');
                this.getData();
                this.addOrUpdateVisible = false;
            }
            })
          }else {
        updateArchivesInfo(this.form).then(res =>{
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
      delArchivesInfo(id){
        this.$confirm('确定要删除所选择的吗？', '提示', {
          type: 'warning'
        }).then(action => {
          if (action === 'confirm') {
            delArchivesInfo(id).then(res=>{
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
         * 批量删除档案的接口
         */
      delBatchArchivesInfo(){
        this.$confirm('确定要删除所选择的吗？', '提示', {
            type: 'warning'
        }).then(action => {
            if (action === 'confirm') {
                delBatchArchivesInfo(this.multipleSelection.join(',')).then(res =>{
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
        this.query.title = null;
        this.query.sortId = null;
        this.query.address = null;
        this.query.isBanner = null;
        this.query.userId = null;
        this.query.type = null;
        this.query.placeId = null;
             this.query.sortName=null
                  this.query.realName=null
                  this.query.name=null
             this.query.placeImageUrl=null
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


    createArchivesInfo(){
        createArchivesData().then(res =>{
            this.getData();
            this.$message.success('操作成功')
        })
    }

    },


  }
</script>


<style scoped>

                            /* 去除默认样式 */
    textarea {
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: none;
        background-color: transparent;
        font-size: inherit;
        width: 100%;
    }

    textarea:focus {
        outline: none;
    }

    /* 自定义样式 */
    textarea {
        display: inline-block;
        resize: vertical;
        padding: 5px 15px;
        line-height: 1.5;
        box-sizing: border-box;
        color: #606266;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    /* 提示文字 */
    textarea::placeholder {
        color: #c0c4cc;
    }

    /* 鼠标hover */
    textarea:hover {
        border-color: #c0c4cc;
    }

    /* 获得焦点 */
    textarea:focus {
        border-color: #3677f0;
    }

                                                                                        </style>
