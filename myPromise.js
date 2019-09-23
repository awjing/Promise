// 设计模式、算法   原理、底层   经验   node如webpack、vue-cli、中间层
// promise
// 回调函数里面执行resolve - then方法把回掉加入resolveArr


// then注册一个任务回调
// resolve触发执行then注册的函数
function isFunction (fn) {
  if(typeof fn === 'function'){
    return true;
  }else{
    return false
  }
}
Function.prototype.bind = function(context){
  var self = this;
  return function(){
    // call明确参数的个数
    // apply不确定参数的个数
    self.apply(context, arguments)
  }
}
function mypromise(handle){
  this.status = 'PENDING'
  this.val = undefined
  this.resolveArr = []
  this.rejectArr = []
  this.resolve = function(value){
    if (this.status !== 'PENDING') return
    this.status = 'RESOLVE'
    this.val = value
    var cb
    setTimeout(() => {
      while (cb = this.resolveArr.shift()){
        cb()
      }
    })
  }
  this.reject = function(err){
    if (this.status !== 'PENDING') return
    this.status = 'REJECT'
    this.val = err
  }
  try {
    handle(this.resolve.bind(this), this.reject.bind(this))
  } catch (err) {
    throw err;
  }
}

mypromise.prototype.then = function(suc, err){
  var val = this.val;
  var status = this.status;
  return new mypromise((resolve, reject) => {
    var _fn = undefined;
    var _handle = undefined;
    var run = function () {
      try{
        if (!isFunction(suc)){
          _fn(suc)
        }else{
          let res = _handle(val)
          resolve(res)
        }
      }catch(err){
        reject(err);
      }
    }
    switch (status) {
      case "PENDING": 
        this.resolveArr.push(suc);
        this.rejectArr.push(suc);
        break;
      case "RESOLVE": 
        _fn = resolve
        _handle = suc
        run()
        break;
      case "REJECT": 
        _fn = reject
        _handle = err
        run()
        break;
    }
  })
}

new mypromise(function(resolve, reject){
  reject(456);
  resolve(123);
}).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})
