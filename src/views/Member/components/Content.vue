<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
        </div>

        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="title" label="标题" width="140"></el-table-column>
            <el-table-column prop="content" label="内容" width="120"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="操作"  width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
                    <el-popconfirm
                        class="ml-5"
                        confirm-button-text='确定'
                        cancel-button-text='我再想想'
                        icon="el-icon-info"
                        icon-color="red"
                        title="您确定删除吗？"
                        @confirm="del(scope.row.id)"
                    >
                        <el-button type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog title="教材信息" :visible.sync="dialogFormVisible" width="40%" >
            <el-form label-width="80px" size="small">
                <el-form-item label="标题">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" :rows="9" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="编辑时间">
                    <el-date-picker v-model="form.time" type="datetime" value-format="yyyy-MM-dd HH:mm" autocomplete="off"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Content",
    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 5,
            name: "",
            editor: "",
            cbs: "",
            other: "",
            form: {},
            roles: [],
            dialogFormVisible: false,
            multipleSelection: []
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            this.request.get("/notice/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name,
                    // email: this.email,
                    // address: this.address,
                }
            }).then(res => {
                console.log(res)
                this.tableData = res.records
                this.total = res.total
            })

            this.request.get("/role").then(res => {
                this.roles = res
            })
        },
        save() {
            this.request.post("/notice", this.form).then(res => {
                if (res) {
                    this.$message.success("保存成功")
                    this.dialogFormVisible = false
                    this.load()
                } else {
                    this.$message.error("保存失败")
                }
            })
        },
        handleAdd() {
            this.dialogFormVisible = true
            this.form = {}
        },
        handleEdit(row) {
            this.form = row
            this.dialogFormVisible = true
        },
        del(id) {
            this.request.delete("/notice/" + id).then(res => {
                if (res) {
                    this.$message.success("删除成功")
                    this.load()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val
        },
        delBatch() {
            let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
            this.request.post("/notice/del/batch", ids).then(res => {
                if (res) {
                    this.$message.success("批量删除成功")
                    this.load()
                } else {
                    this.$message.error("批量删除失败")
                }
            })
        },
        reset() {
            this.name = ""
            // this.email = ""
            // this.address = ""
            this.load()
        },
        handleSizeChange(pageSize) {
            console.log(pageSize)
            this.pageSize = pageSize
            this.load()
        },
        handleCurrentChange(pageNum) {
            console.log(pageNum)
            this.pageNum = pageNum
            this.load()
        },
    }
}
</script>

<style>
.headerBg {
    background: #eee!important;
}
</style>
<template>

</template>

<style scoped>

</style>