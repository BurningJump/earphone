<template>
  <div id="snake-game" :style="{height:screenHeight + 'px'}">
    <div class="head-btn" :style="{width:width + 'px'}">
      <el-button type="primary" size="small" v-show="!mute" @click="switchVolumn"><icon name="volume-up"></icon>声音</el-button>
      <el-button type="primary" size="small" v-show="mute" @click="switchVolumn"><icon name="volume-off"></icon>声音</el-button>
      <!-- <el-button type="primary" size="small" @click="changeTheme"><i class="icon theme"></i>换肤<el-color-picker v-model="themeColor" size="small" @active-change="changeTheme"></el-color-picker></el-button> -->
      <el-button type="primary" size="small" @click="switchLight"><i class="icon bulb"></i>关灯</el-button>
    </div>
    <div class="time-line" :style="{width:width + 'px'}">
      <span id="score" :style="{width:width * 0.2 + 'px'}">积分：{{score}}</span>
    </div>
    <canvas id="snake-canvas" :width="width" :height="height"></canvas>
    <div class="control-btn" :style="{width:width + 'px'}">
      <el-button type="primary" size="small" v-show="!paused" @click="pause"><i class="icon pause"></i>暂停</el-button>
      <el-button type="primary" size="small" v-show="paused" @click="pause"><i class="icon play"></i>开始</el-button>
    </div>
    <div class="foot-btn" :style="{width:width + 'px'}">
      <el-button type="danger" size="small" icon="el-icon-refresh" @click="drawBoard">重玩</el-button>
      <el-button type="primary" size="small" icon="el-icon-zoom-in">放大</el-button>
      <el-button type="primary" size="small" icon="el-icon-zoom-out">缩小</el-button>
      <el-button type="primary" size="small" @click="fullScreen"><i class="icon full-screen"></i>全屏</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cell: 50,
      size: 'small',
      screenWidth: 0,
      screenHeight: 0,
      score: 0,
      dark: false,
      mute: false,
      themeColor: '#ffffff',
      paused: false,
      snake: [],
      food: []
    }
  },
  computed: {
    width() {
      return this.cell * 10
    },
    height() {
      return this.cell * 10
    }
  },
  mounted() {
    this.screenWidth = window.screen.width
    this.screenHeight = window.screen.height
    if (this.screenWidth === 1366) {
      this.size = 'medium'
      this.cell = 50
    } else if (this.screenWidth >= 1920) {
      this.size = 'large'
      this.cell = 60
    } else {
      this.size = 'small'
      this.cell = 40
    }
    this.$nextTick(function() {
      this.drawBoard()
    })
  },
  methods: {
    switchVolumn() {
      this.mute = !this.mute
    },
    switchLight() {
      const app = document.getElementById('app')
      if (this.dark) {
        app.style.backgroundColor = 'white'
        app.style.color = 'black'
      } else {
        app.style.backgroundColor = 'black'
        app.style.color = 'white'
      }
      this.dark = !this.dark
    },
    changeTheme() {
      // alert('暂未实现该功能！')
      const app = document.getElementById('app')
      app.style.backgroundColor = this.themeColor
    },
    pause() {
      if (this.paused) {
        // play
      } else {
        // pause
      }
      this.paused = !this.paused
    },
    fullScreen() {
      const docElm = document.documentElement
      if (docElm.requestFullscreen) {
        // W3C
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        // FireFox
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        // Chrome等
        docElm.webkitRequestFullScreen()
      } else if (docElm.msRequestFullscreen) {
        // IE11
        docElm.msRequestFullscreen()
      }

      // 退出全屏：
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    drawBoard() {
      const self = this
      const canvas = document.getElementById('snake-canvas')
      const context = canvas.getContext('2d')
      context.save()

      // canvas区域
      context.fillStyle = 'rgb(179, 225, 240)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.restore()
      context.strokeStyle = '#000'
      // 格子外框
      for (let k = 0; k < 11; k++) {
        console.log(canvas.width)
        // 横线
        context.moveTo(0, k * self.cell)
        context.lineTo(canvas.width, k * self.cell)
        context.stroke()
        // 竖线
        context.moveTo(k * self.cell, 0)
        context.lineTo(k * self.cell, canvas.height)
        context.stroke()
      }

      // 初始化蛇
      self.snake.push()

      // 随机投食
      self.food = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
      context.fillStyle = 'red'
      context.fillRect(self.food[0] * self.cell, self.food[1] * self.cell, self.cell, self.cell)
    }
  }
}
</script>

<style lang="scss" scoped>
div#snake-game {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  div.head-btn, .foot-btn, .control-btn {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
  .foot-btn, .control-btn {
    justify-content: space-between;
  }
  span#tips-num {
    font-size: 20px;
    font-weight: bold;
  }
  div.time-line {
    height: 41px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    span {
      display: inline-flex;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      font-size: 22px;
    }
  }
  button {
    margin: 0;
    font-size: 18px;
    width: 90px;
    height: 40px;
  }
  .icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: cover;
  }
  .theme {
    background-image: url('../assets/icons/theme-light.png');
  }
  .bulb {
    background-image: url('../assets/icons/bulb-light.png');
  }
  .full-screen {
    background-image: url('../assets/icons/fullscreen-light.png');
  }
  .pause {
    background-image: url('../assets/icons/pause-light.png');
  }
  .play {
    background-image: url('../assets/icons/play-light.png');
  }
}
</style>

