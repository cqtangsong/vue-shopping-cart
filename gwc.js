var List=new Vue({
  el:'#page-list',
  data:{
    cate_index:0,//分类下标
    filter_index:0,//筛选项下标
    price_isAsc:false,//价格是否升序
     cate:[
      {id:0,des:'推荐'},
      {id:1,des:'母婴'},
      {id:2,des:'饰品'},
      {id:3,des:'食品'},
      {id:4,des:'家电'},
      {id:5,des:'百货'}
     ],
     sortMethods:[
      {name:'综合排序', method:'setList'},
      {name:'销量优先', method:'sortSales'},
      {name:'价格',     method:'sortPrice'}
     ],
     goods:[{
            id: 1001,
            name: 'Beats EP头戴式耳机',
            price: 558,
            type: 4,
            stock: 128,
            sales: 1872,
            img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
        }, {
            id: 1002,
            name: '雀巢（Nestle）高钙成人奶粉',
            price: 60,
            type: 3,
            stock: 5,
            sales: 2374,
            img: 'http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp'
        }, {
            id: 1003,
            name: '煎炒烹炸一锅多用',
            price: 216,
            type: 5,
            stock: 2,
            sales: 351,
            ishot: true,
            img: 'http://gw.alicdn.com/tps/TB19OfQRXXXXXbmXXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
            id: 1004,
            name: 'ANNE KLEIN 潮流经典美式轻奢',
            price: 585,
            type: 2,
            stock: 465,
            sales: 8191,
            img: 'http://gw.alicdn.com/tps/TB1l5psQVXXXXcXaXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
            id: 1005,
            name: '乐高EV3机器人积木玩具',
            price: 3099,
            type: 1,
            stock: 154,
            sales: 165,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t6490/168/1052550216/653858/9eef28d1/594922a8Nc3afa743.jpg!q50.jpg'
        }, {
            id: 1006,
            name: '全球购 路易威登（Louis Vuitton）新款女士LV印花手袋 M41112',
            price: 10967,
            type: 2,
            stock: 12,
            sales: 6,
            img: 'https://m.360buyimg.com/n1/s220x220_jfs/t1429/17/1007119837/464370/310392f4/55b5e5bfN75daf703.png!q70.jpg'
        }, {
            id: 1007,
            name: 'Kindle Paperwhite3 黑色经典版电纸书',
            price: 805,
            type: 4,
            stock: 3,
            sales: 395,
            img: 'http://img12.360buyimg.com/n1/s528x528_jfs/t4954/76/635213328/51972/ec4a3c3c/58e5f717N4031d162.jpg!q70.jpg'
        }, {
            id: 1008,
            name: 'DELSEY 男士双肩背包',
            price: 269,
            type: 2,
            stock: 18,
            sales: 69,
            ishot: true,
            img: 'http://gw.alicdn.com/tps/LB1HL0mQVXXXXbzXVXXXXXXXXXX.png'
        }, {
            id: 1009,
            name: '荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g',
            price: 89,
            type: 1,
            stock: 36,
            sales: 1895,
            img: 'http://m.360buyimg.com/babel/s330x330_jfs/t4597/175/4364374663/125149/4fbbaf21/590d4f5aN0467dc26.jpg!q50.jpg.webp'
        }, {
            id: 1010,
            name: '【全球购】越南acecook河粉牛肉河粉特产 速食即食方便面粉丝 牛肉河粉米粉65克*5袋',
            price: 19.9,
            type: 3,
            stock: 353,
            sales: 3041,
            ishot: true,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3169/228/5426689121/95568/d463e211/586dbf56N37fcd503.jpg!q50.jpg'
        }, {
            id: 1011,
            name: '正品FENDI/芬迪女包钱包女长款 百搭真皮钱夹 女士小怪兽手拿包',
            price: 3580,
            type: 2,
            stock: 5,
            sales: 18,
            img: 'http://img.alicdn.com/imgextra/i3/TB16avCQXXXXXcsXpXXXXXXXXXX_!!0-item_pic.jpg_400x400q60s30.jpg_.webp'
        }],
        list:[]
  },
  created:function(){    
    this.setList()
  },

  methods:{
    //设置商品列表
    setList:function(){
         var self=this;
         this.list=this.goods.filter(function(item){
               return self.cate_index!==0 ? item.type===self.cate_index:item
         });
    },
    //切换分类项
         toggleCate: function (index) {
            this.cate_index = index;
            // 分类操作
            this.setList();
            // 价格排序状态保持不变
            var filterIndex = this.filter_index;
            (filterIndex === 2) && (this.price_isAsc = !this.price_isAsc);
            // 商品排序
            this.sortBy(this.sortMethods[filterIndex].method);
           
        },
    /**
         * 根据属性值进行升序或降序的比较器
         * @method 属性比较器
         * @param {String} prop 属性名
         * @param {String} type 排序方法 (desc: 降序, asc: 升序)
         */
    compare:function(prop,type){
       type=type||'desc';
       var flag1,flag2;
       if(type==='desc'){
           flag1=-1;
           flag2=1;
       }else if(type==='asc'){
          flag1=1;
          flag2=-1;
       }
       return function(obj1,obj2){
         var val1=obj1[prop],
             val2=obj2[prop];
             if(val1<val2){
                return flag2;
             }else if(val1>val2){
                return flag1;
             }else{
                return 0;
             }
       }
    },
      sortSales:function(){       //按销量排序
        this.list.sort(this.compare('sales'));
       },

        /**
         * @method 按价格排序
         */
        sortPrice: function () {
            var type = this.price_isAsc ? 'desc' : 'asc';
            this.list.sort(this.compare('price', type));
            this.price_isAsc = !this.price_isAsc;
        },

        /**
         * @method 排序调度器
         * @param {String} method 方法名
         */
        sortBy: function (method) {
            this.filter_index = this.sortMethods.findIndex(function(item) {
                return item.method === method;
            });
            method = method || 'setList';
            //method !== 'sortPrice' && (this.price_isAsc = false);
            this[method]();
        },
    addToCart:function(goods){            //添加到购物车
           var alreadyindex=Cart.cart.findIndex(function(item,index){
                 return item.id===goods.id;
           });
           //不存在则添加
           if(alreadyindex===-1){
            var cartIndex=Cart.cart.length;
            Cart.cart.push(goods);
            Cart.$set(Cart.cart[cartIndex],'quantity',1);
            Cart.$set(Cart.cart[cartIndex],'subtotal',goods.price.toFixed(1));
            Cart.$set(Cart.cart[cartIndex],'checked',false);
            Cart.checkAllflag=false;//新增不能全选
            return ;
           } 
           //如果商品已存在
           var alreadygoods=Cart.cart[alreadyindex];
           var num=alreadygoods.quantity,
               stock=alreadygoods.stock;
            if(num<stock){
                Cart.$set(alreadygoods,'quantity',++alreadygoods.quantity);
                Cart.$set(alreadygoods,'subtotal',(alreadygoods.price*alreadygoods.quantity).toFixed(1));
            }
           
    }
  }
});


