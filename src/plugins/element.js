import Vue from "vue";
import {
  Button,
  Checkbox,
  Container,
  Main,
  Aside,
  Header,
  Menu,
  MenuItem,
  Submenu,
  RadioGroup,
  RadioButton,
  Row,
  Col,
  Card,
  Message,
  MessageBox,
  CheckboxGroup,
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Pagination,
  Switch,
  Dialog
} from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Dialog);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
