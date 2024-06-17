<template>
  <div>
    <el-descriptions class="margin-top" title="放疗单详情" :column="3" border>
      <template slot="extra">
        <el-button type="primary" size="small"@click="refush">刷新</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          放疗单编号
        </template>
        {{ flsqd.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者姓名
        </template>
        {{ flsqd.hzXm}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者性别
        </template>
        <dict-tag :options="dict.type.sys_user_sex" :value="flsqd.hzXb" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者出生年月
        </template>
        {{ flsqd.hzSr }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者电话
        </template>
        {{ flsqd.hzDh }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者住院号
        </template>
        {{ flsqd.hzZyh }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者科室
        </template>
        {{ flsqd.hzKs }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者病房医生
        </template>
        {{ flsqd.hzBfys }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者放疗医生
        </template>
        {{ flsqd.hzFlys }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者同步化疗
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.hzTbhl" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          患者病史/诊断
        </template>
        {{ flsqd.hzBs }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          固定方式
        </template>
        <dict-tag :options="dict.type.fl_gdfs" :value="flsqd.gdfs" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          扫描上界
        </template>
        {{ flsqd.smsj }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          扫描中心
        </template>
        {{ flsqd.smzx }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          扫描下界
        </template>
        {{ flsqd.smxj }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          层厚
        </template>
        {{ flsqd.ch }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          扫描类型1
        </template>
        <dict-tag :options="dict.type.fl_smlx1" :value="flsqd.smlx1" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          扫描类型2
        </template>
        <dict-tag :options="dict.type.fl_smlx2" :value="flsqd.smlx2" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否空腹
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.kf" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          喝水毫升数
        </template>
        {{ flsqd.hes }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否憋尿
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.bn" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否铅丝标记
        </template>
        {{ flsqd.qsbj }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否BOLUS
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.bolus" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否口含瓶
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.khp" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          其它
        </template>
        {{ flsqd.qit }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          图像融合类型
        </template>
        <dict-tag :options="dict.type.fl_txrhlx" :value="flsqd.txrhlx" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          图像融合编号
        </template>
        {{ flsqd.txrhbh }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否重定位
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.cdw" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          治疗技术
        </template>
        <dict-tag :options="dict.type.fl_zljs" :value="flsqd.zljs" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          治疗机器
        </template>
        <dict-tag :options="dict.type.fl_zljq" :value="flsqd.zljq" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          IGRT
        </template>
        <dict-tag :options="dict.type.fl_IGRT" :value="flsqd.igrt" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          IGRT频率类型
        </template>
        <dict-tag :options="dict.type.fl_igrtpllx" :value="flsqd.igrtpllx" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          IGRT频率值
        </template>
        {{ flsqd.igrtplz }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否呼吸门控
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.hxmk" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否剂量验证
        </template>
        <dict-tag :options="dict.type.sys_yes_no" :value="flsqd.jlyz" />
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          放疗单状态
        </template>
        <dict-tag :options="dict.type.fl_fldzt" :value="flsqd.fldzt" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          初始放疗单
        </template>
        {{ flsqd.fuid }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
  import {
    getFlsqd,
  } from "@/api/fl/flsqd";
  export default {
    dicts: ['fl_zljq', 'fl_fldzt', 'fl_zljs', 'fl_gdfs', 'fl_txrhlx', 'fl_igrtpllx', 'sys_yes_no', 'sys_user_sex',
      'fl_smlx1', 'fl_IGRT', 'fl_smlx2', 'fl_lc'
    ],
    props: {
      fldId: String,
    },
    data() {
      return {
        flsqd: {},
      }
    },
    watch: {
      fldId(newVal, oldVal) {
        console.log("fldId", newVal)
        this.getFldDetail();
      }
    },
    created() {
      console.log("放疗单基本信息vue", this.fldId)
      this.getFldDetail();
    },
    methods: {
      getFldDetail(){
        if (!this.fldId) {
          return;
        }
        console.log("开始查询放疗单", this.fldId)
        getFlsqd(this.fldId).then(res=> {
          this.flsqd = res.data
        })
      },
      refush(){
        this.getFldDetail();
      },
    }
  }
</script>

<style></style>
