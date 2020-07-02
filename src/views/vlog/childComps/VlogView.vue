<template>
  <div class="vlog-view">
    <div class="seo-zone">
      <h1>vlog热搜</h1>
    </div>
    <div class="video-wrapper">
      <div class="video-banner">
        <video :muted="isMuted" autoplay loop @click="playOrPause">
          <source src="https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/swimming.mp4" />
        </video>
      </div>
      <div class="video-icon">
        <a href="#light"></a>
        <div class="icon-mute" @click="volumeClick" v-show="isMuted"></div>
        <svg
          class="icon-unmute"
          v-show="!isMuted"
          @click="volumeClick"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 22"
        >
          <path
            d="M10.188 4.65L6 8H5a2 2 0 00-2 2v2a2 2 0 002 2h1l4.188 3.35a.5.5 0 00.812-.39V5.04a.498.498 0 00-.812-.39zM14.446 3.778a1 1 0 00-.862 1.804 6.002 6.002 0 01-.007 10.838 1 1 0 00.86 1.806A8.001 8.001 0 0019 11a8.001 8.001 0 00-4.554-7.222z"
            fill="#fff"
          />
          <path d="M15 11a3.998 3.998 0 00-2-3.465v6.93A3.998 3.998 0 0015 11z" fill="#fff" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMuted: true,
      playing: true
    };
  },
  methods: {
    volumeClick() {
      this.isMuted = !this.isMuted;
    },
    playOrPause() {
      if (this.playing) {
        $("video")[0].pause();
        this.playing = false;
      } else {
        $("video")[0].play();
        this.playing = true;
      }
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>

<style lang="less" scoped>
.vlog-view {
  position: relative;
}

.seo-zone {
  display: none;
}

.video-wrapper {
  position: relative;
}

.vlog-view .video-banner {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.vlog-view .video-banner video {
  width: 100%;
}

.vlog-view .video-wrapper .video-icon {
  position: absolute;
  bottom: 0;
  text-align: center;
  height: 128px;
  width: 100%;
  padding: 72px 0 21px 0;
  z-index: 4;
}

.vlog-view .video-wrapper .video-icon .icon-mute {
  background-image: url(data:image/png;base64,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);
  background-size: 100% 100%;
}

.vlog-view .video-wrapper .video-icon .icon-mute,
.vlog-view .video-wrapper .video-icon .icon-unmute {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 76.5px;
  right: 62px;
  cursor: pointer;
}
</style>