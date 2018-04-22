<template>
  <div id="link-game">
    <div class="header">
      <span class="title">连连看</span>
      <span class="head-btn">
        <button>声音</button>
        <button>换肤</button>
        <button>关灯</button>
      </span>
    </div>
    <canvas id="canvas" width="1360" height="850"></canvas>
    <div class="footer">
      <span>重玩</span>
      <span>放大</span>
      <span>缩小</span>
      <span>大屏</span>
      <span>全屏</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.drawBoard()
  },
  methods: {
    drawBoard() {
      const WIDTH = 1360
      const HEIGHT = 1000
      const level = 1
      const score = 0
      const tips = 6
      // const width = 1120
      // const height = 800
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')

      context.save()
      // 大矩形
      context.fillStyle = 'rgb(0, 207, 255)'
      context.fillRect(0, 0, WIDTH, HEIGHT)
      context.restore()

      // 小矩形
      context.fillStyle = 'rgb(179, 225, 240)'
      context.fillRect(120, 100, 1120, 640)

      // 级别时间积分
      context.font = '26px Georgia'
      context.fillStyle = '#fff'
      context.fillText('级别' + level, 100, 50)
      context.fillText('时间', 250, 50)
      context.fillText('积分：' + score, 1050, 50)

      context.strokeStyle = '#000'

      // 原点(120, 100)
     /*  for (let i = 0; i < 15; i++) {
        context.moveTo(120 + 80 * i, 100)
        context.lineTo(120 + 80 * i, 740)
        context.stroke()
      }
      for (let j = 0; j < 9; j++) {
        context.moveTo(120, 100 + 80 * j)
        context.lineTo(1240, 100 + 80 * j)
        context.stroke()
      } */
      context.restore()
      context.strokeStyle = '#000'
      // 70*70 小图片矩形
      for (let k = 0; k < 14; k++) {
        for (let m = 0; m < 8; m++) {
          context.strokeRect(125 + 80 * k, 105 + 80 * m, 70, 70)
        }
      }

      // 按钮矩形
      // context.fillStyle = 'green'
      // context.fillRect(50, 800, 100, 50)
      context.fillText('暂停', 100, 800)
      context.fillText('提示数', 1000, 800)
      context.fillText(tips, 1100, 800)
      context.fillText('提示', 1250, 800)
    }
  }
}
</script>
<style lang="scss" scoped>
div#link-game {
  /* display: flex;
  justify-content: center;
  align-content: center;
  align-items: center; */
  width: 1400px;
  height: 1200px;
    canvas {
      width: 1360px;
      height: 1000px;
    }
}
</style>
