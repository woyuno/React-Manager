import { message } from 'antd'

export default {
  success(msg: string) {
    return message.open({
      type: 'success',
      content: msg,
    })
  },
  error(msg: string) {
    return message.open({
      type: 'error',
      content: msg,
    })
  },
}
