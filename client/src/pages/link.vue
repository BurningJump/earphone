<template>
  <div id="link-game">
    <div class="header">
      <span class="title">连连看</span>
      <span class="head-btn">
        <button>声音</button>
        <button>换肤</button>
        <button @click="switchLight">关灯</button>
      </span>
    </div>
    <div class="time-line">
      <span class="level">级别 {{level}}</span>
      <span>时间</span>
      <p class="time-outbox"><span id="time"></span></p>
      <span id="score">积分：{{score}}</span>
    </div>
    <canvas id="canvas" width="1120" height="640"></canvas>
    <div class="control">
      <button class="pause" @click="pause">暂停</button>
      <span id="tips-num">提示数 {{tips}}</span>
      <button class="tips" @click="showTip">提示</button>
    </div>
    <div class="footer">
      <button>重玩</button>
      <button>放大</button>
      <button>缩小</button>
      <button>大屏</button>
      <button @click="fullScreen">全屏</button>
    </div>
  </div>
</template>
<script>
// import level from './level.js'
export default {
  data() {
    return {
      imgUrl: '',
      time: 180,
      tips: 6,
      score: 0,
      level: 1,
      paused: false
    }
  },
  mounted() {
    this.drawBoard()
  },
  methods: {
    switchLight() {
      const app = document.getElementById('app')
      if (app.style.backgroundColor === 'black') {
        app.style.backgroundColor = 'white'
        app.style.color = 'black'
      } else {
        app.style.backgroundColor = 'black'
        app.style.color = 'white'
      }
    },
    pause() {
      if (this.paused) {
        // play
      } else {
        // pause
      }
    },
    drawBoard() {
      const self = this
      // const WIDTH = 1120
      // const HEIGHT = 640

      // 每一级180秒
      const countDown = setInterval(function() {
        self.time--
      }, 1000)
      if (self.time <= 0) {
        clearInterval(countDown)
        console.log('game over!')
        self.time = 180
      }
      // const width = 1120
      // const height = 800
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')

      context.save()
      /* // 大矩形
      context.fillStyle = 'rgb(0, 207, 255)'
      context.fillRect(0, 0, WIDTH, HEIGHT)
      context.restore() */

      // canvas区域
      context.fillStyle = 'rgb(179, 225, 240)'
      context.fillRect(0, 0, 1120, 640)

      // 级别时间积分
      context.font = '26px Georgia'
      context.fillStyle = '#fff'

      context.strokeStyle = '#000'

      // 原点(0, 0)
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
          context.strokeRect(5 + 80 * k, 5 + 80 * m, 70, 70)
        }
      }

      // 绘制图片
      const levelOne = [
        'AliceBlue',
        'Plum',
        'MidnightBlue',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black',
        'BlanchedAlmond',
        'Blue',
        'Gold',
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
      /* const levelTwo = [
        'AliceBlue',
        'AntiqueWhite',
        'Aqua',
        'Aquamarine',
        'Azure',
        'Beige',
        'Bisque',
        'Black'
      ] */
      // 格子坐标
      const coordinate = [
        [0, 0],	[1, 0],	[2, 0],	[3, 0],	[4, 0],	[5, 0],	[6, 0],	[7, 0],	[8, 0],	[9, 0],	[10, 0], [11, 0], [12, 0], [13, 0],
        [0, 1],	[1, 1],	[2, 1],	[3, 1],	[4, 1],	[5, 1],	[6, 1],	[7, 1],	[8, 1],	[9, 1],	[10, 1], [11, 1], [12, 1], [13, 1],
        [0, 2],	[1, 2],	[2, 2],	[3, 2],	[4, 2],	[5, 2],	[6, 2],	[7, 2],	[8, 2],	[9, 2],	[10, 2], [11, 2], [12, 2], [13, 2],
        [0, 3],	[1, 3],	[2, 3],	[3, 3],	[4, 3],	[5, 3],	[6, 3],	[7, 3],	[8, 3],	[9, 3],	[10, 3], [11, 3], [12, 3], [13, 3],
        [0, 4],	[1, 4],	[2, 4],	[3, 4],	[4, 4],	[5, 4],	[6, 4],	[7, 4],	[8, 4],	[9, 4],	[10, 4], [11, 4], [12, 4], [13, 4],
        [0, 5],	[1, 5],	[2, 5],	[3, 5],	[4, 5],	[5, 5],	[6, 5],	[7, 5],	[8, 5],	[9, 5],	[10, 5], [11, 5], [12, 5], [13, 5],
        [0, 6],	[1, 6],	[2, 6],	[3, 6],	[4, 6],	[5, 6],	[6, 6],	[7, 6],	[8, 6],	[9, 6],	[10, 6], [11, 6], [12, 6], [13, 6],
        [0, 7],	[1, 7],	[2, 7],	[3, 7],	[4, 7],	[5, 7],	[6, 7],	[7, 7],	[8, 7],	[9, 7],	[10, 7], [11, 7], [12, 7], [13, 7]
      ]
      /*
      * 随机摆放图片：
      * 1.先把每一级的所有图片摆放2次，共占用 level.length*2 格
      * 2.剩下14*8-level.length*2格，循环(14*8-level.length*2)/2次，每次随机抽取一张图片，摆放2格
      * 3.用数组记录图片名称或路径，以便后续判断两张图片是否相同
      */
      const imgArr = []
      levelOne.forEach((element, index) => {
        const img = new Image()
        img.src = require('../assets/images/' + element + '.png')
        // 随机抽两个格子
        const index1 = Math.floor(Math.random() * coordinate.length)
        const x1 = coordinate[index1][0]
        const y1 = coordinate[index1][1]
        coordinate.splice(index1, 1)
        imgArr.push([x1, y1, element])
        const index2 = Math.floor(Math.random() * coordinate.length)
        const x2 = coordinate[index2][0]
        const y2 = coordinate[index2][1]
        coordinate.splice(index2, 1)
        imgArr.push([x2, y2, element])
        img.onload = function() {
          context.drawImage(img, 5 + 80 * x1, 5 + 80 * y1, 70, 70)
          context.drawImage(img, 5 + 80 * x2, 5 + 80 * y2, 70, 70)
        }
      })
      for (let i = 0, len = coordinate.length, num = len / 2; i < num; i++) {
        const levelIndex = Math.floor(Math.random() * levelOne.length)
        const index3 = Math.floor(Math.random() * coordinate.length)
        const x3 = coordinate[index3][0]
        const y3 = coordinate[index3][1]
        coordinate.splice(index3, 1)
        imgArr.push([x3, y3, levelOne[levelIndex]])
        const index4 = Math.floor(Math.random() * coordinate.length)
        const x4 = coordinate[index4][0]
        const y4 = coordinate[index4][1]
        coordinate.splice(index4, 1)
        imgArr.push([x4, y4, levelOne[levelIndex]])
        const img = new Image()
        img.src = require('../assets/images/' + levelOne[levelIndex] + '.png')
        img.onload = function() {
          context.drawImage(img, 5 + 80 * x3, 5 + 80 * y3, 70, 70)
          context.drawImage(img, 5 + 80 * x4, 5 + 80 * y4, 70, 70)
        }
      }
      imgArr.sort(function(x, y) {
        return x[0] - y[0]
      })
      console.log(imgArr)

      /*
      * 鼠标点击事件
      * 用数组记录两次点击的坐标，存储选中的图片信息
      * 如果两张图片不一样，则保留最后一次点击的图片坐标
      */
      let clickArr = []
      canvas.onclick = function(e) {
        if (clickArr.length === 2) {
          clickArr.shift()
        }
        var location = getLocation(e.clientX, e.clientY)
        console.log(location.x, location.y)
        if (location.x < 5 || location.x > 1115 || location.y < 5 || location.y > 635) {
          clickArr = []
        }

        const x = Math.floor((location.x - 5) / 80)
        const y = Math.floor((location.y - 5) / 80)
        clickArr.push([x, y])
        if (clickArr.length === 2) {
          // 如果两次点击同一位置的图片，则只保留一次坐标
          if (clickArr[0][0] === clickArr[1][0] && clickArr[0][1] === clickArr[1][1]) {
            clickArr.shift()
          }
          // imgArr 为乱序
          console.log(clickArr)
          // 2018.04.26 01:20 接下来判断两次点击的图片颜色名称是否相同
          let imgSelected1 = []
          let imgSelected2 = []
          imgArr.forEach((element, index) => {
            if (element[0] === clickArr[0][0] && element[1] === clickArr[0][1]) {
              imgSelected1 = [...element]
              imgArr.splice(index, 1)
            }
            if (element[0] === clickArr[1][0] && element[1] === clickArr[1][1]) {
              imgSelected2 = [...element]
              imgArr.splice(index, 1)
            }
          })
          // 两次点击的图片相同
          if (imgSelected1[2] === imgSelected2[2]) {
            console.log('相同图片')
            // 位置相邻：上下相邻、左右相邻
            if (Math.abs(imgSelected1[0] - imgSelected2[0]) === 1 && imgSelected1[1] === imgSelected2[1]) {
              console.log('左右相邻')
              clickArr = []
            }
            if (Math.abs(imgSelected1[1] - imgSelected2[1]) === 1 && imgSelected1[0] === imgSelected2[0]) {
              console.log('上下相邻')
              clickArr = []
            }
            context.fillStyle = 'rgb(179, 225, 240)'
            context.fillRect(5 + 80 * imgSelected1[0], 5 + 80 * imgSelected1[1], 70, 70)
            context.fillRect(5 + 80 * imgSelected2[0], 5 + 80 * imgSelected2[1], 70, 70)
            console.log(imgArr)

            // 直线相连
          }
        }
      }
      function getLocation(x, y) {
        var bbox = canvas.getBoundingClientRect()
        return {
          x: (x - bbox.left) * (canvas.width / bbox.width),
          y: (y - bbox.top) * (canvas.height / bbox.height)
          /*
          * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际
          * 显示像素不变而造成的坐标获取不准的情况
          x: (x - bbox.left),
          y: (y - bbox.top)
          */
        }
      }
      /*
      * 判断可连接情况：
      * 1.只有内容相同的图片才有消除的可能
      * 2.每次只能消除两张图片，消除时需要使用鼠标指定（即连接）
      * 3.两张图片连接时所经过的路径（连接路径）不能超过两个拐点
      * 4.连接路径经过的单元格所包含的图片必须已经消除
      */
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
    showTip() {
      if (this.tips === 0) return
      this.tips--
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
  div.time-line {
    p.time-outbox {
      position: relative;
      display: inline-block;
      width: 640px;
      height: 20px;
      margin: 0;
      border: 1px solid #ccc;
      span#time {
        position: absolute;
        top: 0;
        left: 0;
        width: 320px;
        height: 100%;
        background-color: yellowgreen;
      }
    }
  }
  width: 1400px;
  height: 1200px;
    canvas {
      width: 1120px;
      height: 640px;
    }
}
</style>
