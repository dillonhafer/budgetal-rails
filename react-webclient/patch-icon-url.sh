#!/usr/bin/env bash
sed -i -e 's/https:\/\/at.alicdn.com\/t\/font_.*/\/fonts\/iconfont";/g' node_modules/antd/lib/style/themes/default.less
