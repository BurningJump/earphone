<template>
  <div id="board">
    <canvas id="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
// import colors from './colors.json'
import level from './level.js';
// import colors from './colorData.json'
export default {
  data() {
    return {
      DarkBlue: require('../assets/images/DarkBlue.png'),
      imgUrl: ''
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.drawBoard();
      // colors.forEach(element => {
      //   element.src = `require('../assets/images/${element.colorName}.png')`
      //   document.write(element)
      // })
    });
  },
  methods: {
    drawBoard() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const img = new Image();
      console.log(level.one);
      level.one.forEach((element, index) => {
        img.src = require('../assets/images/' + element + '.png');
        img.onload = function() {
          context.drawImage(img, 70 * index, 70 * index, 70, 70);
        };
      });
    }
  }
};
</script>

