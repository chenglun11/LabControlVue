<template> 
  <div>
    <el-upload
            action="https://lab-sys.oss-cn-hangzhou.aliyuncs.com"
            :data="dataObj"
            list-type="picture"
            :multiple="false" :show-file-list="showFileList"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
<!--      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>-->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="50%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>


  import { getUUID, policy } from '../../api/policy';

  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',
        },
        dialogVisible: false
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(response => {
            console.log(response)
            _self.dataObj.policy = response.policy;
            _self.dataObj.signature = response.signature;
            _self.dataObj.ossaccessKeyId = response.accessid;
            _self.dataObj.key = response.dir + '/'+getUUID()+'_${filename}';
            _self.dataObj.dir = response.dir;
            _self.dataObj.host = response.host;
            resolve(true)
          }).catch(err => {
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        console.log("上传成功...")
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.key.replace("${filename}",file.name) });
        this.emitInput(this.fileList[0].url);
      }
    }
  }
</script>
<style>

</style>


