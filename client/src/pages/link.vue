<template>
  <div id="link-game" :style="{height:screenHeight + 'px'}">
    <div class="head-btn" :style="{width:width + 'px'}">
      <el-button type="primary" size="small" v-show="!mute" @click="switchVolumn"><icon name="volume-up"></icon>声音</el-button>
      <el-button type="primary" size="small" v-show="mute" @click="switchVolumn"><icon name="volume-off"></icon>声音</el-button>
      <!-- <el-button type="primary" size="small" @click="changeTheme"><i class="icon theme"></i>换肤<el-color-picker v-model="themeColor" size="small" @active-change="changeTheme"></el-color-picker></el-button> -->
      <el-button type="primary" size="small" @click="switchLight"><i class="icon bulb"></i>关灯</el-button>
    </div>
    <div class="time-line" :style="{width:width + 'px'}">
      <span class="level" :style="{width:width * 0.2 + 'px'}"><span>级别 {{level}}</span><span>时间</span></span>
      <el-progress :style="{width:width * 0.6 + 'px'}" :show-text="false" :stroke-width="18" :percentage="remainingTimePercentage" color="rgba(142, 113, 199, 0.7)"></el-progress>
      <!-- <span id="score" :style="{width:width * 0.2 + 'px'}"><span>积分：</span><span>{{score}}</span></span> -->
      <span id="score" :style="{width:width * 0.2 + 'px'}">积分：{{score}}</span>
    </div>
    <canvas id="link-canvas" :width="width" :height="height"></canvas>
    <div class="control-btn" :style="{width:width + 'px'}">
      <el-button type="primary" size="small" v-show="!paused" @click="pause"><i class="icon pause"></i>暂停</el-button>
      <el-button type="primary" size="small" v-show="paused" @click="pause"><i class="icon play"></i>开始</el-button>
      <span id="hints-num">提示数 {{hints}} <el-button type="info" size="small" icon="el-icon-search" @click="showHint" :disabled="noHints">提示</el-button></span>
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
// import level from './level.js'
export default {
  data() {
    return {
      imgUrl: '',
      time: 180,
      countdown: null,
      remainingTimePercentage: 100,
      hints: 6,
      noHints: false,
      score: 0,
      level: 1,
      dark: false,
      mute: false,
      themeColor: '#ffffff',
      paused: false,
      deadEnd: false,
      screenWidth: 0,
      screenHeight: 0,
      size: 'medium',
      cell: 80,
      clickNums: 0
    };
  },
  mounted() {
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    if (this.screenWidth === 1366) {
      this.size = 'medium';
      this.cell = 50;
    } else if (this.screenWidth >= 1920) {
      this.size = 'large';
      this.cell = 60;
    } else {
      this.size = 'small';
      this.cell = 40;
    }
    this.$nextTick(function() {
      this.drawBoard();
    });
  },
  watch: {
    deadEnd(val) {
      console.log(val);
    },
    cell() {
      this.drawBoard();
    },
    remainingTimePercentage(val) {
      // console.log(val);
      if (val <= 0) {
        clearInterval(this.countdown);
        const self = this;
        self.$confirm('GAME OVER! 是否重玩？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          val = 100;
          self.drawBoard();
        }).catch(() => {
        });
      }
    },
    clickNums(val) {
      if (val === 1) {
        // 第一次点击鼠标时开始倒计时，因remainingTimePercentage只能为0-100的整数，所以每过time/100*1000毫秒，remainingTimePercentage减一
        const self = this;
        self.countdown = setInterval(function() {
          self.remainingTimePercentage = parseInt(self.remainingTimePercentage - 1);
        }, 1800);
      }
    }
  },
  computed: {
    width() {
      return this.cell * 14;
    },
    height() {
      return this.cell * 10;
    }
  },
  methods: {
    switchVolumn() {
      this.mute = !this.mute;
    },
    switchLight() {
      const app = document.getElementById('app');
      if (this.dark) {
        app.style.backgroundColor = 'white';
        app.style.color = 'black';
      } else {
        app.style.backgroundColor = 'black';
        app.style.color = 'white';
      }
      this.dark = !this.dark;
    },
    changeTheme() {
      // alert('暂未实现该功能！')
      const app = document.getElementById('app');
      app.style.backgroundColor = this.themeColor;
    },
    pause() {
      if (this.paused) {
        // play
      } else {
        // pause
      }
      this.paused = !this.paused;
    },
    isEmptyLine(point1, point2, imgArr) {
      // 判断两点之间是否为空，point = [x, y]
      let isEmpty = true;
      let min;
      let points;
      if (point1[0] === point2[0]) {
        // console.log('两点同列231')
        // 上下相邻
        if (Math.abs(point1[1] - point2[1]) === 1) {
          isEmpty = true;
          return true;
        } else if (Math.abs(point1[1] - point2[1]) > 1) {
          // 同一列
          min = point1[1] < point2[1] ? point1[1] : point2[1];
          points = Math.abs(point1[1] - point2[1]);
          for (let i = 1; i < points; i++) {
            // isEmpty = true
            for (let j = 0, len = imgArr.length; j < len; j++) {
              if (imgArr[j][0] === point1[0] && imgArr[j][1] === min + i) {
                isEmpty = false;
                break;
              }
            }
            // console.log(isEmpty, 'isEmpty249')
            if (!isEmpty) {
              return false;
            } else {
              continue;
            }
          }
          return isEmpty;
        }
      } else if (point1[1] === point2[1]) {
        // console.log('两点同行259')
        // 左右相邻
        if (Math.abs(point1[0] - point2[0]) === 1) {
          isEmpty = true;
          return true;
        } else if (Math.abs(point1[0] - point2[0]) > 1) {
          // 同一行
          min = point1[0] < point2[0] ? point1[0] : point2[0];
          points = Math.abs(point1[0] - point2[0]);
          for (let i = 1; i < points; i++) {
            for (let j = 0, len = imgArr.length; j < len; j++) {
              if (imgArr[j][1] === point1[1] && imgArr[j][0] === min + i) {
                // console.log(imgArr[j], '271---')
                isEmpty = false;
                break;
              }
            }
            // console.log(isEmpty, 'isEmpty276')
            if (!isEmpty) {
              return false;
            } else {
              continue;
            }
          }
          return isEmpty;
        }
      } else {
        isEmpty = false;
        return false;
      }
    },
    oneAngleLink(point1, point2, imgArr) {
      // 判断能否一折连接
      let canLink = false;
      let point3 = [point1[0], point2[1]];
      let point4 = [point2[0], point1[1]];
      // console.log(point3, point4, '293,点3和4')
      for (let i = 0, len = imgArr.length; i < len; i++) {
        if (point3 !== [] && imgArr[i][0] === point3[0] && imgArr[i][1] === point3[1]) {
          // point3上有图片，删除point3
          point3 = [];
          continue;
        }
        if (point4 !== [] && imgArr[i][0] === point4[0] && imgArr[i][1] === point4[1]) {
          // point3上有图片，删除point3
          point4 = [];
          continue;
        }
        if (point3 === [] && point4 === []) {
          break;
        }
      }
      if (point3 === [] && point4 === []) {
        return canLink;
      }
      // console.log('一折相连265')
      // console.log(point3, point4, '311,点3和4')
      if ((point3 !== [] && this.isEmptyLine(point1, point3, imgArr) && this.isEmptyLine(point2, point3, imgArr)) || (point4 !== [] && this.isEmptyLine(point1, point4, imgArr) && this.isEmptyLine(point2, point4, imgArr))) {
        canLink = true;
      } else {
        // console.log('不能一折相连271')
        canLink = false;
      }
      return canLink;
    },
    doubleAngleLink(point1, point2, imgArr) {
      // 判断能否两折连接，可以转化为判断能否找到一个C单元格，该C单元格可以与A单元格0折连接，
      // 且C与B可以1折连接。若能找到这样一个C单元格，那么A与B就可以2折连接
      // if (isEmptyLine(point1, point2) || oneAngleLink(point1, point2)) return false
      let commonPoint = [];
      let canRightLink = false;
      let canLeftLink = false;
      let canDownLink = false;
      let canUpLink = false;
      let isEmptyRight = true;
      let isEmptyLeft = true;
      let isEmptyDown = true;
      let isEmptyUp = true;
      // 从A点向右扫描
      for (let i = 1; i < 15 - point1[0]; i++) {
        // console.log('向右扫描')
        commonPoint = [point1[0] + i, point1[1]];
        for (let j = 0, len = imgArr.length; j < len; j++) {
          if (imgArr[j][0] === commonPoint[0] && imgArr[j][1] === commonPoint[1]) {
            isEmptyRight = false;
            console.log(imgArr[j], commonPoint, isEmptyRight, '右');
            break;
          }
        }
        if (isEmptyRight) {
          if (this.isEmptyLine(point1, commonPoint, imgArr) && this.oneAngleLink(point2, commonPoint, imgArr)) {
            canRightLink = true;
            return true;
          } else {
            continue;
          }
        } else {
          break;
        }
      }
      if (canRightLink) {
        return true;
      } else {
        console.log('右边没有319');
        // 从A点向左扫描
        for (let i = 1; i < 2 + point1[0]; i++) {
          // console.log('向左扫描366')
          commonPoint = [point1[0] - i, point1[1]];
          // console.log(commonPoint, '368')
          for (let j = 0, len = imgArr.length; j < len; j++) {
            if (imgArr[j][0] === commonPoint[0] && imgArr[j][1] === commonPoint[1]) {
              isEmptyLeft = false;
              console.log(commonPoint, imgArr[j], isEmptyLeft, '左');
              break;
            }
          }
          // console.log(isEmptyLeft, '373')
          if (isEmptyLeft) {
            // console.log('375')
            if (this.isEmptyLine(point1, commonPoint, imgArr) && this.oneAngleLink(point2, commonPoint, imgArr)) {
              canLeftLink = true;
              return true;
            } else {
              continue;
            }
          } else {
            console.log('383');
            break;
          }
        }
        if (canLeftLink) {
          // console.log('388')
          return true;
        } else {
          console.log('左边没有342');
          // 从A点向下扫描
          for (let i = 1; i < 11 - point1[1]; i++) {
            console.log(i, isEmptyDown);
            commonPoint = [point1[0], point1[1] + i];
            // console.log(commonPoint, '391---commonPoint')
            for (let j = 0, len = imgArr.length; j < len; j++) {
              if (imgArr[j][0] === commonPoint[0] && imgArr[j][1] === commonPoint[1]) {
                isEmptyDown = false;
                console.log(commonPoint, imgArr[j], isEmptyDown, '下');
                break;
              }
            }
            if (isEmptyDown) {
              // console.log(isEmptyLine(point1, commonPoint), 'isEmptyLine393')
              // console.log(oneAngleLink(point2, commonPoint), 'oneAngleLink394')
              if (this.isEmptyLine(point1, commonPoint, imgArr) && this.oneAngleLink(point2, commonPoint, imgArr)) {
                canDownLink = true;
                return true;
              } else {
                continue;
              }
            } else {
              break;
            }
          }
          if (canDownLink) {
            return true;
          } else {
            console.log('下边没有365');
            // 从A点向上扫描
            for (let i = 1; i < 2 + point1[1]; i++) {
              // console.log('向上扫描')
              commonPoint = [point1[0], point1[1] - i];
              // console.log(commonPoint, '422')
              for (let j = 0, len = imgArr.length; j < len; j++) {
                if (imgArr[j][0] === commonPoint[0] && imgArr[j][1] === commonPoint[1]) {
                  isEmptyUp = false;
                  console.log(commonPoint, imgArr[j], isEmptyUp, '上');
                  break;
                }
              }
              if (isEmptyUp) {
                if (this.isEmptyLine(point1, commonPoint, imgArr) && this.oneAngleLink(point2, commonPoint, imgArr)) {
                  canUpLink = true;
                  return true;
                } else {
                  continue;
                }
              } else {
                break;
              }
            }
            if (canUpLink) {
              return true;
            } else {
              console.log('上边没有388');
              return false;
            }
          }
        }
      }
    },
    drawBoard() {
      const self = this;
      clearInterval(self.countdown);
      self.remainingTimePercentage = 100;
      self.clickNums = 0;
      const canvas = document.getElementById('link-canvas');
      const context = canvas.getContext('2d');
      context.save();

      // canvas区域
      context.fillStyle = 'rgb(179, 225, 240)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.restore();
      context.strokeStyle = '#000';
      // 格子外框
      for (let k = 0; k < 14; k++) {
        for (let m = 0; m < 10; m++) {
          context.strokeRect(5 + self.cell * k, 5 + self.cell * m, self.cell - 10, self.cell - 10);
        }
      }

      // 绘制图片
      const levelOne = [
        'DeepPink',
        'Plum',
        'MidnightBlue',
        'Aquamarine',
        'MediumAquaMarine',
        'Yellow',
        'SpringGreen',
        'Black',
        'Maroon',
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
        'Red',
        'DarkBlue',
        'DarkCyan',
        'DarkGoldenRod',
        'DarkGray',
        'DarkGreen',
        'DarkKhaki',
        'DarkMagenta',
        'DarkOliveGreen',
        'Darkorange'
      ];
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
        [0, 7],	[1, 7],	[2, 7],	[3, 7],	[4, 7],	[5, 7],	[6, 7],	[7, 7],	[8, 7],	[9, 7],	[10, 7], [11, 7], [12, 7], [13, 7],
        [0, 8],	[1, 8],	[2, 8],	[3, 8],	[4, 8],	[5, 8],	[6, 8],	[7, 8],	[8, 8],	[9, 8],	[10, 8], [11, 8], [12, 8], [13, 8],
        [0, 9],	[1, 9],	[2, 9],	[3, 9],	[4, 9],	[5, 9],	[6, 9],	[7, 9],	[8, 9],	[9, 9],	[10, 9], [11, 9], [12, 9], [13, 9]
      ];
      /*
      * 随机摆放图片：
      * 1.先把每一级的所有图片摆放2次，共占用 level.length*2 格
      * 2.剩下14*8-level.length*2格，循环(14*8-level.length*2)/2次，每次随机抽取一张图片，摆放2格
      * 3.用数组记录图片名称或路径，以便后续判断两张图片是否相同
      */
      const imgArr = [];

      levelOne.forEach((element, index) => {
        const img = new Image();

        img.src = require('../assets/images/' + element + '.png');
        // 随机抽两个格子
        const index1 = Math.floor(Math.random() * coordinate.length);
        const x1 = coordinate[index1][0];
        const y1 = coordinate[index1][1];

        coordinate.splice(index1, 1);
        imgArr.push([x1, y1, element]);
        const index2 = Math.floor(Math.random() * coordinate.length);
        const x2 = coordinate[index2][0];
        const y2 = coordinate[index2][1];

        coordinate.splice(index2, 1);
        imgArr.push([x2, y2, element]);
        img.onload = function() {
          context.drawImage(img, 5 + self.cell * x1, 5 + self.cell * y1, self.cell - 10, self.cell - 10);
          context.drawImage(img, 5 + self.cell * x2, 5 + self.cell * y2, self.cell - 10, self.cell - 10);
        };
      });
      for (let i = 0, len = coordinate.length, num = len / 2; i < num; i++) {
        const levelIndex = Math.floor(Math.random() * levelOne.length);
        const index3 = Math.floor(Math.random() * coordinate.length);
        const x3 = coordinate[index3][0];
        const y3 = coordinate[index3][1];

        coordinate.splice(index3, 1);
        imgArr.push([x3, y3, levelOne[levelIndex]]);
        const index4 = Math.floor(Math.random() * coordinate.length);
        const x4 = coordinate[index4][0];
        const y4 = coordinate[index4][1];

        coordinate.splice(index4, 1);
        imgArr.push([x4, y4, levelOne[levelIndex]]);
        const img = new Image();

        img.src = require('../assets/images/' + levelOne[levelIndex] + '.png');
        img.onload = function() {
          context.drawImage(img, 5 + self.cell * x3, 5 + self.cell * y3, self.cell - 10, self.cell - 10);
          context.drawImage(img, 5 + self.cell * x4, 5 + self.cell * y4, self.cell - 10, self.cell - 10);
        };
      }
      imgArr.sort(function(x, y) {
        return x[0] - y[0];
      });
      // console.log(imgArr)

      // 获取鼠标点击坐标
      function getLocation(x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
          x: (x - bbox.left) * (canvas.width / bbox.width),
          y: (y - bbox.top) * (canvas.height / bbox.height)
          /*
          * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际
          * 显示像素不变而造成的坐标获取不准的情况
          x: (x - bbox.left),
          y: (y - bbox.top)
          */
        };
      }

      /*
      * 鼠标点击事件
      * 用数组记录两次点击的坐标，存储选中的图片信息
      * 如果两张图片不一样，则保留最后一次点击的图片坐标
      */
      let clickArr = [];

      canvas.onclick = function(e) {
        self.clickNums++;
        var location = getLocation(e.clientX, e.clientY);
        // console.log(~~location.x, ~~location.y)
        if (location.x < 5 || location.x > 1115 || location.y < 5 || location.y > 635) {
          clickArr = [];
        }

        const x = Math.floor((location.x - 5) / self.cell);
        const y = Math.floor((location.y - 5) / self.cell);
        clickArr.push([x, y]);
        if (clickArr.length === 2) {
          // 如果两次点击同一位置的图片，则只保留一次坐标
          if (clickArr[0][0] === clickArr[1][0] && clickArr[0][1] === clickArr[1][1]) {
            clickArr.shift();
          }
          // imgArr 为乱序
          // console.log(clickArr)
          // 2018.04.26 01:20 接下来判断两次点击的图片颜色名称是否相同
          let imgSelected1 = [];
          let imgSelected2 = [];
          for (let i = 0, len = imgArr.length; i < len; i++) {
            if (imgArr[i][0] === clickArr[0][0] && imgArr[i][1] === clickArr[0][1]) {
              imgSelected1 = [...imgArr[i]];
            }
            if (imgArr[i][0] === clickArr[1][0] && imgArr[i][1] === clickArr[1][1]) {
              imgSelected2 = [...imgArr[i]];
            }
          }

          // 两次点击的图片相同
          if (imgSelected1[2] === imgSelected2[2]) {
            console.log('相同图片503', imgSelected1, imgSelected2);
            if (imgSelected1[0] === imgSelected2[0] || imgSelected1[1] === imgSelected2[1]) {
              // 同行或同列
              if (self.isEmptyLine(imgSelected1, imgSelected2, imgArr) || self.doubleAngleLink(imgSelected1, imgSelected2, imgArr)) {
                // console.log('能直线或两折相连485');
                self.deleteImg(imgArr, imgSelected1);
                self.deleteImg(imgArr, imgSelected2);
              } else {
                // console.log('不能直线相连488');
                clickArr = [];
                imgSelected1 = [];
                imgSelected2 = [];
                return;
              }
            } else {
              // 不在同一直线
              if (self.oneAngleLink(imgSelected1, imgSelected2, imgArr) || self.doubleAngleLink(imgSelected1, imgSelected2, imgArr)) {
                // console.log('能一折或两折相连497');
                self.deleteImg(imgArr, imgSelected1);
                self.deleteImg(imgArr, imgSelected2);
              } else {
                // console.log('不能相连500')
                clickArr = [];
                imgSelected1 = [];
                imgSelected2 = [];
                return;
              }
            }

            // 在删除图片的格子画上默认背景，表示空格子
            context.fillStyle = 'rgb(179, 225, 240)';
            context.fillRect(5 + self.cell * imgSelected1[0], 5 + self.cell * imgSelected1[1], self.cell - 10, self.cell - 10);
            context.fillRect(5 + self.cell * imgSelected2[0], 5 + self.cell * imgSelected2[1], self.cell - 10, self.cell - 10);
            // console.log(imgArr)

            // 删除相同图片后清空选择数组
            clickArr = [];
            imgSelected1 = [];
            imgSelected2 = [];

            // 下一关
            if (imgArr.length === 0) {
              self.$confirm('恭喜过关, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                self.drawBoard();
              });
            }

            // 判断是否死局
            let existSolution = 0;
            for (let i = 0, len = imgArr.length; i < len - 1; i++) {
              for (let j = 1; j < len; j++) {
                if (self.isEmptyLine(imgArr[i], imgArr[j], imgArr) || self.oneAngleLink(imgArr[i], imgArr[j], imgArr) || self.doubleAngleLink(imgArr[i], imgArr[j], imgArr)) {
                  existSolution++;
                  break;
                }
              }
              if (existSolution > 0) break;
            }
            if (existSolution === 0 && imgArr.length !== 0) self.deadEnd = true;
            if (self.deadEnd) {
              window.alert('死局，重新布局');
              // 在有图片的格子上重新布局，取出所有图片，然后随机放回
              let existImg = [];
              const len = imgArr.length;
              for (let k = 0; k < len; k++) {
                existImg.push(imgArr[k][2]);
                imgArr[k].splice(2, 1);
              }
              existImg.sort(function() {
                return 0.5 - Math.random();
              });
              const img = new Image();
              for (let m = 0; m < len; m++) {
                imgArr[m].push(existImg[m]);
                img.src = require('../assets/images/' + imgArr[m][2] + '.png');
                img.onload = function() {
                  context.drawImage(img, 5 + self.cell * imgArr[m][0], 5 + self.cell * imgArr[m][1], self.cell - 10, self.cell - 10);
                };
              }
              existImg = [];
            }
            // 直线相连
          } else if (imgSelected1[2] !== imgSelected2[2]) {
            // 两次点击的图片不相同，则只保留最后一次点击的图片位置信息
            clickArr.shift();
          }
        }
      };

      /*
      * 判断可连接情况：
      * 1.只有内容相同的图片才有消除的可能
      * 2.每次只能消除两张图片，消除时需要使用鼠标指定（即连接）
      * 3.两张图片连接时所经过的路径（连接路径）不能超过两个拐点
      * 4.连接路径经过的单元格所包含的图片必须已经消除
      */
    },
    deleteImg(imgArr, imgSelected) {
      if (this.remainingTimePercentage >= 98) {
        this.remainingTimePercentage = 100;
      } else {
        this.remainingTimePercentage += 2;
      }
      // console.log(imgSelected1, imgSelected2)
      // 把删除的图片在imgArr里删除
      for (var i = 0, len = imgArr.length; i < len; i++) {
        if (imgArr[i][0] === imgSelected[0] && imgArr[i][1] === imgSelected[1]) {
          imgArr.splice(i, 1);
          break;
        }
      }
      // console.log(imgArr.length)
    },
    fullScreen() {
      const docElm = document.documentElement;

      if (docElm.requestFullscreen) {
        // W3C
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        // FireFox
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        // Chrome等
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        // IE11
        docElm.msRequestFullscreen();
      }

      // 退出全屏：
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    highlightGrid(context, arr) {
      context.save();
      context.strokeStyle = 'red';
      // context.lineWidth = 3;
      // 高亮外框
      context.strokeRect(5 + this.cell * arr[0], 5 + this.cell * arr[1], this.cell - 10, this.cell - 10);
      context.restore();
    },
    restoreGrid(context, arr) {
      context.save();
      context.strokeStyle = '#000';
      context.strokeRect(5 + this.cell * arr[0], 5 + this.cell * arr[1], this.cell - 10, this.cell - 10);
      context.restore();
    },
    showHint(context, imgArr) {
      if (this.hints === 0) {
        this.noHints = true;
        return;
      } else {
        const highlightImg = [];
        for (let i = 0, len = imgArr.length; i < len - 1; i++) {
          for (let j = 1; j < len; j++) {
            if (this.isEmptyLine(imgArr[i], imgArr[j], imgArr) || this.oneAngleLink(imgArr[i], imgArr[j], imgArr) || this.doubleAngleLink(imgArr[i], imgArr[j], imgArr)) {
              // console.log(imgArr[i], imgArr[j]);
              highlightImg.push(imgArr[i], imgArr[j]);
              // existSolution++;
              break;
            }
          }
          if (highlightImg.length > 0) break;
        }
        this.highlightGrid(context, highlightImg[0]);
        this.highlightGrid(context, highlightImg[1]);
        this.hints--;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
div#link-game {
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
  span#hints-num {
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
