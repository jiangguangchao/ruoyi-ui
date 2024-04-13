<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="患者姓名" prop="hzXm">
        <el-input
          v-model="queryParams.hzXm"
          placeholder="请输入患者姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="患者性别" prop="hzXb">
        <el-select v-model="queryParams.hzXb" placeholder="请选择患者性别" clearable size="small">
          <el-option
            v-for="dict in dict.type.sys_user_sex"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="患者放疗医生" prop="hzFlys">
        <el-input
          v-model="queryParams.hzFlys"
          placeholder="请输入患者放疗医生"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="固定方式" prop="gdfs">
        <el-select v-model="queryParams.gdfs" placeholder="请选择固定方式" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_gdfs"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图像融合类型" prop="txrhlx">
        <el-select v-model="queryParams.txrhlx" placeholder="请选择图像融合类型" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_txrhlx"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="治疗技术" prop="zljs">
        <el-select v-model="queryParams.zljs" placeholder="请选择治疗技术" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_zljs"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="治疗机器" prop="zljq">
        <el-select v-model="queryParams.zljq" placeholder="请选择治疗机器" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_zljq"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="IGRT" prop="igrt">
        <el-select v-model="queryParams.igrt" placeholder="请选择IGRT" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_IGRT"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否剂量验证" prop="jlyz">
        <el-select v-model="queryParams.jlyz" placeholder="请选择是否剂量验证" clearable size="small">
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前流程节点" prop="dqlcjdmc">
        <el-select v-model="queryParams.dqlcjdmc" placeholder="请选择当前流程节点" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_lc"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前所属操作人员" prop="dqczry">
        <el-input
          v-model="queryParams.dqczry"
          placeholder="请输入当前所属操作人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放疗单状态" prop="fldzt">
        <el-select v-model="queryParams.fldzt" placeholder="请选择放疗单状态" clearable size="small">
          <el-option
            v-for="dict in dict.type.fl_fldzt"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fl:flsqd:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['fl:flsqd:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['fl:flsqd:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['fl:flsqd:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="flsqdList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="患者姓名" align="center" prop="hzXm" />
      <el-table-column label="患者性别" align="center" prop="hzXb">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.hzXb"/>
        </template>
      </el-table-column>
      <el-table-column label="患者出生年月" align="center" prop="hzSr" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.hzSr, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="患者电话" align="center" prop="hzDh" />
      <el-table-column label="患者住院号" align="center" prop="hzZyh" />
      <el-table-column label="患者科室" align="center" prop="hzKs" />
      <el-table-column label="患者病房医生" align="center" prop="hzBfys" />
      <el-table-column label="患者放疗医生" align="center" prop="hzFlys" />
      <el-table-column label="患者同步化疗" align="center" prop="hzTbhl">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.hzTbhl"/>
        </template>
      </el-table-column>
      <el-table-column label="患者病史/诊断" align="center" prop="hzBs" />
      <el-table-column label="固定方式" align="center" prop="gdfs">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_gdfs" :value="scope.row.gdfs"/>
        </template>
      </el-table-column>
      <el-table-column label="扫描上界" align="center" prop="smsj" />
      <el-table-column label="扫描中心" align="center" prop="smzx" />
      <el-table-column label="扫描下界" align="center" prop="smxj" />
      <el-table-column label="层厚" align="center" prop="ch" />
      <el-table-column label="扫描类型1" align="center" prop="smlx1">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_smlx1" :value="scope.row.smlx1"/>
        </template>
      </el-table-column>
      <el-table-column label="扫描类型2" align="center" prop="smlx2">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_smlx2" :value="scope.row.smlx2"/>
        </template>
      </el-table-column>
      <el-table-column label="是否空腹" align="center" prop="kf">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.kf"/>
        </template>
      </el-table-column>
      <el-table-column label="喝水毫升数" align="center" prop="hes" />
      <el-table-column label="是否憋尿" align="center" prop="bn">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.bn"/>
        </template>
      </el-table-column>
      <el-table-column label="是否铅丝标记" align="center" prop="qsbj">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.qsbj"/>
        </template>
      </el-table-column>
      <el-table-column label="是否BOLUS" align="center" prop="bolus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.bolus"/>
        </template>
      </el-table-column>
      <el-table-column label="是否口含瓶" align="center" prop="khp">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.khp"/>
        </template>
      </el-table-column>
      <el-table-column label="其它" align="center" prop="qit" />
      <el-table-column label="图像融合类型" align="center" prop="txrhlx">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_txrhlx" :value="scope.row.txrhlx"/>
        </template>
      </el-table-column>
      <el-table-column label="图像融合编号" align="center" prop="txrhbh" />
      <el-table-column label="是否重定位" align="center" prop="cdw">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.cdw"/>
        </template>
      </el-table-column>
      <el-table-column label="治疗技术" align="center" prop="zljs">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_zljs" :value="scope.row.zljs"/>
        </template>
      </el-table-column>
      <el-table-column label="治疗机器" align="center" prop="zljq">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_zljq" :value="scope.row.zljq"/>
        </template>
      </el-table-column>
      <el-table-column label="IGRT" align="center" prop="igrt">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_IGRT" :value="scope.row.igrt"/>
        </template>
      </el-table-column>
      <el-table-column label="IGRT频率类型" align="center" prop="igrtpllx">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_igrtpllx" :value="scope.row.igrtpllx"/>
        </template>
      </el-table-column>
      <el-table-column label="IGRT频率值" align="center" prop="igrtplz" />
      <el-table-column label="是否呼吸门控" align="center" prop="hxmk">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.hxmk"/>
        </template>
      </el-table-column>
      <el-table-column label="是否剂量验证" align="center" prop="jlyz">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.jlyz"/>
        </template>
      </el-table-column> -->
      <el-table-column label="当前流程节点" align="center" prop="dqlcjdmc">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_lc" :value="scope.row.dqlcjdmc"/>
        </template>
      </el-table-column>
      <el-table-column label="当前所属操作人员" align="center" prop="dqczrymc" />
      <el-table-column label="放疗单状态" align="center" prop="fldzt">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fl_fldzt" :value="scope.row.fldzt"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="初始放疗单" align="center" prop="fuid" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button

            v-show="scope.row.fldzt == 'wks'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleStart(scope.row)"
            v-hasPermi="['fl:flsqd:edit']"
          >开启</el-button>
          <el-button
            v-show="scope.row.fldzt == 'jxz'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['fl:flsqd:edit']"
          >修改</el-button>
          <el-button
            v-show="scope.row.fldzt == 'jxz'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="openAlloctDig(scope.row)"
            v-hasPermi="['fl:flsqd:edit']"
          >指派</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="openLCDig(scope.row)"
            v-hasPermi="['fl:fllcjl:list']"
          >流程详情</el-button>
          <el-button
            v-show="scope.row.fldzt == 'jxz'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSign(scope.row)"
            v-hasPermi="['fl:flsqd:sign']"
          >签名</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="openDetailDig(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改放疗申请单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号:">
          <span>{{form.id}}</span>
        </el-form-item>
        <el-form-item label="患者姓名" prop="hzXm">
          <el-input v-model="form.hzXm" placeholder="请输入患者姓名" />
        </el-form-item>
        <el-form-item label="患者性别" prop="hzXb">
          <el-select v-model="form.hzXb" placeholder="请选择患者性别">
            <el-option
              v-for="dict in dict.type.sys_user_sex"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患者出生年月" prop="hzSr">
          <el-date-picker clearable size="small"
            v-model="form.hzSr"
            type="date"
            value-format="yyyy-MM-dd"
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
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者病史/诊断" prop="hzBs">
          <el-input v-model="form.hzBs" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="固定方式" prop="gdfs">
          <el-select v-model="form.gdfs" placeholder="请选择固定方式">
            <el-option
              v-for="dict in dict.type.fl_gdfs"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
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
            <el-radio
              v-for="dict in dict.type.fl_smlx1"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="扫描类型2">
          <el-radio-group v-model="form.smlx2">
            <el-radio
              v-for="dict in dict.type.fl_smlx2"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否空腹">
          <el-radio-group v-model="form.kf">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="喝水毫升数" prop="hes">
          <el-input v-model="form.hes" placeholder="请输入喝水毫升数" />
        </el-form-item>
        <el-form-item label="是否憋尿">
          <el-radio-group v-model="form.bn">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否铅丝标记">
          <el-radio-group v-model="form.qsbj">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否BOLUS">
          <el-radio-group v-model="form.bolus">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否口含瓶">
          <el-radio-group v-model="form.khp">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="其它" prop="qit">
          <el-input v-model="form.qit" placeholder="请输入其它" />
        </el-form-item>
        <el-form-item label="图像融合类型" prop="txrhlx">
          <el-select v-model="form.txrhlx" placeholder="请选择图像融合类型">
            <el-option
              v-for="dict in dict.type.fl_txrhlx"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图像融合编号" prop="txrhbh">
          <el-input v-model="form.txrhbh" placeholder="请输入图像融合编号" />
        </el-form-item>
        <el-form-item label="是否重定位">
          <el-radio-group v-model="form.cdw">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="治疗技术" prop="zljs">
          <el-select v-model="form.zljs" placeholder="请选择治疗技术">
            <el-option
              v-for="dict in dict.type.fl_zljs"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="治疗机器" prop="zljq">
          <el-select v-model="form.zljq" placeholder="请选择治疗机器">
            <el-option
              v-for="dict in dict.type.fl_zljq"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IGRT" prop="igrt">
          <el-select v-model="form.igrt" placeholder="请选择IGRT">
            <el-option
              v-for="dict in dict.type.fl_IGRT"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IGRT频率类型" prop="igrtpllx">
          <el-select v-model="form.igrtpllx" placeholder="请选择IGRT频率类型">
            <el-option
              v-for="dict in dict.type.fl_igrtpllx"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IGRT频率值" prop="igrtplz">
          <el-input v-model="form.igrtplz" placeholder="请输入IGRT频率值" />
        </el-form-item>
        <el-form-item label="是否呼吸门控">
          <el-radio-group v-model="form.hxmk">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否剂量验证">
          <el-radio-group v-model="form.jlyz">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="放疗单状态">
          <el-radio-group v-model="form.fldzt">
            <el-radio
              v-for="dict in dict.type.fl_fldzt"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="初始放疗单" prop="fuid">
          <el-input v-model="form.fuid" placeholder="请输入初始放疗单" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!--指派或转派弹窗-->
    <el-dialog :visible.sync="allocateDigOpen" title="选择操作人员" width="500px">
      <el-select v-model="selectedWorker" placeholder="请选择操作人员">
        <el-option
          v-for="item in postUserList"
          :key="item.userId"
          :label="item.userName"
          :value="item.userId"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocateDigOpen = false">取消</el-button>
        <el-button type="primary" @click="allocateUser">确定</el-button>
      </span>
    </el-dialog>

    <flsqdDetail ref="flsqdDetail"></flsqdDetail>
    
    <lcDetail ref="lcDetail"></lcDetail>

  </div>
</template>


<script>
import { listFlsqd, getFlsqd, delFlsqd, addFlsqd, updateFlsqd, startFlsqd, signFlsqd } from "@/api/fl/flsqd";
import { listFllcjl } from "@/api/fl/fllcjl";
import { allUser } from "@/api/system/user";
import  flsqdDetail  from "./flsqdDetail.vue";
import { newId } from "../../../api/fl/flsqd";
import lcDetail from "./lcDetail.vue";

export default {
  name: "Flsqd",
  dicts: ['fl_zljq', 'fl_fldzt', 'fl_zljs', 'fl_gdfs', 'fl_txrhlx', 'fl_igrtpllx', 'sys_yes_no', 'sys_user_sex', 'fl_smlx1', 'fl_IGRT', 'fl_smlx2', 'fl_lc'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 放疗申请单表格数据
      flsqdList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        hzXm: null,
        hzXb: null,
        hzFlys: null,
        gdfs: null,
        txrhlx: null,
        zljs: null,
        zljq: null,
        igrt: null,
        jlyz: null,
        dqlcjdmc: null,
        dqczry: null,
        fldzt: null,
      },
      // 表单参数
      form: {},
      //所有用户
      userList: [],
      //(某个)岗位用户
      postUserList: [],
      allocateDigOpen: false,
      selectedWorker: null,
      selectedRow: null,
      addFlag:true,

      flsqdDetailOpen: false,
      flsqdId: null,
      flsqdObj: null,
      newId:null,
      processNodes:['节点1', '节点2', '节点3', '节点4'],


      steps: [
        { operator: '', date: '' , lc: 'dw' , lcname: '定位' },
        { operator: '', date: '' , lc: 'bqgh' , lcname: '靶区勾画'},
        { operator: '', date: '' , lc: 'bqhz' , lcname: '靶区核准'},
        { operator: '', date: '' , lc: 'bqtj' , lcname: '靶区提交'},
        { operator: '', date: '' , lc: 'jhsj' , lcname: '计划设计'},
        { operator: '', date: '' , lc: 'jhhz' , lcname: '计划核准'},
        { operator: '', date: '' , lc: 'fwyz' , lcname: '复位验证'},
      ],

      // 表单校验
      rules: {
        hzXm: [
          { required: true, message: "患者姓名不能为空", trigger: "blur" }
        ],
        hzXb: [
          { required: true, message: "患者性别不能为空", trigger: "change" }
        ],
        hzSr: [
          { required: true, message: "患者出生年月不能为空", trigger: "blur" }
        ],
        hzDh: [
          { required: true, message: "患者电话不能为空", trigger: "blur" }
        ],
        hzFlys: [
          { required: true, message: "患者放疗医生不能为空", trigger: "blur" }
        ],
        hzTbhl: [
          { required: true, message: "患者同步化疗不能为空", trigger: "blur" }
        ],
        hzBs: [
          { required: true, message: "患者病史/诊断不能为空", trigger: "blur" }
        ],
        gdfs: [
          { required: true, message: "固定方式不能为空", trigger: "change" }
        ],
        smsj: [
          { required: true, message: "扫描上界不能为空", trigger: "blur" }
        ],
        smzx: [
          { required: true, message: "扫描中心不能为空", trigger: "blur" }
        ],
        smxj: [
          { required: true, message: "扫描下界不能为空", trigger: "blur" }
        ],
        ch: [
          { required: true, message: "层厚不能为空", trigger: "blur" }
        ],
        smlx1: [
          { required: true, message: "扫描类型1不能为空", trigger: "blur" }
        ],
        smlx2: [
          { required: true, message: "扫描类型2不能为空", trigger: "blur" }
        ],
        kf: [
          { required: true, message: "是否空腹不能为空", trigger: "blur" }
        ],
        hes: [
          { required: true, message: "喝水毫升数不能为空", trigger: "blur" }
        ],
        bn: [
          { required: true, message: "是否憋尿不能为空", trigger: "blur" }
        ],
        qsbj: [
          { required: true, message: "是否铅丝标记不能为空", trigger: "blur" }
        ],
        bolus: [
          { required: true, message: "是否BOLUS不能为空", trigger: "blur" }
        ],
        khp: [
          { required: true, message: "是否口含瓶不能为空", trigger: "blur" }
        ],
        qit: [
          { required: true, message: "其它不能为空", trigger: "blur" }
        ],
        txrhlx: [
          { required: true, message: "图像融合类型不能为空", trigger: "change" }
        ],
        txrhbh: [
          { required: true, message: "图像融合编号不能为空", trigger: "blur" }
        ],
        cdw: [
          { required: true, message: "是否重定位不能为空", trigger: "blur" }
        ],
        zljs: [
          { required: true, message: "治疗技术不能为空", trigger: "change" }
        ],
        zljq: [
          { required: true, message: "治疗机器不能为空", trigger: "change" }
        ],
        igrt: [
          { required: true, message: "IGRT不能为空", trigger: "change" }
        ],
        igrtpllx: [
          { required: true, message: "IGRT频率类型不能为空", trigger: "change" }
        ],
        igrtplz: [
          { required: true, message: "IGRT频率值不能为空", trigger: "blur" }
        ],
        hxmk: [
          { required: true, message: "是否呼吸门控不能为空", trigger: "blur" }
        ],
        jlyz: [
          { required: true, message: "是否剂量验证不能为空", trigger: "blur" }
        ],
        dqczry: [
          { required: true, message: "当前所属操作人员不能为空", trigger: "blur" }
        ],
        fldzt: [
          { required: true, message: "放疗单状态不能为空", trigger: "blur" }
        ],
        // fuid: [
        //   { required: true, message: "初始放疗单不能为空", trigger: "blur" }
        // ]
      }
    };
  },
  created() {
    this.getUsers();
    this.getList();
    this.getNewId();
  },
  components: {
    flsqdDetail,
    lcDetail
  },
  methods: {
    /** 查询放疗申请单列表 */
    getList() {
      this.loading = true;
      listFlsqd(this.queryParams).then(response => {
        this.flsqdList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.flsqdList.forEach(d=>{
          this.userList.forEach(u=>{
            if (u.userId === d.dqczry) {
              d.dqczrymc = u.userName
            }
          })
        })
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
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
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    getUsers() {
      allUser({}).then(response=> {
        this.userList = response.data
        console.log("查询到用户", this.userList)
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加放疗申请单";
      console.log("获取到新id", this.newId)
      this.form.id = this.newId;
      this.addFlag = true;
      // if (this.form.id == null || this.form.id == undefined || this.form.id = '') {
      //   console.log("获取放疗单id失败")
      //   this.$modal.msgSuccess("获取放疗单id失败");
      // }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFlsqd(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改放疗申请单";
        this.addFlag = false;
      });
    },
    handleStart(row) {
      // this.reset();
      startFlsqd(row).then(response => {
        this.$modal.msgSuccess("开启成功");
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
              this.getList();
            });
          } else {
            addFlsqd(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.getNewId();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除放疗申请单编号为"' + ids + '"的数据项？').then(function() {
        return delFlsqd(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('fl/flsqd/export', {
        ...this.queryParams
      }, `flsqd_${new Date().getTime()}.xlsx`)
    },
    openAlloctDig(row) {
      this.postUserList = this.userList.filter(u=> u.postCode == row.dqlcjdmc);
      console.log("岗位用户：", this.postUserList);
      this.allocateDigOpen = true;
      this.selectedWorker = row.dqczry;
      this.selectedRow = row;
    },
    allocateUser() {
      // 在这里执行指派任务的逻辑，可以通过this.selectedWorker获取选择的工作人员ID
      console.log('已选择的工作人员ID：', this.selectedWorker);
      this.allocateDigOpen = false;

      var selectUser = this.selectedWorker
      this.selectedWorker = null;
      var flsqd = {
        id: this.selectedRow.id,
        dqczry: selectUser
      }

      updateFlsqd(flsqd).then(response => {
        this.$modal.msgSuccess("指派成功");
        this.open = false;
        this.getList();
      });

    },
    //签名
    handleSign(row) {
      this.$modal.confirm('确定签名？').then(function() {
        return signFlsqd(row);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("签名成功");
      }).catch(() => {});
    },
    //openLCDig
    openLCDig(row) {
      this.$refs.lcDetail.openDia(row);
    },

    openDetailDig(row) {
      this.$refs.flsqdDetail.openDia(row);
    },
    closeDetail() {
      this.flsqdDetailOpen = false
      this.flsqdId=null
      this.flsqdObj = null
    },

    getNewId() {
      newId().then(response => {
        this.newId = response.data;
      });
    },

    getUserNameById(userId) {
      var userName = '';
      this.userList.forEach(u=> {
        if (u.userId == userId) {
          userName = u.userName;
        }
      })
      return userName;
    }
  }
};
</script>
