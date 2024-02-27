<template>
    <footer class="app_footer">
        <!-- 联系我们 -->
        <div class="contact">
            <div class="container">
                <dl>
                    <dt>客户服务</dt>
                    <dd><a href="https://lchnan.cn" target="_blank"><i class="iconfont icon-kefu" ></i>在线客服</a> </dd>
                    <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
                </dl>
<!--                <dl>-->
<!--                    <dt>关注我们</dt>-->
<!--                    <dd class="qrcode"><img src="../../assets/image/qrcode.jpg" /></dd>-->
<!--                    <dd><a href="https://www.weibo.com/u/5836020250" target="_blank"><i class="iconfont icon-weibo"></i> 微博</a></dd>-->
<!--                </dl>-->
                <dl>
                    <dt>关注我们</dt>
                    <dd class="qrcode"><img src="../../assets/image/qrcode_for_gh_5ee8d5cbaf45_258.jpg" /></dd>
                    <dd><a href="https://www.weibo.com/u/5836020250" target="_blank"><i class="iconfont icon-weibo"></i> 微博</a></dd>
<!--                    <dd class="download">-->
<!--                        <span>打开微信</span>-->
<!--                        <span>立马下载APP</span>-->
<!--                        <a href="javascript:;">下载页面</a>-->

                </dl>
                <dl>
                    <dt>服务热线</dt>
                    <dd class="hotline">(025) 84890123 <small>周一至周日 8:00-18:00</small></dd>
                </dl>
                <dl_img>
                    <img src="../../assets/logo_b.png" alt="" srcset="">
                </dl_img>
            </div>

            <div class="copyright">
                <a href="https://lchnan.cn/zh/privacy.html">隐私保护计划</a>
                <a href="https://status.lchnan.cn">服务状态</a>
                <a href="https://beian.miit.gov.cn" target="_blank">苏ICP备2020053015号-2</a>
            </div>
        </div>
        <!-- 其它 -->
<!--        <div class="extra">-->
<!--            <div class="container">-->
<!--                <div class="slogan">-->
<!--                    <a href="javascript:;">-->
<!--                        <i class="iconfont icon-footer01"></i>-->
<!--                        <span>价格亲民</span>-->
<!--                    </a>-->
<!--                    <a href="javascript:;">-->
<!--                        <i class="iconfont icon-footer02"></i>-->
<!--                        <span>物流快捷</span>-->
<!--                    </a>-->
<!--                    <a href="javascript:;">-->
<!--                        <i class="iconfont icon-footer03"></i>-->
<!--                        <span>品质新鲜</span>-->
<!--                    </a>-->
<!--                </div>-->
<!--                &lt;!&ndash; 版权信息 &ndash;&gt;-->
<!--                <div class="copyright">-->
<!--                    <p>-->
<!--                        <a href="javascript:;">关于我们</a>-->
<!--                        <a href="javascript:;">帮助中心</a>-->
<!--                        <a href="javascript:;">售后服务</a>-->
<!--                        <a href="javascript:;">配送与验收</a>-->
<!--                        <a href="javascript:;">商务合作</a>-->
<!--                        <a href="javascript:;">搜索推荐</a>-->
<!--                        <a href="javascript:;">友情链接</a>-->
<!--                    </p>-->
<!--                    <p>CopyRight © 小兔鲜儿</p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </footer>
</template>

<script>
    export default {
        name:'LayoutFooter'
    }
</script>

<style scoped lang='scss'>
    .app_footer {
        overflow: hidden;
        background-color: #f5f5f5;
        padding-top: 0.3625rem;

        .contact {
            background: #fff;

            .container {
                padding: 0.35rem 0 0.725rem 0.1625rem;
                display: flex;
            }

            dl {
                height: 2.96875rem;
                text-align: center;
                padding: 0 1.1rem;
                border-right: 1px solid #f2f2f2;
                color: #999;

                &:first-child {
                    padding-left: 0;
                }

                &:last-child {
                    border-right: none;
                    padding-right: 0;
                }
            }

            dl_img {
                height: 2.96875rem;
                text-align: center;
                padding-top: 1rem;
                border-right: 1px solid #f2f2f2;
                color: #999;

                &:first-child {
                    padding-left: 0;
                }

                &:last-child {
                    border-right: none;
                    padding-right: 0;
                }
            }

            dt {
                line-height: 1;
                font-size: 18px;
            }

            dd {
                margin: 0.5625rem 0.1875rem 0 0;
                float: left;
                width: 1.4375rem;
                height: 1.4375rem;
                padding-top: 0.15625rem;
                border: 1px solid #ededed;

                .iconfont {
                    font-size: 0.5625rem;
                    display: block;
                    color: #666;
                }

                &:hover {
                    .iconfont {
                        color: #27ba9b;
                    }
                }

                &:last-child {
                    margin-right: 0;
                }
            }

            .qrcode {
                width: 1.4375rem;
                height: 1.4375rem;
                padding: 0.109375rem;
                border: 1px solid #ededed;
            }

            .download {
                padding-top: 0.078125rem;
                font-size: 0.21875rem;
                width: auto;
                height: auto;
                border: none;

                span {
                    display: block;
                }

                a {
                    display: block;
                    line-height: 1;
                    padding: 0.15625rem 0.390625rem;
                    margin-top: 5px;
                    color: #fff;
                    border-radius: 2px;
                    background-color: #27ba9b;
                }
            }

            .hotline {
                padding-top: 0.3125rem;
                font-size: 0.34375rem;
                color: #666;
                width: auto;
                height: auto;
                border: none;

                small {
                    display: block;
                    font-size: 0.234375rem;
                    color: #999;
                }
            }
        }

        .extra {
            background-color: #333;
        }

        .slogan {
            height: 2.78125rem;
            line-height: 0.90625rem;
            padding: 0.9375rem 1.5625rem;
            border-bottom: 1px solid #434343;
            display: flex;
            justify-content: space-between;

            a {
                height: 0.90625rem;
                line-height: 0.90625rem;
                color: #fff;
                font-size: 0.4375rem;

                i {
                    font-size: 0.78125rem;
                    vertical-align: middle;
                    margin-right: 0.15625rem;
                    font-weight: 100;
                }

                span {
                    vertical-align: middle;
                    text-shadow: 0 0 1px #333;
                }
            }
        }

        .copyright {
            height: 2.05625rem;
            padding-top: 0.125rem;
            text-align: center;
            color: #999;
            font-size: 0.234375rem;

            p {
                line-height: 1;
                margin-bottom: 0.3125rem;
            }

            a {
                color: #999;
                line-height: 1;
                padding: 0 0.15625rem;
                border-right: 1px solid #999;

                &:last-child {
                    border-right: none;
                }
            }
        }
    }
</style>
