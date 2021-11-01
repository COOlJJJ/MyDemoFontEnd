<template>
  <div>
    <h1>Excel demo</h1>
    <span
      ><el-button type="primary" @click="importExcel">导入Excel</el-button
      ><el-button type="info" @click="exportExcel">导出Excel</el-button></span
    >
    <!-- 用户列表区域 border边框线 stripe斑马线 type="index"索引列-->
    <el-table :data="userlist" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile_phone"></el-table-column>
    </el-table>
    <!-- @size-change事件绑定  layout界面组件 取当前页和每页显示条数来取对应的数据-->
    <el-pagination
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      :page-sizes="[1, 2, 5, 10]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog
      title="上传Excel"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        :auto-upload="false"
        action="http://localhost:5000/api/Tools/ImportExcel"
        accept=".xls,.xlsx"
        :file-list="fileList"
        :on-change="fileChange"
        :on-remove="handleRemove"
        :headers="headers"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadFail"
      >
        <i class="el-icon-upload"></i>
        <div style="width: 100%">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: { "Authorization": window.sessionStorage.getItem('RoleId') },
      //文件列表
      fileList: [],
      dialogVisible: false,
      queryInfo: {
        pagenum: '1',
        pagesize: '10'
      },
      Total: '1',
      userlist: []
    }
  },
  methods: {
    //提示通知
    open(title, text) {
      const h = this.$createElement;
      var msg = text
      var name = title
      this.$notify({
        title: name,
        message: h('i', { style: 'color: teal' }, msg)
      });
    },
    //导入Excel
    async importExcel() {
      this.dialogVisible = true
    },
    //提交Excel
    async submitExcel() {
      //手动提交
      if (this.fileList.length <= 0) {
        return this.open("提示", "请先选择需要上传的文件！")
      }
      this.$refs.upload.submit();
      this.dialogVisible = false
    },
    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    fileChange(file, fileList) {
      //解决无法判断el-upload是否上传过文件问题
      this.fileList = fileList;
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.fileList = [];
    },
    //文件上传服务端成功时的钩子
    fileUploadSuccess(response, file, fileList) {
      //清空已上传的文件列表
      this.$refs.upload.clearFiles();
      this.fileList = []
      if (response.status === 200) {
        this.dialogVisible = false;
        this.$message({
          message: response.msg,
          type: "success"
        });
        this.userlist = response.response 
      } else {
        this.$message.error("Excel导入失败");
      }
    },
    //导出Excel
    exportExcel() {
      this.$http({
        url: 'Tools/ExportExcel',
        responseType: 'blob',
        method: 'post'
      }).then(response => {
        let url = window.URL.createObjectURL(response.data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = 'sheet.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      })
    }
  }
}
</script>

<style scpoe>
.el-upload-dragger {
  width: 500px;
}
</style>