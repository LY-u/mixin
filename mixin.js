let paginationMixin = {
  data: function () {
    return {
      // 请求数据
      params: { page: 0, size: 10 },
      // 其他请求数据
      param: {  },
      // 显示数据
      pager:{
        page: 0,        // 当前页数
        total: 0,       // 数据总数
        count: 1,       // 总页数
      },
      // 数据体
      list: [],
      // 进行状态
      pending: false,
    }
  },
  computed: {
    hasNext() {
      return this.pager.page < this.pager.count
    },
    loadText() {
      return this.hasNext ? '加载更多' : '已经最后了'
    }
  },
  methods: {
    // 请求逻辑
    page(idx) {
      if (this.pending) {
        // 如果正处在请求状态则退出
        return ''
      }
      this.params.page = idx || this.pager.page       // 没有传参则取当前页数
      if (this._page) {
        this.pending = true                           // 状态为 队列中

        // 请求体
        this._page().then(res => {
          // console.log('mixin _page res:',res)
          this.pending = false                        // 状态为 空闲
          // 页码相关
          this.pager = {
            page: res.PageIndex,
            total: res.RecordCount,
            count: res.PageCount,
          }
          // 数据体
          this.onData(res.List)
          this.backData(res)
        }).catch(e=>{
          console.log(e)
          this.$message.error(e.message||'请求错误')
        })
      }
    },
    backData(data) {
      // 返回所有响应数据
    },
    onData(data) {
      // 返回主要响应数据体
      console.log('default onData from mixin')
    },
    _page() {
      // 具体请求业务
      console.log('default _page from mixin')
      return Promise.resolve({ PageIndex: 1, RecordCount: 0, PageCount: 1 })
    },
    next() {
      // 请求下一页
      if (this.hasNext) {
        this.page(this.pager.page + 1)
      }
    },
  },
}

export default paginationMixin