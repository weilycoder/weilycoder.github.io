hexo.extend.filter.register('before_generate', function () {
  const moment = require('moment');
  hexo.config.build_time = moment().format('YYYY-MM-DD HH:mm:ss');
});