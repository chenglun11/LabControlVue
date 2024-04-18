<template>
    <div>
        <NoticeModel v-if="list.length > 0" :indexNumber="index" v-for="(item,index) in list" @reloadModel="getData"
                     :model="item" :key="index"></NoticeModel>

        <el-empty style="margin: 0 auto" v-if="list.length === 0" description="暂无" />
        <el-pagination
            :current-page="query.pageNum"
            :page-sizes="[5, 20, 50, 100]"
            :page-size="query.pageSize"
            :total="ntotal"
            style="margin-top: 10px"
            layout="total, prev, pager, next"
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange">
        </el-pagination>
    </div>
</template>
<script>
import { getNoticeList } from '@/api/notice';
import ServeModel from '@/views/model/ServeModel.vue';
import NoticeModel from '@/views/model/NoticeModel.vue';
import { Model } from 'echarts/lib/export';

export default {
    name: 'IndexNotice',
    components: { Model, NoticeModel, ServeModel },
    created() {
        this.getData();
    },
    data() {
        return {
            list: [],
            query: {
                pageNum: 1,
                pageSize: 5,

                authorName: null,
                createPlace: null
            },
            ntotal: 0,
            currentKey: 0,
            baseUrl: null
        };
    },
    methods: {
        getData() {
            getNoticeList(this.query).then(res => {
                this.list = res.data.list;
                this.ntotal = res.data.total;
            });
        },

        /*
        * 分页(改变页码)
        * @param val
        */
        pageCurrentChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getData();
        },
        reset() {
            this.query.pageNum = 1;
            this.query.labName = null;
            this.query.createPlace = null;
            this.query.authorName = null;
            this.query.sortName = null;
            this.getData();
        },

        /**
         * 分页(改变每页条数)
         * @param val
         */
        pageSizeChange(val) {
            this.$set(this.query, 'pageSize', val);
            this.getData();
        }
    }
};
</script>
