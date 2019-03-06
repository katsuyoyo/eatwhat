Page({
  data: {
    qdDialog: {
      show: false, //是否显示
      contentCode: "菜单编号",
      contentName: "菜单名称",
      title: "新增菜单",
      buttonsShowVertical: true,//按钮横排还是竖排
      showinput: false,//是否显示输入框
      imgsrc: "../images/timg.jpg",//图片显示
      buttons: [  //按钮内容
        { text: '取消', color: "#ff8427", types: 1 },
        { text: '确定', color: "#ff8427", types: 2 }
      ]
    },
    listData: [{
        "foodId": "1.0",
        "foodName": "麻婆豆腐"
      },
      {
        "foodId": "02",
        "foodName": "千页豆腐"
      },
      {
        "foodId": "03",
        "foodName": "鸡胗豆腐"
      }
    ]
  },

  //弹出的自定义内容方法
  openDialog: function () {
    let qdDialog = this.data.qdDialog;
    qdDialog.show = true;
    // qdDialog.content = '菜单名称';
    qdDialog.buttons = [{ text: '关闭', color: "#ff8427", types: 2 }];
    this.setData({ qdDialog: qdDialog })
  },

  //关闭弹框
  closeDialog: function () {
    let qdDialog = this.data.qdDialog;
    qdDialog.show = false;
    qdDialog.buttons = [];
    this.setData({ qdDialog: qdDialog })
  },

  formCode: function (e) {
    var _this =this;
    this.setData({
      menuCode: e.detail.value
    });
  },

  formName: function (e) {
    this.setData({
      formName: e.detail.value
    });
  },

  onLoad: function() {
    var _this = this;
    _this.listData = [];
    wx.request({
      url: 'http://127.0.0.1:8080/eat/test/list',
      data: {},
      method: 'GET',
      success: function (res) {
        _this.setData({
          listData:res.data.data
        })
        // for (var i = 0; i < res.data.data.length; i++) {
        //   var rowContent = {};
        //   rowContent.foodId = res.data.data[i].foodId;
        //   rowContent.foodName = res.data.data[i].foodName ? res.data.data[i].foodName : '';
        //   _this.listData.push(rowContent);
        // }
      }
    })
  },
  deleteMenu: function(e) {
    //取到food值
    var _this = this;
    let foodid = e.currentTarget.dataset.foodid;
    let foodname = e.currentTarget.dataset.foodname;
    wx.request({
      // url: 'http://115.159.209.80:8080/eat/test/del',
      url: 'http://127.0.0.1:8080/eat/test/del',
      data: {
        foodName: foodname
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          _this.onLoad();
      }
    })
  },
  submitDialog:function(e) {
    //取到food值
    var _this = this;
    wx.request({
      // url: 'http://115.159.209.80:8080/eat/test/add',
      url: 'http://127.0.0.1:8080/eat/test/add',
      data: {
        foodId: _this.data.menuCode,
        foodName: _this.data.formName
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          _this.onLoad();
          _this.closeDialog();
      }
    })
  }
})