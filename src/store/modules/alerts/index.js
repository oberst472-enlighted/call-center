export default {
    namespaced: true,
    state: {
        alerts: []
    },
    mutations: {
        ADD_ALERT(state, item) {
            let val = () => {
                if (item.length === 1 && item[0] === 'positive') {
                    return 'Действие прошло успешно'
                }
                else if (item.length === 1 && item[0] === 'negative') {
                    return 'Возникла системная ошибка, перезагрузите страницу и повторите действие'
                }
                else {
                    return item[1]
                }
            }
            state.alerts.push({ status: item[0], value: val, id: Date.now() })
        },
        DELETE_ALERT(state) {
            state.alerts.splice(0, 1)
        }
    },
}

