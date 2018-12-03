<template>
  <div class="temp">
    <div class="filter">
      <div class="line clearfix">
        <div class="bar">
          <el-input v-model="title" size='middle' placeholder="请输入您要搜索的关键词" style="width:500px" maxlength='50'/>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="bar fr">
          <el-button type="primary">新增Banner位</el-button>
        </div>
      </div>
      <div class="line p3 clearfix">
        <div class="bar">
          <el-radio-group v-model="status" @change="changeStatus">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">待启用</el-radio>
            <el-radio :label="3">下架</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="list"
        stripe
        :header-cell-style='{textAlign:"center"}'
        v-loading="loading"
        style="width: 100%">
        <el-table-column prop="Id" label="编号" width="100"/>
        
        <el-table-column label="操作" fixed='right'>
          <template slot-scope="scope">
            <el-button @click="editBanner(scope.row,scope.$index)" type="text" size="small" style='margin-right:10px'>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pager.page"
        :page-sizes="[10, 20, 50]"
        :page-size="pager.size"
        :total="pager.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

  </div>  
</template>

<script>

import mixin from '@/util/mixin'

export default {
  
  mixins:[mixin],
  data() {
    return {
      title:'',
      status: 0,      // 状态 0全部 1启用 2待启用 3下架

      list:[],

      loading:false,

    };
  },
  methods:{
    search(){
      let filter = {
        Title : this.title,
        Status: this.status
      }
      // console.log(filter)
      this.param = filter
      this.page(1)
    },
    changeStatus(){
      this.param.Status = this.status
      this.page(1)
    },
    // 当前页改变
    currentChange(e){
      this.page(e)
    },
    // 每页条数改变
    sizeChange(e){
      this.params.size = e
      this.page(1)
    },
    // 返回的数据处理
    onData (data) {
      this.loading = false
      console.log('component data',data)
      if(!data) return this.list = [];
      this.list = data.map(i=>{
        // 。。。
        return i
      })
    },
    // 定义请求
    _page () {
      this.loading = true
      return api.getBannerList({
        PageIndex: this.params.page,
        PageSize: this.params.size,
        ...this.param,
      })
    },
  },
  mounted(){
    this.page(1)
  },
};
</script>
