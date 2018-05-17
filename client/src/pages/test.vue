<template>
  <div id="test">
    <img :src="img" alt="">
  </div>
</template>

<script>
import Mock from 'mockjs';
export default {
  data() {
    return {
      img: ''
    };
  },
  mounted() {
    const self = this;
    setInterval(function() {
      self.generateImg();
    }, 2000);
  },
  methods: {
    generateImg() {
      this.img = Mock.Random.dataImage('100x100', Mock.Random.cword());
    }
  }
};
</script>

