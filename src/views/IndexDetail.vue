<template>
    <div>
    <div class="detail">
        <div class="place-detail">
            <div class="place-detail-bottom">
                <div class="left">
                    <img :src="detailInfo.imageUrl">
                </div>
                <div class="right">
                <div class="item">
                    <div class="item-left">
                        实验室名
                    </div>
                    <div class="item-right">
                       {{ detailInfo.labName}}
                    </div>
                </div>
                <div class="item">
                    <div class="item-left">
                        分类
                    </div>
                    <div class="item-right">
                       {{ detailInfo.sortName}}
                    </div>
                </div>
                  <div class="item">
                    <div class="item-left">
                      位置
                    </div>
                    <div class="item-right">
                      {{ detailInfo.location}}
                    </div>
                  </div>
                <div class="item">
                    <div class="item-left">
                        创建时间
                    </div>
                    <div class="item-right">
                       {{ detailInfo.createTime}}
                    </div>
                </div>

                    <div class="item" style="margin-top: 20px">
                        <el-button class="appoint" @click="saveAppoint">预约</el-button>
                      <el-button class="appoint" @click="saveRepair">报修</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <el-card class="remark">
        <div class="remark-content">
          <v-md-preview v-highlight  class="content" :text="detailInfo.desc" ref="preview" />
        </div>
      </el-card>
    <el-card class="remark">
        <div class="remark-content">
            <v-md-preview v-highlight  class="content" :text="detailInfo.content" ref="preview" />
        </div>
    </el-card>

      <el-card class="remark">
        <el-table  :data="tableData" border style="width: 100%;">
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

      </el-card>

      <el-dialog  :visible.sync="addOrUpdateVisible" title="预约" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="form" :rules="rule" ref="form" label-width="100px">
          <el-form-item label="日期" prop="appointDay">
            <el-date-picker
                class="runPicker"
                v-model="form.appointDay"
                type="date"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
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
        </el-form>
        <template slot="footer">
          <el-button @click="addOrUpdateVisible = false">取消</el-button>
          <el-button type="primary" @click="formSubmitHandle()">确认</el-button>
        </template>
      </el-dialog>
      <el-dialog  :visible.sync="addOrUpdateVisible2" title="报修" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="form" :rules="rule" ref="form" label-width="100px">
          <el-form-item label="报修信息" prop="remark">
            <el-input v-model="form.remark" placeholder="报修信息"></el-input>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button @click="addOrUpdateVisible2 = false">取消</el-button>
          <el-button type="primary" @click="formSubmitHandle2()">确认</el-button>
        </template>
      </el-dialog>


    </div>
</template>

<script>
    import NewComment from '@/components/operate/NewComment.vue';
    import { getCommentTreeInfo } from '@/api/comment';
    import { getLabList } from '@/api/lab';
    import { saveAppointInfo, updateAppointInfo } from '@/api/appoint';
    import { getRepairList, saveRepairInfo, updateRepairInfo } from '@/api/repair';

    export default {
        name: 'Detail',
      components: { NewComment },

        data(){
            return{
                detailInfo:{},
                list:[],
              tableData:[],
              addOrUpdateVisible:false,
              addOrUpdateVisible2:false,
              commentList:[],
              total:0,
                form:{
                    productId:this.$route.query.id,
            },
              rule: {
                appointDay: [{required: true, message: '日期不得为空', trigger: "blur"}],
                time: [{required: true, message: '时间段不得为空', trigger: "change"}],
              },
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() < Date.now();
                }
              },


            }
        },
        created() {
            this.getData();
            this.getCommentTree();
        },


        methods:{
            getData(){
                getLabList({id:this.$route.query.id,userId:sessionStorage.getItem('userId')}).then(res =>{
                    this.detailInfo = res.data.list[0];
                });

              getRepairList({labId:this.$route.query.id,pageSize:100}).then(res =>{
                this.tableData = res.data.list;
              })
            },

          getCommentTree(){
            getCommentTreeInfo(this.form).then(res =>{
              this.commentList = res.data.list;
              this.total = res.data.total;
            })
          },

          /**
           * 按住enter键或者确定按钮提交数据,对后台发请求
           * 如果id为null,就是走添加预约的接口
           * 如果id不为null,就是走更新预约的接口
           */
          formSubmitHandle(){
            this.$refs['form'].validate(valid => {
              if(valid){
                saveAppointInfo(this.form).then(res =>{
                  if (res.code === 1){
                    this.$message.success('预约成功待审核');
                    this.getData();
                    this.addOrUpdateVisible = false;
                  }
                })
              }
            })
          },



          /**
           * 按住enter键或者确定按钮提交数据,对后台发请求
           * 如果id为null,就是走添加报修的接口
           * 如果id不为null,就是走更新报修的接口
           */
          formSubmitHandle2(){
            this.form.userId = sessionStorage.getItem('userId');
            this.form.labId = this.detailInfo.id;
            saveRepairInfo(this.form).then(res =>{
              if (res.code === 1){
                this.$message.success('报修成功,我们会尽快安排人员修复');
                this.getData();
                this.addOrUpdateVisible2 = false;
              }
            })
          },


          saveAppoint(item){
                if(sessionStorage.getItem('userId') == null){
                    this.$message.warning('请登录');
                    return false;
                }
                this.form = {};
                this.form.userId = sessionStorage.getItem('userId');
                this.form.labId = this.detailInfo.id;

                this.addOrUpdateVisible = true;
            },

          saveRepair(){
            if(sessionStorage.getItem('userId') == null){
              this.$message.warning('请登录');
              return false;
            }
            this.form = {};
            this.addOrUpdateVisible2 = true;

          },
        },




    };
