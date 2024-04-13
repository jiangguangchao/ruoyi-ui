<template>
  <el-dialog :title="flsqdDetailTitle" :visible.sync="open" width="500px" :before-close="closeDia">
    <el-form ref="form" :model="form" label-width="80px" disabled>
      <el-form-item label="患者姓名" prop="hzXm">
        <el-input v-model="form.hzXm" />
      </el-form-item>
      <el-form-item label="患者性别" prop="hzXb">
        <el-select v-model="form.hzXb">
          <el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者出生年月" prop="hzSr">
        <el-date-picker clearable size="small" v-model="form.hzSr" type="date" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="患者电话" prop="hzDh">
        <el-input v-model="form.hzDh" />
      </el-form-item>
      <el-form-item label="患者住院号" prop="hzZyh">
        <el-input v-model="form.hzZyh" />
      </el-form-item>
      <el-form-item label="患者科室" prop="hzKs">
        <el-input v-model="form.hzKs" />
      </el-form-item>
      <el-form-item label="患者病房医生" prop="hzBfys">
        <el-input v-model="form.hzBfys" />
      </el-form-item>
      <el-form-item label="患者放疗医生" prop="hzFlys">
        <el-input v-model="form.hzFlys" />
      </el-form-item>
      <el-form-item label="患者同步化疗">
        <el-radio-group v-model="form.hzTbhl">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="患者病史/诊断" prop="hzBs">
        <el-input v-model="form.hzBs" type="textarea" />
      </el-form-item>
      <el-form-item label="固定方式" prop="gdfs">
        <el-select v-model="form.gdfs">
          <el-option v-for="dict in dict.type.fl_gdfs" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扫描上界" prop="smsj">
        <el-input v-model="form.smsj" />
      </el-form-item>
      <el-form-item label="扫描中心" prop="smzx">
        <el-input v-model="form.smzx" />
      </el-form-item>
      <el-form-item label="扫描下界" prop="smxj">
        <el-input v-model="form.smxj" />
      </el-form-item>
      <el-form-item label="层厚" prop="ch">
        <el-input v-model="form.ch" />
      </el-form-item>
      <el-form-item label="扫描类型1">
        <el-radio-group v-model="form.smlx1">
          <el-radio v-for="dict in dict.type.fl_smlx1" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="扫描类型2">
        <el-radio-group v-model="form.smlx2">
          <el-radio v-for="dict in dict.type.fl_smlx2" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否空腹">
        <el-radio-group v-model="form.kf">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="喝水毫升数" prop="hes">
        <el-input v-model="form.hes" />
      </el-form-item>
      <el-form-item label="是否憋尿">
        <el-radio-group v-model="form.bn">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否铅丝标记">
        <el-radio-group v-model="form.qsbj">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否BOLUS">
        <el-radio-group v-model="form.bolus">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否口含瓶">
        <el-radio-group v-model="form.khp">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="其它" prop="qit">
        <el-input v-model="form.qit" />
      </el-form-item>
      <el-form-item label="图像融合类型" prop="txrhlx">
        <el-select v-model="form.txrhlx">
          <el-option v-for="dict in dict.type.fl_txrhlx" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图像融合编号" prop="txrhbh">
        <el-input v-model="form.txrhbh" />
      </el-form-item>
      <el-form-item label="是否重定位">
        <el-radio-group v-model="form.cdw">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="治疗技术" prop="zljs">
        <el-select v-model="form.zljs">
          <el-option v-for="dict in dict.type.fl_zljs" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="治疗机器" prop="zljq">
        <el-select v-model="form.zljq">
          <el-option v-for="dict in dict.type.fl_zljq" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IGRT" prop="igrt">
        <el-select v-model="form.igrt">
          <el-option v-for="dict in dict.type.fl_IGRT" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IGRT频率类型" prop="igrtpllx">
        <el-select v-model="form.igrtpllx">
          <el-option v-for="dict in dict.type.fl_igrtpllx" :key="dict.value" :label="dict.label"
            :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IGRT频率值" prop="igrtplz">
        <el-input v-model="form.igrtplz" />
      </el-form-item>
      <el-form-item label="是否呼吸门控">
        <el-radio-group v-model="form.hxmk">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否剂量验证">
        <el-radio-group v-model="form.jlyz">
          <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="放疗单状态">
        <el-radio-group v-model="form.fldzt">
          <el-radio v-for="dict in dict.type.fl_fldzt" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="初始放疗单" prop="fuid">
        <el-input v-model="form.fuid" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  dicts: ['fl_zljq', 'fl_fldzt', 'fl_zljs', 'fl_gdfs', 'fl_txrhlx', 'fl_igrtpllx', 'sys_yes_no', 'sys_user_sex', 'fl_smlx1', 'fl_IGRT', 'fl_smlx2', 'fl_lc'],
  data() {
    return {
      form: null,
      flsqdDetailTitle: "详情",
      open: false,
    }
  },
  methods: {
    openDia(row) {
      this.form = row;
      this.open = true;
    },
    closeDia() {
      console.log("关闭详情");
      this.open = false;
    },

  }
}

</script>

<style></style>
