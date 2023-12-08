<template>
  <div class="economicInvestigation">
    <el-row class="mb-4">
      <el-button @click="openDialog" type="primary">新增案件</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%" height="100%">
      <el-table-column fixed prop="caseId" label="案件编号" width="120" />
      <el-table-column prop="caseName" label="案件名称" width="200" />
      <el-table-column prop="caseDescribe" label="案件描述" />
      <el-table-column prop="caseDate" label="案件日期" width="200" />
      <el-table-column fixed="right" label="操作" width="auto">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            >添加调单数据</el-button
          >
          <el-button
            link
            type="primary"
            @click="caseDetails(scope.row)"
            size="small"
            >案件详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="新增案件">
    <el-form ref="ruleFormRef" :model="addCaseform">
      <el-form-item label="选择日期" :label-width="120" required>
        <el-date-picker
          v-model="addCaseform.caseDate"
          type="date"
          placeholder="选择开始日期"
        />
      </el-form-item>
      <el-form-item label="案件名称" :label-width="120" required>
        <el-input
          v-model="addCaseform.caseName"
          placeholder="请输入案件名"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="案件详情" :label-width="120" required>
        <el-input
          v-model="addCaseform.caseDescribe"
          :rows="2"
          type="textarea"
          placeholder="请描述案件"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addCaseformCanael(ruleFormRef)">取消提交</el-button>
        <el-button type="primary" @click="addCaseformConfirm(ruleFormRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogStreamFormVisible" title="新增调单数据">
    <el-form ref="ruleStreamRef" :model="addStreamform">
      <el-form-item label="请选择调单类型" :label-width="150" required>
        <el-select
          v-model="addStreamform.flowType"
          placeholder="请选择调单类型"
        >
          <el-option
            v-for="item in optionsType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件" :label-width="120" required>
        <input
          type="file"
          class="upload"
          ref="fileInput"
          @change="handleFileChange"
        />
      </el-form-item>
      <el-form-item label="目标表" :label-width="120" required>
        <el-input
          v-model="addStreamform.targetTable"
          placeholder="请输入表名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addStreamformCanael(ruleStreamRef)"
          >取消提交</el-button
        >
        <el-button type="primary" @click="addStreamformConfirm(ruleStreamRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// vue3写法
import { reactive, ref, onMounted } from "vue";
import { getCasesList, casesOperate, streamOperate } from "../../api/case";
import utils from "../../utils/utils";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
// 添加案件节点
const ruleFormRef = ref(null);

// 案件列表
const tableData = ref([]);

/**
 * 查询所有案件列表
 */
const getDeptList = async () => {
  const list = await getCasesList();
  tableData.value = [...list];
};

// 控制案件添加弹窗显示隐藏
const dialogFormVisible = ref(false);
const openDialog = () => {
  dialogFormVisible.value = true;
};

// 定义案件字段
const addCaseform = reactive({
  caseDate: "",
  caseName: "",
  caseDescribe: "",
});

// 选择时间不能小于今天
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};

// 取消提交
const addCaseformCanael = (ruleFormRef) => {
  if (!addCaseform) return;
  ruleFormRef.resetFields();
  addCaseform.caseDate = "";
  addCaseform.caseName = "";
  addCaseform.caseDescribe = "";
  dialogFormVisible.value = false;
};

// 提交表单案件
const addCaseformConfirm = async (ruleFormRef) => {
  if (addCaseform) {
    let data = { ...addCaseform, action: "create" };

    let caseDate = utils.fomateDate(data.caseDate, "yyyy-MM-dd");
    delete data.caseDate;
    console.log("caseDate", caseDate);
    let params = { caseDate, ...data };
    await casesOperate(params);
    ruleFormRef.resetFields();
    addCaseform.caseDate = "";
    addCaseform.caseName = "";
    addCaseform.caseDescribe = "";
    dialogFormVisible.value = false;
    getDeptList();
  } else {
    return;
  }
};

// 跳转到案件详情
const caseDetails = (caseItem) => {
  router.push("/system/cases/caseDetails");
};

// 控制添加流水弹窗
const dialogStreamFormVisible = ref(false);

// 定义表的选择类型
const optionsType = ref([
  {
    value: "1",
    label: "交易流水信息",
  },
  {
    value: "2",
    label: "人员账号信息",
  },
  {
    value: "3",
    label: "人员信息",
  },
]);

// 定义流水数据结构
const addStreamform = reactive({
  caseName: "",
  flowType: "",
  targetTable: "",
  selectedFile: null,
});

const handleClick = (item) => {
  addStreamform.caseName = item.caseName;
  console.log("item", item.caseName);
  dialogStreamFormVisible.value = true;
};

// 上传文件到浏览器
const handleFileChange = (event) => {
  addStreamform.selectedFile = event.target.files[0];
};

//取消调单数据提交
const addStreamformCanael = () => {
  addStreamform.caseName = "";
  addStreamform.flowType = "";
  addStreamform.selectedFile = null;
  addStreamform.targetTable = "";
  const fileInput = document.querySelector(".upload");
  if (fileInput) {
    fileInput.value = "";
  }
  dialogStreamFormVisible.value = false;
};

// 提交调单数据
const addStreamformConfirm = async () => {
  if (addStreamform) {
    const formData = new FormData();
    formData.append("caseName", addStreamform.caseName);
    formData.append("flowType", addStreamform.flowType);
    formData.append("file", addStreamform.selectedFile);
    formData.append("targetTable", addStreamform.targetTable);
    const res = await streamOperate(formData);
    console.log("res", res);
    if (res.message === "添加成功") {
      addStreamform.caseName = "";
      addStreamform.flowType = "";
      addStreamform.selectedFile = null;
      addStreamform.targetTable = "";
      const fileInput = document.querySelector(".upload");
      if (fileInput.value) {
        fileInput.value = "";
      }
      dialogStreamFormVisible.value = false;
      ElMessage.success("添加成功");
    } else {
      ElMessage.warning("操作失败");
    }
  } else {
    ElMessage.warning("请重新添加");
    return;
  }
};

onMounted(() => {
  getDeptList();
});
</script>
  <style  lang="scss" scoped>
.economicInvestigation {
  display: flex;
  flex-direction: column;
  height: 90vh;
  // overflow: hidden;
  background-color: #fff;
  padding: 20px;
}
</style>