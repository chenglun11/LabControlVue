<template>
    <div>
    <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel"@click="toAppoint()">
                <div class="card-panel-icon-wrapper icon-shopping">
                    <svg-icon icon-class="tree-table" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        等待审核
                    </div>
                    <count-to :start-val="0" :end-val=statusdata :duration="3600" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" >
            <div class="card-panel" @click="torepair()">
                <div class="card-panel-icon-wrapper icon-shopping">
                    <svg-icon icon-class="message" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        等待检修
                    </div>
                    <count-to :start-val="0" :end-val=repairnum :duration="3600" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-shopping">
                    <svg-icon icon-class="user" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        用户总数
                    </div>
                    <count-to :start-val="0" :end-val=usertotal :duration="3600" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-shopping">
                    <svg-icon icon-class="component" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        实验室总数
                    </div>
                    <count-to :start-val="0" :end-val=labtotal :duration="3600" class="card-panel-num" />
                </div>
            </div>
        </el-col>
    </el-row>

        <div class="card" style="padding: 15px">
            您好，{{ username }}！欢迎使用本系统
        </div>

        <div style="display: flex; margin: 10px 0">
            <div style="width: 100%;" class="card">
                <div style="margin-bottom: 30px; font-size: 20px; font-weight: bold">公告列表</div>
                <div>
                    <el-timeline reverse slot="reference">
                        <el-timeline-item v-for="item in list" :key="item.id" :timestamp="item.updateTime">
                            <el-popover
                                placement="right"
                                width="200"
                                trigger="hover"
                                :content="item.content">
                                <span slot="reference">{{ item.title }}</span>
                            </el-popover>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getSelectAll } from '@/api/appoint';

import CountTo from 'vue-count-to'
import { getNoticeList } from '@/api/notice';

export default {
    name: 'Home',
    components: {
        CountTo
    },
    data() {
        return {
            statusdata: null,
            repairnum: null,
            usertotal:null,
            labtotal:null,
            form: {
                id: sessionStorage.getItem('userId')
            },
            list: []
        };
    },
    created() {
        getNoticeList(this.query).then(res => {
            this.list = res.data.list;
            this.total = res.data.total;
        });
        getSelectAll(this.query).then(res => {
            const data = res.data[0];
            this.statusdata = data.STA;
            this.repairnum = data.REP;
            this.usertotal = data.HUM;
            this.labtotal = data.LAB_VALUES;
        });
    },
    computed: {
        username() {
            let username = sessionStorage.getItem('realName');
            return username ? username : this.name;
        }
    },
    methods: {
        toAppoint() {
            this.$router.push({
                path: '/appoint',

            })
        },
        torepair() {
            this.$router.push({
                path: '/repair',

            })
        },
        topeople() {
            this.$router.push({
                path: '/user',
            })
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/manager.css";
.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3
            }
        }

        .icon-people {
            color: #40c9c6;
        }

        .icon-message {
            color: #36a3f7;
        }

        .icon-money {
            color: #f4516c;
        }

        .icon-shopping {
            color: #34bfa3
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}

@media (max-width:550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;

        .svg-icon {
            display: block;
            margin: 14px auto !important;
            float: none !important;
        }
    }
}
</style>