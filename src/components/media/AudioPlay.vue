<template>
    <div class="musicPlay">
        <audio
                ref="audio"
                @play="playFunc"
                @pause="pauseFunc"
                @timeupdate="timeupdateFunc"
                @canplay="canplayFunc"
                @error="errorFunc"
                :src="audioUrl"
        >
            <!--测试使用时可放开注释看效果 <source src="https://hhs.huangshan.gov.cn/image-service/downloadImage?bucketId=GSP_PUBLIC&C-App-Id=GSP_APP_002&ObjNm=20210402113715238000010400181487fbe762dd18.mp3 " type="audio/mpeg">  -->
        </audio>
        <div class="audioControl">
            <div class="errorMask" v-show="isError">{{ errorMsg }}</div>
            <p class="audioClose">x</p>
            <p>{{ audioName }}</p>
            <div
                    style="display: flex; align-items: center"
                    @mousedown="isDraging = true"
                    @mouseup="isDraging = false"
            >
                <el-slider
                        v-model="playProcess"
                        class="sliderClass"
                        style="width: 95%"
                        @change="setProcessFunc"
                        :format-tooltip="formatTooltip"
                ></el-slider>
                <div style="color: white; width: 120px; text-align: right">
                    {{ formatCurrentTime }} / {{ formatDuration }}
                </div>
            </div>
            <div class="playControl">
        <span
                class="audioSpan"
                @click="clickFunc('backward')"
                style="width: 10px; height: 20px"
        ><i class="el-icon-d-arrow-left" aria-hidden="true"></i
        ></span>
                <span
                        class="audioSpan"
                        @click="clickFunc('play')"
                        v-show="!isPlaying"
                        style="width: 10px"
                ><i class="el-icon-video-play" aria-hidden="true"></i
                ></span>
                <span
                        class="audioSpan"
                        @click="clickFunc('pause')"
                        v-show="isPlaying"
                        style="width: 10px"
                ><i class="el-icon-video-pause" aria-hidden="true"></i
                ></span>
                <span
                        class="audioSpan"
                        @click="clickFunc('forward')"
                        style="width: 10px"
                ><i class="el-icon-d-arrow-right" aria-hidden="true"></i
                ></span>
                <span
                        class="audioSpan"
                        @click="clickFunc('refresh')"
                        style="width: 10px"
                ><i class="el-icon-refresh" aria-hidden="true"></i
                ></span>
<!--                <span class="audioSpan" style="width: 50px">-->
<!--          <span class="speed">X {{ playSpeed | fmtPlaySpeed() }}</span>-->
<!--        </span>-->
                <span class="audioVolSpan" style="width: 10px"
                ><i class="el-icon-microphone" aria-hidden="true"></i
                ></span>
                <el-slider
                        v-model="playVolume"
                        class="sliderVolumClass"
                        :format-tooltip="formatTooltipVol"
                        @change="setVolumeFunc"
                ></el-slider>
            </div>
        </div>
    </div>
