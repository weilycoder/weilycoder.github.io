hexo.extend.filter.register('before_generate', function () {
  const now = new Date();
  const buildTime = now.toISOString(); // 获取 UTC 时间并存储为 ISO 格式
  hexo.config.build_time = buildTime;
});