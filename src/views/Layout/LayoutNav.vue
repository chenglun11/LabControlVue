<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 多模版渲染 区分登录状态和非登录状态 -->

                <!-- 适配思路: 登录时显示第一块 非登录时显示第二块  是否有token -->
                <template v-if="userInfo">
                    <div><el-avatar shape="circle" style="margin-top: 10px" size="medium" :src="userInfo.imageUrl"></el-avatar></div>
                    <li><a href="javascript:;">
<!--                        <i class=" iconfont icon-user"></i>-->
                        {{userInfo.realName}}</a></li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                  <li><a href="javascript:;" @click="toIndex()">首页</a></li>
                    <li><a href="javascript:;" @click="toMember">个人中心</a></li>
                </template>
                <template v-else>
                  <li><a href="javascript:;" @click="toIndex()">首页</a></li>
                <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { } from '@/utils/validator'



    export default {
        components: {
        },
        computed:{
            userInfo(){
                return this.$store.state.userInfo
            }
        },

        data () {
            return {
                // userInfo:{
                //     realName:'超管'
                // }
            }
        },
        created() {
            // this.getData();
        },
        methods:{
            confirm() {
                this.$store.commit('saveUserInfo',null);
                sessionStorage.clear();
                this.$router.push('/index')
            },
            toMember(){
                this.$router.push('/member')
            },
            toPlace(){
                this.$router.push('/index-place')
            },
            toActivity(){
                this.$router.push('/index-activity')
            },
          toIndex(){
            this.$router.push('/index')
          },

        },


    }
</script>
<style scoped lang="scss">
    .app-topnav {
        background: #333;
        /*background-color: green;*/
        /*color: white;*/
        ul {
            display: flex;
            height: 53px;
            justify-content: flex-end;
            align-items: center;

            li {
                a {
                    padding: 0 15px;
                    color: #cdcdcd;
                    line-height: 1;
                    display: inline-block;

                    i {
                        font-size: 19px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: #27ba9b;
                    }
                }

                ~li {
                    a {
                        border-left: 2px solid #666;
                    }
                }
            }
        }
    }
</style>
