const jsonServer = require('json-server');
const auth = require('json-server-auth');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);
app.use(auth); // Apply authentication middleware
app.use(router);

app.listen(3000, () => {
  console.log('JSON Server with Auth is running');
});
