import "./css/index.scss";
const fn = () => {
  return 10;
};
console.log(fn());
const pro = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve();
  }, 2000);
});
console.log(pro);
