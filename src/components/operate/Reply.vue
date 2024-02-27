<template>
    <div class="comment-main" v-show="showBox" ref="reply">
        <div class="comment-item">
            <div class="box">
                <div class="avatar">
                    <img style="width: 40px;height: 40px" v-if="$store.state.userInfo != null" :src="$store.state.userInfo.imageUrl" alt="">
                    <img v-else src="http://img.shiyit.com/touristAvatar.png" alt="">
                </div>
                <div class="ml-3">
                    <div data-v-0089e256="" class="comment-input">
                        <textarea placeholder="留下点什么吧..." v-model="comment" class="comment-textarea"></textarea>
                    </div>
                    <div class="comment-btn">
                        <div style="margin-left: auto;">
                            <el-button type="info" @click="handleCancle" class="cancle-btn v-comment-btn">
                                取消
                            </el-button>
                            <el-button @click="addComment" class="upload-btn v-comment-btn">
                                提交
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { saveCommentInfo } from '../../api/comment';
export default {
    data() {
        return {
            chooseEmoji: false,
            userId: null,
            realName: null,
            pid: null,
            index: null,
            comment: "",
            replyUserId: null,
            showBox: false,
        }
    },

    methods: {

        handleCancle() {
            this.showBox = false
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
                archivesId: this.archivesId,
                comment: this.comment,
                pid: this.pid,
                browserName: browser.browser.toLowerCase(),
                browserVersion: browser.browser + " " + browser.version,
                userId:this.$store.state.userInfo.id,
                replyUserId:this.replyUserId,
            };
            saveCommentInfo(comment).then(res => {
                //调用父组件的方法
                this.$emit("reloadReply", this.index);
                this.$message({
                    message: '评论成功',
                    type: 'success'
                });
                this.comment = "";
                this.showBox = false
            })
        },
        browserMatch(){
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
    width: 100%;

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
                    width: 40px;
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

                    .emoji-btn-active {
                        .iconfont {
                            color: #9fceff;
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

                    .cancle-btn {
                        margin-right: 1rem;
                        position: relative;
                    }


                    @media screen and (max-width: 767px) {
                        .upload-btn {

                            margin-left: auto;
                            color: #fff;
                            background-color: #9fceff;
                            position: relative;
                        }
                    }

                    @media screen and (min-width: 768px) {
                        .upload-btn {

                            margin-left: auto;
                            color: #fff;
                            background-color: #9fceff;
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
}
</style>
