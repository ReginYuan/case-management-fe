<template>
  <div class="welcome">
    <el-row class="mb-4">
      <el-button @click="openDialog" type="primary">新增案件</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%" height="100%">
      <el-table-column fixed prop="caseDate" label="案件日期" width="150" />
      <el-table-column prop="caseName" label="案件名称" width="120" />
      <el-table-column prop="caseDescribe" label="案件描述" />
      <!-- <el-table-column fixed="right" label="操作" width="auto">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
  <el-dialog :ref="addCaseform" v-model="dialogFormVisible" title="新增案件">
    <el-form :model="addCaseform">
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
        <el-button @click="addCaseformCanael">取消提交</el-button>
        <el-button type="primary" @click="addCaseformConfirm"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="js">
// vue3写法
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { getCasesList, casesOperate } from "../api/case";
import moment from 'moment'
//   获取Composition API 上下文对象
const { ctx } = getCurrentInstance();

const handleClick = () => {
  console.log("click");
};

const tableData = reactive([]);

/**
 * 查询所有案件列表
 */
const getDeptList = async () => {
  const list = await getCasesList();
  tableData.value = tableData.push(...list);
};

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
  return time.getTime() > Date.now();
};



// 取消提交
const addCaseformCanael = () => {
  dialogFormVisible.value = false;
};

// 提交表单案件
const addCaseformConfirm = async () => {
  if (!addCaseform) return;
  if (addCaseform) {
    let data = { ...addCaseform, action: "create" };
    let caseDate = moment(data.caseDate).format('YYYY-MM-DD')
    delete data.caseDate;
    let params = { caseDate, ...data};
    await casesOperate(params);
    getDeptList();
    dialogFormVisible.value = false;
  } else {
  }
};

onMounted(() => {
  getDeptList();
});
</script>
<style  lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  padding: 20px;
}
</style>