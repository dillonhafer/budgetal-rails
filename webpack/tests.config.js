var context = require.context('./../app/frontend', true, /-test\.jsx?$/);
context.keys().forEach(context);
