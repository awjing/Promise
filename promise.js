new Promise(function(resolve, reject){
  return reject(456);
}).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})

// promise 微任务
// setTimeout 宏任务

// setTimeout(function(){
//   console.log('set1')
//   new Promise(function(resolve, reject){
//     console.log('promise2')
//     resolve(2)
//   }).then(function(resolve, reject){
//     console.log('then2')
//   })
//   // 加到宏任务队列
// })
// var p1 = new Promise(function(resolve, reject){
//   console.log('promise1')
//   resolve(2)
// })
// setTimeout(function(){
//   console.log('set2')
//   // 加到宏任务队列
// })
// p1.then(function(){
//   console.log('then1')
//   // 加到微任务队列
// })
// console.log(2)
