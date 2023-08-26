<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" minWidth="100px"> </el-table-column>
      <el-table-column prop="name" label="姓名" minWidth="80px"> </el-table-column>
      <el-table-column prop="num" label="数量" minWidth="60px" align="right"> </el-table-column>
      <el-table-column prop="price" label="单价" minWidth="60px" align="right"> </el-table-column>
      <el-table-column prop="address" label="地址" minWidth="110px"> </el-table-column>
      <el-table-column prop="num" label="数字" minWidth="60px" align="right"> </el-table-column>
    </el-table>
    <div class="split-line">-----------</div>
    <div class="split-line">伪元素</div>
    <!-- 居右列、居左列相邻无间隙不美观问题 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" minWidth="100px"> </el-table-column>
      <el-table-column prop="name" label="姓名" minWidth="80px"> </el-table-column>
      <el-table-column prop="num" label="数量" minWidth="60px" align="right" className="right-column"> </el-table-column>
      <el-table-column prop="price" label="单价" minWidth="60px" align="right" className="right-column"> </el-table-column>
      <el-table-column prop="address" label="地址" minWidth="110px"> </el-table-column>
      <el-table-column prop="num" label="数字" minWidth="60px" align="right" className="right-column last-right-column"> </el-table-column>
    </el-table>
    <div class="split-line">-----------</div>
    <div class="split-line">padding</div>
    <!-- 掘友提供的 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" minWidth="100px"> </el-table-column>
      <el-table-column prop="name" label="姓名" minWidth="80px"> </el-table-column>
      <el-table-column prop="num" label="数量" minWidth="60px" align="right" className="right-column-pad"> </el-table-column>
      <el-table-column prop="price" label="单价" minWidth="60px" align="right" className="right-column-pad"> </el-table-column>
      <el-table-column prop="address" label="地址" minWidth="110px"> </el-table-column>
      <el-table-column prop="num" label="数字" minWidth="60px" align="right" className="right-column-pad last-right-column-pad"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'rightLeftColumn',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '西瓜',
          num: 1,
          price: 100,
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          num: 111,
          price: 1000,
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          num: 22,
          price: 10,
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          num: 3,
          price: 1,
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.split-line {
  margin: 12px 0;
}
</style>
<style lang="scss">
@mixin colRightMixin($spacing, $content) {
  .right-column.el-table__cell.is-right {
    // 在居右列中占用部分宽度作为间隙使用
    .cell {
      &::after {
        content: '';
        display: inline-block;
        width: $spacing;
        min-width: 5%;
      }
    }
    // 最后一个右列间隙宽度减少
    &.last-right-column {
      .cell {
        &::after {
          @if $spacing == 0 {
            width: $spacing;
          } @else {
            width: $spacing - 10;
          }
          // min-width: 0;
        }
      }
    }
  }
}
@include colRightMixin(50%, 50%);
// 在小于或等于 1800px 的屏幕上
@each $maxWidth, $spacing, $content in (1800px, 40%, 60%), (1600px, 30%, 70%), (1450px, 20%, 80%), (1350px, 10%, 90%), (1260px, 0, 100%) {
  @media screen and (max-width: $maxWidth) {
    @include colRightMixin($spacing, $content);
  }
}

@mixin colRightPadMixin($paddingRight) {
  .right-column-pad.el-table__cell.is-right {
    // 在居右列中占用部分宽度作为间隙使用
    .cell {
      padding-right: $paddingRight;
    }
    // 最后一个右列间隙宽度减少
    &.last-right-column-pad {
      .cell {
        @if $paddingRight == 0 {
          padding-right: $paddingRight;
        } @else {
          padding-right: $paddingRight - 10;
        }
        // min-width: 0;
      }
    }
  }
}

@include colRightPadMixin(50%);
@each $maxWidth, $paddingRight in (1800px, 40%), (1600px, 30%), (1450px, 20%), (1350px, 10%), (1260px, 0) {
  @media screen and (max-width: $maxWidth) {
    @include colRightPadMixin($paddingRight);
  }
}
</style>
