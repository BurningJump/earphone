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
// import level from './level.js'
export default {
  data() {
    return {
      imgUrl: ''
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
      /* for (let i = 0; i < 15; i++) {
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

      // 绘制图片
      const levelOne = [
        'AliceBlue',
        'AntiqueWhite',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black',
        'BlanchedAlmond',
        'Blue',
        'BlueViolet',
        'Brown',
        'BurlyWood',
        'CadetBlue',
        'Chartreuse',
        'Chocolate',
        'Coral',
        'CornflowerBlue',
        'Cornsilk',
        'Crimson',
        'Cyan',
        'DarkBlue',
        'DarkCyan',
        'DarkGoldenRod',
        'DarkGray',
        'DarkGreen',
        'DarkKhaki',
        'DarkMagenta',
        'DarkOliveGreen',
        'Darkorange'
      ]
      const levelTwo = [
        'AliceBlue',
        'AntiqueWhite',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black'
      ]
      // 格子坐标
      const coordinate = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13],
        [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [7, 13]
      ]
      /*
      * 随机摆放图片：
      * 1.先把每一级的所有图片摆放2次，共占用 level.length*2 格
      * 2.剩下14*8-level.length*2格，循环(14*8-level.length*2)/2次，每次随机抽取一张图片，摆放2格
      */
      levelOne.forEach((element, index) => {
        const img = new Image()
        img.src = require('../assets/images/' + element + '.png')
        // 随机抽两个格子
        const index1 = Math.floor(Math.random() * coordinate.length)
        const y1 = coordinate[index1][0]
        const x1 = coordinate[index1][1]
        coordinate.splice(index1, 1)
        const index2 = Math.floor(Math.random() * coordinate.length)
        const y2 = coordinate[index2][0]
        const x2 = coordinate[index2][1]
        coordinate.splice(index2, 1)
        img.onload = function() {
          context.drawImage(img, 125 + 80 * x1, 105 + 80 * y1, 70, 70)
          context.drawImage(img, 125 + 80 * x2, 105 + 80 * y2, 70, 70)
        }
      })
      for (let i = 0, len = coordinate.length, num = len / 2; i < num; i++) {
        const levelIndex = Math.floor(Math.random() * levelOne.length)
        const index3 = Math.floor(Math.random() * coordinate.length)
        const y3 = coordinate[index3][0]
        const x3 = coordinate[index3][1]
        coordinate.splice(index3, 1)
        const index4 = Math.floor(Math.random() * coordinate.length)
        const y4 = coordinate[index4][0]
        const x4 = coordinate[index4][1]
        coordinate.splice(index4, 1)
        const img = new Image()
        img.src = require('../assets/images/' + levelOne[levelIndex] + '.png')
        img.onload = function() {
          context.drawImage(img, 125 + 80 * x3, 105 + 80 * y3, 70, 70)
          context.drawImage(img, 125 + 80 * x4, 105 + 80 * y4, 70, 70)
        }
      }
      /*
      * 判断可连接情况：
      * 1.只有内容相同的图片才有消除的可能
      * 2.每次只能消除两张图片，消除时需要使用鼠标指定（即连接）
      * 3.两张图片连接时所经过的路径（连接路径）不能超过两个拐点
      * 4.连接路径经过的单元格所包含的图片必须已经消除
      */
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
