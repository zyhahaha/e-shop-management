import Vue from 'vue'
import ConfirmDialog from './index.vue'

const ConfirmDialogConstructor = Vue.extend(ConfirmDialog)
const instance = new ConfirmDialogConstructor()

instance.$mount()

function onUpdateVisibleEvent (dialogVisible) {
    // console.log('xxxxxxx', dialogVisible)
    if (dialogVisible) {
        instance._open()
    } else {
        instance._close()
        instance.$nextTick(() => {
            // 移除实例的所有监听，再重新监听visible的事件
            instance.$off()
            instance.$on('update:modalVisible', onUpdateVisibleEvent)
        })
    }
}
instance.$on('update:modalVisible', onUpdateVisibleEvent)

document.body.appendChild(instance.$el)

export default function install () {
    Vue.prototype.$iConfirmDialog = instance
}