</template>
<script>
    function toStringFunc(param) {
        if (param > 9) {
            return param + "";
        } else {
            return "0" + param;
        }
    }
    export default {
        props:{
            audioUrl:{
                type:String
            },
            audioName:{
                type:String
            }
        },
        data() {
            return {
                musicUrl: "",
                isPlaying: false,
                isError: false,
                playProcess: 0,
                playVolume: 50,
                playSpeed: 1,
                totalTimes: "00:00",
                currentTime: "00:00",
                errorMsg: "音频加载失败，无法播放！",
                isDraging: false,
            };
        },

        filters: {
            fmtPlaySpeed(pSpeed) {
                return pSpeed.toFixed(1);
            },
        },
        computed: {
            formatDuration() {
                if (typeof this.totalTimes == "number") {
                    let fTotal = Math.floor(this.totalTimes);
                    let tempMin = Math.floor(fTotal / 60);
                    let tempSec = fTotal % 60;
                    let min, sec;
                    return `${toStringFunc(tempMin)}:${toStringFunc(tempSec)}`;
                }
                return "00:00";
            },
            formatCurrentTime() {
                if (typeof this.currentTime == "number") {
                    let fTotal = Math.floor(this.currentTime);
                    let tempMin = Math.floor(fTotal / 60);
                    let tempSec = fTotal % 60;
                    let min, sec;
                    return `${toStringFunc(tempMin)}:${toStringFunc(tempSec)}`;
                }
                return "00:00";
            },
        },
        methods: {
            mousedownFunc() {
                this.isDraging = true;
            },
            mouseupFunc() {
                this.isDraging = false;
            },
            formatTooltip(val) {
                // console.log(this.totalTimes,'formatTooltip');
                let currTime = Math.floor((val / 100) * this.totalTimes);
                let tempMin = Math.floor(currTime / 60);
                let tempSec = currTime % 60;
                let min, sec;
                return `${toStringFunc(tempMin)}:${toStringFunc(tempSec)}`;
            },
            formatTooltipVol(vol) {
                return Math.round(((vol * 2) / 100) * 10) / 10;
            },
            clickFunc(val) {
                if (val === "play") {
                    this.isPlaying = !this.isPlaying;
                    this.$refs.audio.play();
                } else if (val === "pause") {
                    this.isPlaying = !this.isPlaying;
                    this.$refs.audio.pause();
                } else if (val === "backward") {
                    //加快音频播放速度，速率范围[0.5，2]
                    if (this.playSpeed > 0.5) {
                        this.playSpeed -= 0.5;
                        this.$refs.audio.playbackRate = this.playSpeed;
                    }
                } else if (val === "forward") {
                    //减慢音频播放速度，速率范围[0.5，2]
                    if (this.playSpeed < 2) {
                        this.playSpeed += 0.5;
                        this.$refs.audio.playbackRate = this.playSpeed;
                    }
                } else if (val === "refresh") {
                    this.$refs.audio.playbackRate = 1;
                    this.playSpeed = 1;
                    this.$refs.audio.load();
                    this.$refs.audio.play();
                }
            },
            setProcessFunc(val) {
                this.$refs.audio.currentTime = Math.round((val / 100) * this.totalTimes);
                console.log(this.totalTimes,8888)
                this.$refs.audio.play();
            },
            setVolumeFunc(vol) {
                //设置播放音量，audio音量范围[0,1]
                this.$refs.audio.volume = Math.round((vol / 100) * 10) / 10;
            },
            playFunc(e) {
                console.log("music is playing");
                this.isPlaying = true;
            },
            pauseFunc(e) {
                console.log("music is paused");
                this.isPlaying = false;
            },
            timeupdateFunc(e) {
                if (!this.isDraging) {
                    this.playProcess = (e.target.currentTime / this.totalTimes) * 100;
                    this.currentTime = e.target.currentTime;
                }
                // console.log('已经播放到'+this.currentTime);
            },
            canplayFunc(e) {
                console.log("music can be played");
                this.isError = false;
                this.$refs.audio.volume = 0.5;
                this.totalTimes = e.target.duration;  // 无
                console.log(e.target.duration,'duration')
            },
            errorFunc(e) {
                console.log("music load error!");
                this.isError = true;
            },
        },
    };
</script>
<style scoped lang="scss">
    ::v-deep .el-slider__runway {
        height: 4px;
        .el-slider__bar {
            height: 4px;
        }
    }
    ::v-deep.el-slider__button-wrapper {
        height: 20px;
        width: 20px;
        top: -10px;
        .el-slider__button {
            width: 12px;
            height: 12px;
        }
    }
    .musicPlay {
        /*margin-top: 20%;*/
        display: flex;
      height: 100%;
        /*width: 700px;*/
        /*justify-content: center;*/
        /*margin-bottom: 400px;*/
        background-image: linear-gradient(to bottom right, rgb(114, 135, 254), rgb(130, 88, 186));

        .sliderClass,
        .audioControl {
            position: relative;
        }

        .audioControl {
            /*position: fixed;*/
            /*left: 15%;*/
            /*bottom: 0%;*/
            width: 700px;
            height: 180px;
          //height: 100%;
            border-radius: 2px;
            padding: 30px;
            background-color: rgba(0, 0, 0, 0.4);
            .errorMask {
                color: #e6a23c;
                text-align: center;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 999;
            }
            .audioClose{
                position: absolute;
                top:-10%;
                right: 3%;
                font-size: 25px;
            }
            p {
                color: white;
                margin: 30px 0;
            }
            .playControl {
                display: flex;
                align-items: center;
                user-select: none;
                margin-top: 30px;

                .audioSpan,
                .audioVolSpan {
                    color: white;
                    font-size: 20px;
                    margin-right: 30px;
                    cursor: pointer;
                    &:hover {
                        color: #409eff;
                    }
                    .audioIcon {
                        font-size: 28px;
                    }
                    .speed {
                        font-size: 16px;
                    }
                    .volume {
                        font-size: 18px;
                    }
                }
                .audioVolSpan {
                    margin-right: 10px;
                    margin-left: 32%;
                }
                .sliderVolumClass {
                    display: inline-block;
                    width: 25%;
                    .el-slider__runway {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
