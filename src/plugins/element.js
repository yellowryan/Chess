import Vue from 'vue'
import {
  Avatar,
  Dialog,
  Menu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Option,
  OptionGroup,
  Button,
  Popover,
  Form,
  FormItem,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Card,
  Carousel,
  CarouselItem,
  Container,
  Header,
  Aside,
  Main,
  Divider,
  Image,
  MessageBox,
  Message,
  Notification,
  Drawer
} from 'element-ui';

Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Menu);
Vue.use(MenuItem)
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Slider);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Avatar)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// import 'element-ui/lib/theme-chalk/index.css';