<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchPhone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getContactsList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showAddContactDialog">添加联系人</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="contactsList" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showUpdateContactDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteContact(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="添加联系人" :visible.sync="addContactVisible">
      <el-form :model="addContactForm">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="addContactForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="addContactForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addContactForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContactVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddContact">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑联系人" :visible.sync="editContactVisible">
      <el-form :model="editContactForm">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="editContactForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="editContactForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editContactForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editContactVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditContact">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchName: '',
      searchPhone: '',
      contactsList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      addContactVisible: false,
      editContactVisible: false,
      addContactForm: {
        name: '',
        address: '',
        phone: ''
      },
      editContactForm: {
        id: null,
        name: '',
        address: '',
        phone: ''
      }
    };
  },
  methods: {
    getContactsList() {
      let params = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        name: this.searchName,
        phone: this.searchPhone
      };
      this.$axios.get('/user/contacts/page', { params: params })
        .then(response => {
          this.contactsList = response.data.data.rows;
          this.total = response.data.data.total;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getContactsList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getContactsList();
    },
    showAddContactDialog() {
      this.addContactVisible = true;
    },
    submitAddContact() {
      this.$axios.post('/user/contacts/add', this.addContactForm)
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success(response.data.msg);
            this.getContactsList();
            this.addContactVisible = false;
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },
    showUpdateContactDialog(row) {
      this.editContactForm = { ...row };
      this.editContactVisible = true;
    },
    submitEditContact() {
      this.$axios.post('/user/contacts/update', this.editContactForm)
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success(response.data.msg);
            this.getContactsList();
            this.editContactVisible = false;
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },
    deleteContact(id) {
      this.$confirm('此操作将永久删除该联系人, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/user/contacts/delate', { params: { id } })
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success(response.data.msg);
              this.getContactsList();
            } else {
              this.$message.error(response.data.msg);
            }
          });
      });
    }
  },
  mounted() {
    this.getContactsList();
  }
}
</script>
