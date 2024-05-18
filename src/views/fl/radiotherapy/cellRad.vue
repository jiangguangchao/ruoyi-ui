<template>
  <div>
    <p v-for="e in radList" @click="cli(e)">{{e.hzXm}}</p>

    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-tabs type="border-card">
        <el-tab-pane label="本次放疗信息">本次放疗信息</el-tab-pane>
        <el-tab-pane label="疗程信息">疗程信息</el-tab-pane>
        <el-tab-pane label="放疗单">放疗单</el-tab-pane>
      </el-tabs>
    </el-dialog>

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
      title: '患者治疗信息',
      open: false,
      name:null
    }
  },
  created() {
  },


  computed: {
  },
  methods: {
    cli(e) {
      console.log(e)
      this.open = true;
    }

  }
};
</script>


<style type="text/css">

</style>
