<template>
  <div>
    <ServeModel v-if="list.length > 0" v-for="(item,index) in list" :place="item"></ServeModel>
    <el-empty style="margin: 0 auto" v-if="list.length === 0" description="暂无" />
  </div>
</template>
<script>
import ServeModel from '@/views/model/ServeModel.vue';
import { getRecommendList } from '@/api/recommend';

export default {
  name: 'IndexRecommend',
  components: { ServeModel },
  data(){
    return{
      list:[]
    }
  },
  created(){
    if (sessionStorage.getItem('userId') !=null)
    this.getData();
  },
  methods:{
    getData(){
      getRecommendList({userId:sessionStorage.getItem('userId')}).then(res =>{
        this.list = res.data.data;
      })
    }
  }
};
</script>



<style scoped>

</style>
