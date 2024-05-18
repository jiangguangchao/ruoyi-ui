<template>
  <div>
    <p>{{getNames}}</p>
  </div>
</template>


<script>

export default {
  dicts: ['zhibansj'],
  props: {
    radList: Array,
  },
  data() {
    return {
      name:null
    }
  },
  created() {
  },


  computed: {
    getNames(){
      if (this.radList == undefined || this.radList == null || this.radList.length < 1) {
        return '-';
      }
      var name = "";
      this.radList.forEach(e => {
        name = name + e.hzXm + ","
      })

      return name;

    },
  },
  methods: {


  }
};
</script>


<style type="text/css">
.select-container {
  display: flex;
  align-items: center;
  /* 如果需要垂直居中 */
}

.select-left,
.select-right {
  margin-right: 2px;
  /* 可选，为了在两个下拉框之间添加一些间距 */
}

.select-right {
  margin-right: 0;
  /* 最后一个下拉框不需要右边距 */
}
</style>