var Cart= new Vue({
  el: '#page-cart',
  data:{
      checkAllflag:false,//是否全选标志
      selectednum:0,
      delflag: false,
      cart:localStorage.todo?JSON.parse(localStorage.todo):[]
  },
watch:{
    cart: {
    handler:function(cart){
        localStorage.todo=JSON.stringify(this.cart)
    },
    deep:true
   }
   },
  methods:{
    //增减商品和库存数量
        Changeq:function(isadd,item){
              var num=item.quantity,
                  stock=item.stock;
             if(isadd&&num<stock){
                this.$set(item,'quantity',++num);
             }
             else if(!isadd&&num>1){
                this.$set(item,'quantity',--num);
             }
             this.$set(item,'subtotal',(item.price*num).toFixed(1));
        },
        //选择商品
        selectGoods:function(item){
            //商品 状态值取反，并根据状态值对selectedNum进行加减
            item.checked=!item.checked;
            item.checked ? ++this.selectednum : --this.selectednum;
            //如果全部选中，则全选图标也默认全选
            this.selectednum===this.cart.length ? this.checkAllflag=true:this.checkAllflag=false;
        },
        //全选
        checkAll:function(){
             var self=this;
            //全选状态值取反
             this.checkAllflag=!this.checkAllflag;
             this.cart.forEach(function(item){
                  if(self.checkAllflag){
                    item.checked=true;
                     self.selectednum=self.cart.length;
                  }else{
                    item.checked=false;
                    self.selectednum=0;
                  }
             });
        },
        toggledelbtn:function(){  //编辑删除按钮
            this.delflag=!this.delflag;
        },
        delgoods:function(){
          var cart=this.cart;
          this.cart=cart.filter(function(item){
              return !item.checked;
          });
          //重置 被选商品数量、全选状态、删除状态
          this.selectednum=0;
          this.checkAllflag=false;
          this.delflag=!this.delflag;
        }
  },
  computed:{
  totalPrice:function(){  //实时计算已选商品总额
      var num=0;
      this.cart.forEach(function(item){
        if(item.checked){
            num+= parseFloat(item.subtotal);
        }
      });
      return num;
  }
  }
});