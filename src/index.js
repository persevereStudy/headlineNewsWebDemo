import dva from 'dva';
import './index.css';
const app = dva();//这部分是用来做dva初始化的部分

// 2. Plugins
// app.use({});//这个是用来加载插件的

// 3. Model
// app.model(require('./models/example').default);//这个是用来接收你发送的action的

// 4. Router
app.router(require('./router').default); //在这里面 进行你所有页面的初始化路由设置

// 5. Start
app.start('#root');

