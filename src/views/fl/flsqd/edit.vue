<template>
  <el-dialog :title="title" :visible.sync="open" :before-close="closeDia" width="700px" append-to-body>

    <el-tabs type="border-card">
      <el-tab-pane label="基本信息" lazy>
        <!-- 添加或修改放疗申请单对话框 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="编号:">
            <span>{{ form.id }}</span>
          </el-form-item>
          <el-form-item label="患者姓名" prop="hzXm">
            <el-input v-model="form.hzXm" placeholder="请输入患者姓名" />
          </el-form-item>
          <el-form-item label="患者性别" prop="hzXb">
            <el-select v-model="form.hzXb" placeholder="请选择患者性别">
              <el-option v-for="dict in dict.type.sys_user_sex" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="患者出生年月" prop="hzSr">
            <el-date-picker clearable size="small" v-model="form.hzSr" type="date" value-format="yyyy-MM-dd"
              placeholder="选择患者出生年月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="患者电话" prop="hzDh">
            <el-input v-model="form.hzDh" placeholder="请输入患者电话" />
          </el-form-item>
          <el-form-item label="患者住院号" prop="hzZyh">
            <el-input v-model="form.hzZyh" placeholder="请输入患者住院号" />
          </el-form-item>
          <el-form-item label="患者科室" prop="hzKs">
            <el-input v-model="form.hzKs" placeholder="请输入患者科室" />
          </el-form-item>
          <el-form-item label="患者病房医生" prop="hzBfys">
            <el-input v-model="form.hzBfys" placeholder="请输入患者病房医生" />
          </el-form-item>
          <el-form-item label="患者放疗医生" prop="hzFlys">
            <el-input v-model="form.hzFlys" placeholder="请输入患者放疗医生" />
          </el-form-item>
          <el-form-item label="患者同步化疗">
            <el-radio-group v-model="form.hzTbhl">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="患者病史/诊断" prop="hzBs">
            <el-input v-model="form.hzBs" type="textarea" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item label="固定方式" prop="gdfs">
            <el-select v-model="form.gdfs" placeholder="请选择固定方式">
              <el-option v-for="dict in dict.type.fl_gdfs" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扫描上界" prop="smsj">
            <el-input v-model="form.smsj" placeholder="请输入扫描上界" />
          </el-form-item>
          <el-form-item label="扫描中心" prop="smzx">
            <el-input v-model="form.smzx" placeholder="请输入扫描中心" />
          </el-form-item>
          <el-form-item label="扫描下界" prop="smxj">
            <el-input v-model="form.smxj" placeholder="请输入扫描下界" />
          </el-form-item>
          <el-form-item label="层厚" prop="ch">
            <el-input v-model="form.ch" placeholder="请输入层厚" />
          </el-form-item>
          <el-form-item label="扫描类型1">
            <el-radio-group v-model="form.smlx1">
              <el-radio v-for="dict in dict.type.fl_smlx1" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="扫描类型2">
            <el-radio-group v-model="form.smlx2">
              <el-radio v-for="dict in dict.type.fl_smlx2" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否空腹">
            <el-radio-group v-model="form.kf">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="喝水毫升数" prop="hes">
            <el-input v-model="form.hes" placeholder="请输入喝水毫升数" />
          </el-form-item>
          <el-form-item label="是否憋尿">
            <el-radio-group v-model="form.bn">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否铅丝标记">
            <el-radio-group v-model="form.qsbj">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否BOLUS">
            <el-radio-group v-model="form.bolus">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否口含瓶">
            <el-radio-group v-model="form.khp">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="其它" prop="qit">
            <el-input v-model="form.qit" placeholder="请输入其它" />
          </el-form-item>
          <el-form-item label="图像融合类型" prop="txrhlx">
            <el-select v-model="form.txrhlx" placeholder="请选择图像融合类型">
              <el-option v-for="dict in dict.type.fl_txrhlx" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图像融合编号" prop="txrhbh">
            <el-input v-model="form.txrhbh" placeholder="请输入图像融合编号" />
          </el-form-item>
          <el-form-item label="是否重定位">
            <el-radio-group v-model="form.cdw">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="治疗技术" prop="zljs">
            <el-select v-model="form.zljs" placeholder="请选择治疗技术">
              <el-option v-for="dict in dict.type.fl_zljs" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="治疗机器" prop="zljq">
            <el-select v-model="form.zljq" placeholder="请选择治疗机器">
              <el-option v-for="dict in dict.type.fl_zljq" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IGRT" prop="igrt">
            <el-select v-model="form.igrt" placeholder="请选择IGRT">
              <el-option v-for="dict in dict.type.fl_IGRT" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IGRT频率类型" prop="igrtpllx">
            <el-select v-model="form.igrtpllx" placeholder="请选择IGRT频率类型">
              <el-option v-for="dict in dict.type.fl_igrtpllx" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IGRT频率值" prop="igrtplz">
            <el-input v-model="form.igrtplz" placeholder="请输入IGRT频率值" />
          </el-form-item>
          <el-form-item label="是否呼吸门控">
            <el-radio-group v-model="form.hxmk">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否剂量验证">
            <el-radio-group v-model="form.jlyz">
              <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="总放疗次数" prop="cureCount">
            <el-input-number v-model="form.cureCount" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="已完成放疗次数" prop="curedCount">
            <el-input-number v-model="form.curedCount" :min="0" :max="form.cureCount"></el-input-number>
          </el-form-item>
          <el-form-item label="已支付治疗次数" prop="paidCount">
            <el-input-number v-model="form.paidCount" :min="0" :max="form.cureCount"></el-input-number>
          </el-form-item>
          <el-form-item label="放疗单状态">
            <el-radio-group v-model="form.fldzt">
              <el-radio v-for="dict in dict.type.fl_fldzt" :key="dict.value"
                :label="dict.value">{{ dict.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="初始放疗单" prop="fuid">
            <el-input v-model="form.fuid" placeholder="请输入初始放疗单" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="靶区" lazy>
        <target :fldid="fldId" :editFlag="true"></target>
      </el-tab-pane>
      <el-tab-pane label="危害器官" lazy>
        <organ :fldid="fldId" :editFlag="true"></organ>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getFlsqd,
    newId,
    addFlsqd,
    updateFlsqd,
  } from "@/api/fl/flsqd";
  import {
    listTargetregion,
    getTargetregion,
    delTargetregion,
    addTargetregion,
    updateTargetregion
  } from "@/api/fl/targetregion";
  import {
    listOrgandamage,
    getOrgandamage,
    delOrgandamage,
    addOrgandamage,
    updateOrgandamage
  } from "@/api/fl/organdamage";
  import organ from "@/views/fl/flsqd/organ.vue";
  import target from "@/views/fl/flsqd/target.vue";
  export default {
    dicts: ['fl_zljq', 'fl_fldzt', 'fl_zljs', 'fl_gdfs', 'fl_txrhlx', 'fl_igrtpllx', 'sys_yes_no', 'sys_user_sex',
      'fl_smlx1', 'fl_IGRT', 'fl_smlx2', 'fl_lc'
    ],
    props: {
      //flsqd: Object
    },
    data() {
      return {
        form: {},
        title: '',
        open: false,
        newId: null,
        addFlag: false,
        fldId: null,
        targetregionList: [],
        organdamageList: [],
        // 表单校验
        rules: {
          hzXm: [{
            required: true,
            message: "患者姓名不能为空",
            trigger: "blur"
          }],
          hzXb: [{
            required: true,
            message: "患者性别不能为空",
            trigger: "change"
          }],
          hzSr: [{
            required: true,
            message: "患者出生年月不能为空",
            trigger: "blur"
          }],
          hzDh: [{
            required: true,
            message: "患者电话不能为空",
            trigger: "blur"
          }],
          hzFlys: [{
            required: true,
            message: "患者放疗医生不能为空",
            trigger: "blur"
          }],
          hzTbhl: [{
            required: true,
            message: "患者同步化疗不能为空",
            trigger: "blur"
          }],
          hzBs: [{
            required: true,
            message: "患者病史/诊断不能为空",
            trigger: "blur"
          }],
          gdfs: [{
            required: true,
            message: "固定方式不能为空",
            trigger: "change"
          }],
          smsj: [{
            required: true,
            message: "扫描上界不能为空",
            trigger: "blur"
          }],
          smzx: [{
            required: true,
            message: "扫描中心不能为空",
            trigger: "blur"
          }],
          smxj: [{
            required: true,
            message: "扫描下界不能为空",
            trigger: "blur"
          }],
          ch: [{
            required: true,
            message: "层厚不能为空",
            trigger: "blur"
          }],
          smlx1: [{
            required: true,
            message: "扫描类型1不能为空",
            trigger: "blur"
          }],
          smlx2: [{
            required: true,
            message: "扫描类型2不能为空",
            trigger: "blur"
          }],
          kf: [{
            required: true,
            message: "是否空腹不能为空",
            trigger: "blur"
          }],
          hes: [{
            required: true,
            message: "喝水毫升数不能为空",
            trigger: "blur"
          }],
          bn: [{
            required: true,
            message: "是否憋尿不能为空",
            trigger: "blur"
          }],
          qsbj: [{
            required: true,
            message: "是否铅丝标记不能为空",
            trigger: "blur"
          }],
          bolus: [{
            required: true,
            message: "是否BOLUS不能为空",
            trigger: "blur"
          }],
          khp: [{
            required: true,
            message: "是否口含瓶不能为空",
            trigger: "blur"
          }],
          qit: [{
            required: true,
            message: "其它不能为空",
            trigger: "blur"
          }],
          txrhlx: [{
            required: true,
            message: "图像融合类型不能为空",
            trigger: "change"
          }],
          txrhbh: [{
            required: true,
            message: "图像融合编号不能为空",
            trigger: "blur"
          }],
          cdw: [{
            required: true,
            message: "是否重定位不能为空",
            trigger: "blur"
          }],
          zljs: [{
            required: true,
            message: "治疗技术不能为空",
            trigger: "change"
          }],
          zljq: [{
            required: true,
            message: "治疗机器不能为空",
            trigger: "change"
          }],
          igrt: [{
            required: true,
            message: "IGRT不能为空",
            trigger: "change"
          }],
          igrtpllx: [{
            required: true,
            message: "IGRT频率类型不能为空",
            trigger: "change"
          }],
          igrtplz: [{
            required: true,
            message: "IGRT频率值不能为空",
            trigger: "blur"
          }],
          hxmk: [{
            required: true,
            message: "是否呼吸门控不能为空",
            trigger: "blur"
          }],
          jlyz: [{
            required: true,
            message: "是否剂量验证不能为空",
            trigger: "blur"
          }],
          dqczry: [{
            required: true,
            message: "当前所属操作人员不能为空",
            trigger: "blur"
          }],
          fldzt: [{
            required: true,
            message: "放疗单状态不能为空",
            trigger: "blur"
          }],
          // fuid: [
          //   { required: true, message: "初始放疗单不能为空", trigger: "blur" }
          // ]
        },
      }
    },
    components: {
      organ,
      target
    },
    created() {
      //this.form = this.flsqd
    },
    methods: {
      openDia(flsqd) {
        this.form = this.flsqd
        this.open = true;
      },
      closeDia() {
        this.open = false;
      },

      getNewId() {
        newId().then(response => {
          return response.data;
        });
      },

      // 表单重置
      reset() {
        this.form = {
          id: null,
          myId: null,
          hzXm: null,
          hzXb: null,
          hzSr: null,
          hzDh: null,
          hzZyh: null,
          hzKs: null,
          hzBfys: null,
          hzFlys: null,
          hzTbhl: "0",
          hzBs: null,
          gdfs: null,
          smsj: null,
          smzx: null,
          smxj: null,
          ch: null,
          smlx1: "0",
          smlx2: "0",
          kf: "0",
          hes: null,
          bn: "0",
          qsbj: "0",
          bolus: "0",
          khp: "0",
          qit: null,
          txrhlx: null,
          txrhbh: null,
          cdw: "0",
          zljs: null,
          zljq: null,
          igrt: null,
          igrtpllx: null,
          igrtplz: null,
          hxmk: "0",
          jlyz: "0",
          dqlcjdmc: null,
          dqczry: null,
          fldzt: "jxz",
          fuid: null
        };
        this.resetForm("form");
      },

      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },

      /** 新增按钮操作 */
      async handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加放疗申请单";
        console.log("获取到新id", this.newId)
        this.form.id = await this.getNewId();
        this.addFlag = true;
        // if (this.form.id == null || this.form.id == undefined || this.form.id = '') {
        //   console.log("获取放疗单id失败")
        //   this.$modal.msgSuccess("获取放疗单id失败");
        // }
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        console.log("edit组件handleUpdate", row)
        this.fldId = row.id;
        this.reset();
        getFlsqd(this.fldId).then(response => {
          console.log("查询结果", response)
          this.form = response.data;
          this.open = true;
          this.title = "修改放疗申请单";
          this.addFlag = false;
        });
      },

      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (!this.addFlag) {
              updateFlsqd(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.$emit('editSuccessEvent');
                //this.getList();
              });
            } else {
              addFlsqd(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.$emit('editSuccessEvent');
                //this.getList();
                //this.getNewId();
              });
            }
          }
        });
      },

      /** 查询靶区列表 */
      getTargetList() {
        if (!this.fldId) {
          return;
        }
        this.loading = true;
        const queryParams = {
          fldId: this.fldId
        }
        listTargetregion(queryParams).then(response => {
          this.targetregionList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

      /** 查询器官危害列表 */
      getOrganList() {
        if (!this.fldId) {
          return;
        }
        this.loading = true;
        const queryParams = {
          fldId: this.fldId
        }
        listOrgandamage(queryParams).then(response => {
          this.organdamageList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },

    }
  }
</script>

<style></style>
