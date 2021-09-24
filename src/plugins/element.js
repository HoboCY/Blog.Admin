import Vue from 'vue'
import { Button, Checkbox } from 'element-ui'
import { Container } from 'element-ui'
import { Main } from 'element-ui'
import { Aside } from 'element-ui'
import { Header } from 'element-ui'
import { Menu } from 'element-ui'
import { MenuItem } from 'element-ui'
import { RadioGroup } from 'element-ui'
import { RadioButton } from 'element-ui'
import { Row } from 'element-ui'
import { Col } from 'element-ui'
import { Card } from 'element-ui'
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
import { CheckboxGroup } from 'element-ui'
import { Input } from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Input)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
