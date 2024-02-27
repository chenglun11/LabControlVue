<template>
    <div class="comment-main">
        <div class="comment-item">
            <div class="box">
                <div class="avatar">
                    <img v-if="$store.state.userInfo != null" :src="$store.state.userInfo.imageUrl" alt="">
                    <img v-else src="http://img.shiyit.com/touristAvatar.png" alt="">
                </div>
                <div class="ml-3">
                    <div data-v-0089e256="" class="comment-input">
                        <textarea placeholder="留下点什么吧..." v-model="comment" class="comment-textarea"></textarea>
                    </div>
                    <div class="comment-btn">
                        <el-button @click="addComment" style="" class="upload-btn v-comment-btn">
                            提交
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <ul class="commentwrap">
            <div class="comment-wrp">
                <li class="ul-item" ref="commentBoxref" v-for="(item, index) in commentList" :key="index">
                    <!-- 评论内容 -->
                    <div class="comment" @mouseenter="replyEnter(item.id, false)" @mouseleave="replyLeave(item.id)">
                        <div class="main">
                            <div class="profile">
                                <a>
                                    <img :src="item.imageUrl" alt="">
                                </a>
                            </div>
                            <div class="commentinfo">
                                <section class="commeta">
                                    <div class="left">
                                        <h4 class="author">
                                            <a target="_blank" class="disabled">
                                                {{ item.realName }}
                                            </a>
                                        </h4>
                                    </div>
                                    <a href="javascript:;" :ref="'replyBtn' + item.id"
                                       @click="replyComment(item, item.id, false)" class="comment-reply-link">回复</a>
                                    <div class="right">
                                        <div class="info">
                                            <time itemprop="datePublished" datetime="1680523318635" class="comment-time">发布于
                                                {{ item.createTime }}
                                            </time>
                                            <span class="useragent-info">（
                                                <svg-icon :icon-class="item.browserName" />
                                                {{ item.browserVersion }} &nbsp;
                                                <svg-icon :icon-class="item.systemName" />
                                                {{ item.systemVersion }}
                                                ）
                                            </span>
                                            <span class="ipAddress">
                                                IP属地:{{ splitIpAddress(item.ipAddress) }}
                                                <!--                                                IP属地:{{ item.address }}-->
                                            </span>
                                        </div>
                                    </div>
                                </section>
                                <div class="body markdown-body">
                                    <div class="markdown-content">
                                        <p>
                                            {{ item.comment }}
                                        </p>
                                    </div>
                                </div>
                                <!-- 回复框 -->
                                <Reply :ref="'reply' + item.id" @reloadReply="reloadReply">
                                </Reply>
                            </div>
                        </div>
                    </div>
                    <ul class="children">
                        <div class="comment-wrp">
                            <li class="ul-item" v-for="(childrenItem, childerenIndex) in item.reply"
                                :key="childerenIndex">
                                <!-- 评论内容 -->
                                <div class="comment" @mouseenter="replyEnter(childrenItem.id, true)"
                                     @mouseleave="replyLeave(childrenItem.id, true, index)">
                                    <div class="main">
                                        <div class="profile">
                                            <a>
                                                <img :src="childrenItem.imageUrl" alt="">
                                            </a>
                                        </div>
                                        <div class="commentinfo">
                                            <section class="commeta">
                                                <div class="left">
                                                    <h4 class="author">
                                                        <a target="_blank" class="disabled">
                                                            {{ childrenItem.realName }}

                                                            <!--                                                            <el-tooltip effect="dark" content="作者标签" placement="top"-->
                                                            <!--                                                                v-if="childrenItem.userId == articleUserId && childrenItem.userId != 1">-->
                                                            <!--                                                                <svg-icon class="tag" icon-class="bozhu"></svg-icon>-->
                                                            <!--                                                            </el-tooltip>-->
                                                            <!--                                                            <el-tooltip effect="dark" content="官方标签" placement="top"-->
                                                            <!--                                                                v-if="childrenItem.userId == 1">-->
                                                            <!--                                                                <svg-icon class="tag" icon-class="guanfang"></svg-icon>-->
                                                            <!--                                                            </el-tooltip>-->
                                                        </a>
                                                    </h4>
                                                </div>
                                                <a href="javascript:;" :ref="'childrenBtn' + childrenItem.id"
                                                   @click="replyComment(childrenItem, item.id, true)"
                                                   class="comment-reply-link">回复</a>
                                                <div class="right">
                                                    <div class="info">
                                                        <time itemprop="datePublished" datetime="1680523318635"
                                                              class="comment-time">发布于
                                                            {{ childrenItem.createTime }}
                                                        </time>
                                                        <span class="useragent-info">（
                                                            <svg-icon :icon-class="childrenItem.browserName" />
                                                            {{ childrenItem.browserVersion }} &nbsp;
                                                            <svg-icon :icon-class="childrenItem.systemName" />
                                                            {{ childrenItem.systemVersion }}
                                                            ）
                                                        </span>
                                                        <span class="ipAddress">
                                                            IP属地:{{ splitIpAddress(childrenItem.ipAddress) }}
                                                        </span>
                                                    </div>

                                                </div>
                                            </section>
                                            <div class="body markdown-body">
                                                <div class="markdown-content">
                                                    <p>
                                                        <a href="javascript:;"
                                                           style="color: #99CE00;text-decoration: none;">@{{
                                                            childrenItem.replyRealName }}</a>

                                                        {{ childrenItem.comment }}
                                                    </p>
                                                </div>
                                            </div>
                                            <!-- 回复框 -->
                                            <Reply :ref="'replys' + childrenItem.id" @reloadReply="reloadReply">
                                            </Reply>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </li>
                <div class="more-btn" v-if="commentList.length < total" @click="moreComment">加载更多...</div>
            </div>
        </ul>
    </div>
