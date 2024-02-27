<template>
    <div class="index">
      <Banner></Banner>
      <LineInfo title="实验室信息" sub-title="Lab Info"></LineInfo>
        <IndexServe></IndexServe>
        <br>
        <line-info title="公告" sub-title="Notice"></line-info>
        <index-notice></index-notice>
        <br>
    </div>
</template>

<script>

    import Banner from '@/views/model/Banner.vue';
    import IndexServe from '@/views/IndexServe.vue';
    import ServeModel from '@/views/model/ServeModel.vue';
    import IndexRecommend from '@/views/IndexRecommend.vue';
    import LineInfo from '@/views/model/Line.vue';
    import IndexNotice from '@/views/IndexNotice.vue';
    import Line from '@/views/model/Line.vue';

    export default {
        name: 'Index',
      components: { Line, LineInfo, IndexRecommend, ServeModel, IndexServe,IndexNotice, Banner },
      created(){
        console.log('宽度'+document.body.clientWidth);
      }
    };
</script>

<style scoped lang="scss">
    .index{
      width: 20.3125rem;
      margin: 0 auto;

    }
    line{

    }
</style>