</script>

<style scoped>


    .remark{
        width: 20.3125rem;
      margin: 0.15625rem auto;
        //margin-top: 10px;
    }

    .comment{
      width: 20.3125rem;
      margin: 0.15625rem auto;
    }

    .detail{
        width:20.3125rem;
        /*height: 600px;*/
        margin: 0 auto;
    }
    .detail .place-detail{
        width: 100%;
        height: 100%;
        background-color:white;
        display: inline-flex;
        border-radius: 0.15625rem;
        border: 1px solid #f1f3f4;
        flex-direction: column;
        margin-top: 0.3125rem;
    }
    .detail .place-detail .place-detail-top{
        flex: 1;
        /*background-color: blue;*/
        color: #323233;
        font-size: 0.34375rem;
        padding-left: 0.3125rem;
        line-height: 0.78125rem;
    }
    .detail .place-detail .place-detail-bottom{
        flex: 9;
        /*background-color: #2d8cf0;*/
        display: inline-flex;
    }
    .detail .place-detail .place-detail-bottom .left{
        flex: 1;
        /*background-color: blue;*/
        padding: 0.15625rem;
    }
    .detail .place-detail .place-detail-bottom .left img{
        width: 100%;
        height: 300px;
    }
    .detail .place-detail .place-detail-bottom .right{
        flex: 2;
        /*background-color: greenyellow;*/
        color: #323233;
        font-size:0.21875rem;
    }
    .detail .place-detail .place-detail-bottom .right .item{
        width: 95%;
        height: 0.78125rem;
        /*background-color: red;*/
        margin-top:0.15625rem;
        display: inline-flex;
        border: 2px solid #f1f3f4;
        border-radius: 0.15625rem;
    }
    .detail .place-detail .place-detail-bottom .right .item .item-left{
        flex: 1;
        /*background-color: #2d8cf0;*/
        text-align: center;
        line-height: 0.78125rem;
    }
    .detail .place-detail .place-detail-bottom .right .item .item-right{
        flex: 3;
        text-align: left;
        line-height: 0.78125rem;
    }
    .detail .place-detail .place-detail-bottom .right .item2{
        width: 95%;
        /*height: 150px;*/
        /*background-color: red;*/
        margin-top: 0.15625rem;
        display: inline-flex;
        border: 2px solid #f1f3f4;
        border-radius: 0.15625rem;
        padding: 0.15625rem;
        box-sizing: border-box;
        height: 3.90625rem;
    }
    .detail .place-detail .place-detail-bottom .right .item2 .item-left2{
        flex: 1;
        /*background-color: green;*/
        text-align: center;

    }
    .detail .place-detail .place-detail-bottom .right .item2 .item-right2{
        flex: 3;
        /*background-color: green;*/

        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .detail .place-detail .place-detail-bottom .right .item .appoint{
        width: 100%;
        height: 100%;
        background-color: #00a854;
        color: white;
    }

    .detail .place-remark{
        width: 100%;
        background-color:white;
        display: inline-flex;
        border-radius: 0.15625rem;
        border: 1px solid #f1f3f4;
        flex-direction: column;
        margin-top: 0.3125rem;
        padding:  0.15625rem;
        box-sizing: border-box;
    }
    .collect-like{
        width:100%;
        margin: 0.15625rem auto;
        height:0.78125rem;
        background-color: white;
    }
    .collect-like2{
        width:90%;
        margin: 0.15625rem auto;
        /*height: 50px;*/
        background-color: white;
        padding: 0.0625rem 0.15625rem;
        line-height: 0.46875rem;
    }
    .collect-like .item{
        width: 2.5rem;
        height: 100%;
        margin-left: 0.15625rem;
        /*background-color: red;*/
        display: inline-flex;
        padding: 0.15625rem 0.390625rem;
    }
    .collect-like .item img{
        width: 0.46875rem;
        height:0.46875rem;
        margin-left: 0.15625rem;
        line-height: 0.78125rem;
        cursor: pointer;
    }
    .collect-like .item span{
        color: #323233;
        font-size: 0.21875rem;
        margin-top:0.09375rem;
        margin-left:0.15625rem;
    }

    /deep/.vuepress-markdown-body:not(.custom){
      padding: 0 0;
    }
    /deep/ .vuepress-markdown-body h3 {
      font-size: 0.46875rem;
    }
    /deep/ .vuepress-markdown-body img{
      width: 100%;
      height:7.8125rem;
      text-align: center;
    //margin-left: 200px;
    }
    /deep/ .vuepress-markdown-body p{
      line-height: 0.625rem;
      font-size: 0.234375rem;
    }
</style>