</template>
<script>
import Reply from './Reply.vue'
import { getCommentTreeInfo, saveCommentInfo } from '../../api/comment';
export default {
    name:'NewComment',
    components: {
        Reply,
    },
    props: {
        commentList: {
            type: Array,
            default: () => [],
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            query:{
                pageNum:1,
                pageSize:5,
                archivesId:this.$route.query.id,
            },
            comment: "",
            opacity: 0,
            pageNo: 1,
            show: null,
            // 加载层信息
            loading: [],
            form:{}
        }
    },
    methods: {

        reloadReply(index) {
            this.openLoading();
            getCommentTreeInfo(this.query).then(res =>{
                this.commentList = res.data.list;
                this.loading.close()
            })
        },
        addComment() {
            if (this.$store.state.userInfo == null) {
                return this.$message.error('请登录');
            }
            if (!this.comment) {
                this.$message.error('评论不能为空');
                return;
            }
            let browser = this.browserMatch();
            let comment = {
                archivesId: this.$route.query.id,
                comment: this.comment,
                browserName: browser.browser.toLowerCase(),
                browserVersion: browser.browser + " " + browser.version,
                pid:0,
                userId:this.$store.state.userInfo.id,
            };
            saveCommentInfo(comment).then(res => {
                if (res.code === 1){
                    this.$message.success('评论成功');
                    this.comment = '';
                    this.$emit("reloadComment", null)
                    // utilMethod.$emit('getCommentInfo',null);
                }
            }).catch(err => {
            })

        },
        moreComment() {
            this.openLoading();
            this.query.pageNum++;
            getCommentTreeInfo(this.query).then(res => {
                res.data.list.forEach(item => {
                    this.commentList.push(item);
                });
                this.loading.close()
            })
        },

        //截取地址
        splitIpAddress(address) {
            if (address === '未知'){
                return address;
            }else {
                if (address.indexOf("|") !== -1){
                    return address.split("|")[1]
                }else {
                    return address
                }
            }

        },

        replyLeave(index, isChilderen) {
            if (isChilderen) {
                this.$refs[`childrenBtn${index}`][0].style.opacity = 0
            } else {
                this.$refs[`replyBtn${index}`][0].style.opacity = 0

            }
        },
        replyEnter(index, isChilderen) {
            if (isChilderen) {
                this.$refs[`childrenBtn${index}`][0].style.opacity = 1
            } else {
                this.$refs[`replyBtn${index}`][0].style.opacity = 1

            }
        },
        replyComment(item, parentId, isChilderen) {
            // if (this.user == null) {
            //     this.$store.state.loginFlag = true;
            //     return
            // }
            if (isChilderen) {
                this.$refs['replys' + item.id][0].showBox = !this.$refs['replys' + item.id][0].showBox
                //传值给回复框
                this.$refs['replys' + item.id][0].comment = "";
                this.$refs['replys' + item.id][0].comment = "";
                this.$refs['replys' + item.id][0].pid = item.id;
                this.$refs['replys' + item.id][0].realName = item.realName;
                this.$refs['replys' + item.id][0].archivesId = item.archivesId;
                this.$refs['replys' + item.id][0].replyUserId = item.userId;
            } else {
                this.$refs['reply' + item.id][0].showBox = !this.$refs['reply' + item.id][0].showBox
                //传值给回复框
                this.$refs['reply' + item.id][0].comment = "";
                this.$refs['reply' + item.id][0].pid = item.id;
                this.$refs['reply' + item.id][0].realName = item.realName;
                this.$refs['reply' + item.id][0].archivesId = item.archivesId;
                this.$refs['reply' + item.id][0].replyUserId = item.userId;
                // this.$refs['reply' + item.id][0].parentId = parentId;
                // this.$refs['reply' + item.id][0].index = item.id;
            }
        },
        // 打开加载层
        openLoading: function () {
            this.loading = this.$loading({
                lock: true,
                text: "正在加载中~",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
                fullscreen: false
            });
        },
        browserMatch() {
            let userAgent = navigator.userAgent;
            let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
            let rEdge = /(edg)\/([\w.]+)/;
            let rFirefox = /(firefox)\/([\w.]+)/;
            let rOpera = /(opera).+version\/([\w.]+)/;
            let rChrome = /(chrome)\/([\w.]+)/;
            let rSafari = /version\/([\w.]+).*(safari)/;
            let ua = userAgent.toLowerCase();
            const match = rMsie.exec(ua);
            if (match !== null) {
                return {
                    browser: "IE",
                    version: match[2] || "0"
                };
            }
            const rEmatch = rEdge.exec(ua);
            if (rEmatch !== null) {
                return {
                    browser: 'Edge',
                    version: rEmatch[2] || "0"
                };
            }
            const rFmatch = rFirefox.exec(ua);
            if (rFmatch !== null) {
                return {
                    browser: rFmatch[1] || "",
                    version: rFmatch[2] || "0"
                };
            }
            const rOmatch = rOpera.exec(ua);
            if (rOmatch !== null) {
                return {
                    browser: rOmatch[1] || "",
                    version: rOmatch[2] || "0"
                };
            }
            const rCmatch = rChrome.exec(ua);
            if (rCmatch !== null) {
                return {
                    browser: rCmatch[1] || "",
                    version: rCmatch[2] || "0"
                };
            }
            let rSmatch = rSafari.exec(ua);
            if (rSmatch !== null) {
                return {
                    browser: rSmatch[2] || "",
                    version: rSmatch[1] || "0"
                };
            }
            if (match !== null) {
                return {
                    browser: "",
                    version: "0"
                };
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.comment-main {
    .comment-item {
        border: 1px solid rgba(144, 147, 153, .31);
        border-radius: 4px;
        padding: 10px;
        margin: 10px 0 10px;
        background-color: var(--comment-backgroud-color);

        .box {
            display: flex;

            .avatar {
                line-height: normal;
                position: relative;
                vertical-align: middle;

                img {
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    border-radius: 50%;
                }
            }

            .ml-3 {
                margin-left: 12px !important;
                width: 100%;
                position: relative;

                .comment-input {
                    position: relative;

                    .comment-textarea {
                        font-size: 15px;
                        color: var(--article-content-color) !important;
                        outline: none;
                        padding: 10px 5px;
                        min-height: 122px;
                        resize: none;
                        width: 100%;
                        border-radius: 4px;
                        background-color: transparent;
                        border-style: none;

                    }
                }

                .comment-btn {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;

                    .emoji-btn {
                        cursor: pointer;

                        svg {
                            width: 20px;
                            height: 20px;
                        }
                    }

                    .v-comment-btn {
                        border: 1px solid var(--border-line);
                        border-radius: 4px;
                        text-align: center;
                        padding: 10px 16px;
                        font-size: 14px;
                        transition: all .3s;
                        outline: none;
                        cursor: pointer;
                    }

                    @media screen and (max-width: 767px) {
                        .upload-btn {

                            margin-left: auto;
                            color: #fff;
                            background-color: #27ba9b;
                            position: relative;
                        }
                    }

                    @media screen and (min-width: 768px) {
                        .upload-btn {

                            margin-left: auto;
                            color: #fff;
                            background-color: #27ba9b;
                            overflow: hidden;
                            transition: all .5s;
                            position: relative;

                            &:hover {
                                background-color: #00C853;
                            }

                            &:hover::before {
                                left: 120%;
                                transition: all .5s;
                            }

                            &::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: -40%;
                                width: 20%;
                                height: 100%;
                                background: linear-gradient(90deg, transparent, #fff, transparent);
                                transform: skew(-45deg);
                            }
                        }
                    }

                }

                .emoji-wrapper {
                    position: absolute;
                    top: 5px;
                }
            }
        }
    }

    .commentwrap {
        width: 100%;
        padding: 0;
        list-style: none;


        .comment-wrp {
            padding: 10px 0 16px 0;

            .more-btn {
                background-color: #27ba9b;
                border-radius: 5px;
                text-align: center;
                line-height: 30px;
                padding: 3px 0;
                height: 30px;
                width: 100px;
                margin: auto;
                cursor: pointer;
                color: #fff;
            }

            .ul-item {
                clear: both;
                margin: 0;
                padding: 0;
                overflow: hidden;
                list-style: none;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--border-line);

                &:last-child {
                    border: 0;
                    padding-bottom: 0;
                }

                .comment {
                    width: 100%;
                    padding-top: 10px;
                    float: left;

                    .main {
                        float: right;
                        width: 100%;
                        padding: 0;

                        &:last-child {
                            border-bottom: 0;
                        }

                        .profile {
                            float: left;
                            margin-right: 10px;
                            margin-top: 6px;

                            a {
                                text-decoration: none;
                                color: #27ba9b;

                                img {
                                    width: 100%;
                                    max-width: 40px;
                                    height: 40px;
                                    border-radius: 100%;
                                    box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.5);
                                    background-color: #f5f5f5;
                                    transition: transform .75s;

                                    &:hover {
                                        transform: rotate(360deg);
                                    }
                                }

                            }
                        }

                        .commentinfo {
                            .commeta {
                                font-size: 16px;
                                margin-bottom: 5px;
                                text-transform: uppercase;
                                color: #9499a8;
                                margin-left: 50px;

                                section {
                                    display: block;
                                }

                                .left {
                                    .author {
                                        font-size: 24px;
                                        font-weight: 400;
                                        margin: 0;
                                        letter-spacing: 0px;
                                        text-transform: none;
                                        line-height: 20px;

                                        a {
                                            text-decoration: none;
                                            color: #27ba9b;
                                            font-size: 14px;
                                            font-weight: 600;

                                            .tag {
                                                width: 18px;
                                                height: 18px;
                                                vertical-align: -4px;
                                            }
                                        }
                                    }

                                }

                                .comment-reply-link {
                                    text-decoration: none;
                                    font-size: 12px;
                                    margin-left: 10px;
                                    float: right;
                                    text-transform: uppercase;
                                    color: #fff;
                                    background-color: #27ba9b;
                                    line-height: 20px;
                                    padding: 0 6px;
                                    border-radius: 3px;
                                    opacity: 0;
                                }

                                .right {
                                    .info {
                                        margin-top: 2px;
                                        font-size: 12px;
                                        letter-spacing: 0px;
                                        text-transform: none;
                                        color: rgba(0, 0, 0, 0.35);

                                        .comment-time {
                                            display: inline-block;
                                            margin-top: 6px;
                                            font-size: 12px;
                                            color: #657786;
                                        }

                                        .useragent-info {
                                            color: #657786;

                                            svg {
                                                vertical-align: -2px;
                                                width: 13px;
                                                height: 13px;
                                            }

                                        }

                                        .ipAddress {
                                            color: #657786;
                                        }
                                    }
                                }
                            }

                            .body {
                                color: #63686d;
                                position: relative;
                                margin-bottom: 15px;
                                line-height: 1;
                                /*white-space: pre-line;*/
                                word-break: break-all;
                                font-size: 14px !important;
                                word-wrap: break-word;

                                .markdown-content {
                                    padding: 10px;
                                    /*white-space: pre-line;*/
                                    /*word-break: break-all;*/
                                    background: #f5f5f5;
                                    line-height:20px;
                                    border-radius: 0 8px 8px;
                                }
                            }
                        }


                    }

                    .showd {
                        padding-left: 40px;
                    }
                }

                .children {
                    padding: 0;
                    list-style: none;
                    margin-left: 40px;

                    .comment-wrp {
                        padding: 10px 0 16px 0;

                        li {
                            clear: both;
                            margin: 0;
                            padding: 0;
                            overflow: hidden;
                            list-style: none;
                            margin-bottom: 20px;
                            border-bottom: 1px solid var(--border-line);

                            &:last-child {
                                border: 0;
                                margin-bottom: 0;
                            }

                            .comment {
                                width: 100%;
                                padding-top: 10px;
                                float: left;

                                .main {
                                    float: right;
                                    width: 100%;
                                    padding: 0;

                                    &:last-child {
                                        border-bottom: 0;
                                    }

                                    .profile {
                                        float: left;
                                        margin-right: 10px;
                                        margin-top: 6px;

                                        a {
                                            text-decoration: none;

                                            img {
                                                width: 100%;
                                                max-width: 40px;
                                                height: 40px;
                                                border-radius: 100%;
                                                box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.5);
                                                background-color: #f5f5f5;
                                                transition: transform .75s;

                                                &:hover {
                                                    transform: rotate(360deg);
                                                }
                                            }

                                        }
                                    }

                                    .commentinfo {
                                        .commeta {
                                            font-size: 16px;
                                            margin-bottom: 5px;
                                            text-transform: uppercase;
                                            color: #9499a8;
                                            margin-left: 50px;

                                            section {
                                                display: block;
                                            }

                                            .left {
                                                .author {
                                                    font-size: 24px;
                                                    font-weight: 400;
                                                    margin: 0;
                                                    letter-spacing: 0px;
                                                    text-transform: none;
                                                    line-height: 20px;

                                                    a {
                                                        text-decoration: none;
                                                        color: #27ba9b;
                                                        font-size: 14px;
                                                        font-weight: 600;

                                                        .bozhu {
                                                            position: relative;
                                                            top: -1px;
                                                            display: inline-block;
                                                            min-width: 30px;
                                                            text-align: center;
                                                            font-size: 12px;
                                                            color: #fb7299;
                                                            font-weight: 400;
                                                            -webkit-transform: scale(0.9);
                                                            transform: scale(0.9);
                                                            border: 1px solid #fb7299;
                                                            border-radius: 4px;
                                                        }
                                                    }

                                                    .tag {
                                                        width: 18px;
                                                        height: 18px;
                                                        vertical-align: -5px;
                                                    }
                                                }

                                            }

                                            .comment-reply-link {
                                                text-decoration: none;
                                                font-size: 12px;
                                                display: block;
                                                margin-left: 10px;
                                                float: right;
                                                text-transform: uppercase;
                                                color: #fff;
                                                background-color: #27ba9b;
                                                line-height: 20px;
                                                padding: 0 6px;
                                                border-radius: 3px;
                                            }

                                            .right {
                                                .info {
                                                    margin-top: 2px;
                                                    font-size: 12px;
                                                    letter-spacing: 0px;
                                                    text-transform: none;
                                                    color: rgba(0, 0, 0, 0.35);

                                                    .comment-time {
                                                        display: inline-block;
                                                        margin-top: 6px;
                                                        font-size: 12px;
                                                        color: #657786;
                                                    }

                                                    .useragent-info {
                                                        color: #657786;

                                                        svg {
                                                            vertical-align: -2px;
                                                            width: 13px;
                                                            height: 13px;
                                                        }

                                                    }

                                                    .ipAddress {
                                                        color: #657786;
                                                    }
                                                }
                                            }
                                        }

                                        .body {
                                            color: #63686d;
                                            position: relative;
                                            margin-bottom: 15px;
                                            line-height: 1;
                                            /*white-space: pre-line;*/
                                            word-break: break-all;
                                            font-size: 14px !important;
                                            word-wrap: break-word;

                                            .markdown-content {
                                                padding: 10px;
                                                /*white-space: pre-line;*/
                                                word-break: break-all;
                                                background: #f5f5f5;
                                                border-radius: 0 8px 8px;
                                            }
                                        }
                                    }

                                }

                                .showd {
                                    padding-left: 40px;
                                }
                            }
                        }
                    }
                }
            }

        }

    }

}
</style>
