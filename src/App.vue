<template>
  <div>你好</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const Fn = function () {
      this.name = "张三";
    };
    Fn.prototype.age = 10;
    const f1 = new Fn();
    console.dir(Fn);
    console.dir(f1);
  },
  methods: {
    dd() {},
  },
};
</script>
