<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="岗位8">
              <el-select v-model="form.postId">
                <el-option
                    v-for="item in postOptions"
                    :key="item.postId"
                    :label="item.postName"
                    :value="item.postId">
                  </el-option>
              </el-select>
            </el-form-item>
    </el-form>

    <button @click="myclick">按钮</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
      },
      postOptions : [
        {
          postId:1,
          postName:'岗位1'
        },
        {
          postId:2,
          postName:'岗位2'
        },
        {
          postId:3,
          postName:'岗位3'
        },
      ],
    };
  },
  methods: {
    myclick(){
      console.log("这是按钮")
      var obj = {};
      // obj.postId = 1;
      this.form = obj;
      this.form.postId = 1;
    }
  }
};
</script>
