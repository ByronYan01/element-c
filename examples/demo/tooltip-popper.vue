<template>
  <div style="position: relative">
    <div class="tooltip-popper">
      <div class="content"></div>
      <div class="arrow"></div>
    </div>
    <div class="triangle1"></div>
    <div class="triangle2"></div>
    <div class="triangle3"></div>
  </div>
</template>
<script>
export default {
  name: 'tooltip-popper',
}
</script>
<style lang="scss" scoped>
.triangle1 {
  position: absolute;
  right: 500px;
  // width: 0;
  // height: 0;
  width: 100px;
  height: 100px;
  border-width: 50px;
  border-style: solid;
  border-top-color: aqua;
  border-right-color: blueviolet;
  border-bottom-color: chocolate;
  border-left-color: crimson;
}
.triangle2 {
  position: absolute;
  right: 300px;
  width: 0;
  height: 0;
  // width: 100px;
  // height: 100px;
  border-width: 50px;
  border-style: solid;
  border-top-color: aqua;
  border-right-color: blueviolet;
  border-bottom-color: chocolate;
  border-left-color: crimson;
}
.triangle3 {
  position: absolute;
  right: 100px;
  width: 0;
  height: 0;
  // width: 100px;
  // height: 100px;
  border-width: 50px;
  border-style: solid;
  border-top-color: aqua;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-bottom-width: 0;
  // &::after {
  //   content: ' ';
  //   position: absolute;
  //   bottom: 10px;
  //   transform: translateX(-50%);
  //   width: 0;
  //   height: 0;
  //   border-width: 40px;
  //   border-style: solid;
  //   border-top-color: rgb(35, 132, 2);
  //   border-right-color: transparent;
  //   border-bottom-color: transparent;
  //   border-left-color: transparent;
  //   border-bottom-width: 0;
  // }
}
.tooltip-popper {
  width: 200px;
  height: 50px;
  position: relative;
  padding: 12px;
  background: #fff;
  border: 1px solid #bebebe;
  .content {
    width: 100%;
    height: 100%;
  }
  .arrow,
  .arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  /* 
      其他方向，只需要改变 border-top-color、 border-bottom-width 即可
    */
  .arrow {
    /* 
      由于 tooltip-popper 有 padding，讲 bottom 设置为 0 紧贴边缘，
      再设置边框宽度让其完全移动出来 arrow 元素 
    */
    bottom: -6px;
    left: 12px;
    /*
    三角外层
    边框为 6 px
     */
    border-width: 6px;
    border-top-color: #bebebe;
    border-bottom-width: 0;

    &::after {
      content: ' ';
      /*
        三角内层
        相对于 arrow 绝对定位
        设置 bottom 1px 让其露出 tooltip-popper 一样得边框
      */
      bottom: 1px;
      /* 再偏移自身宽度一半 */
      transform: translateX(-50%);
      /* margin-left: -5px; */
      border-width: 5px;
      border-top-color: #fff;
      border-bottom-width: 0;
    }
  }
}
</style>
