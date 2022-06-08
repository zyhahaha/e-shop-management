import Mock from 'mockjs';
const Random = Mock.Random

function generatorMerchantItem () {
    return {
        id: Random.id(),
        name: Random.cname(),
        type: Random.word(5),
        account: Random.word(8),
        date: Random.date(),
        contractStatus: Random.integer(0, 1),
        storeCount: Random.integer(10, 100)
        // status: Random.integer(0, 1)
    }
}
function generatorStoreItem () {
    return {
        id: Random.id(),
        name: Random.cword(8),
        platform: Random.word(5),
        person: Random.cname(8),
        address: Random.email(),
        status: Random.integer(0, 4)
    }
}
export default [
    {
        path: '/api/merchant/list',
        method: 'post',
        handle ({ body }) {
            let dataList = []
            for (let i = 1; i <= body.pageSize; i++) {
                dataList.push(generatorMerchantItem())
            }
            // console.log('xxxx', dataList, body)
            return {
                code: 0,
                msg: 'success',
                data: {
                    dataList,
                    pagination: {
                        current: body.currentPage,
                        pageSize: body.pageSize,
                        total: 30
                    }
                }
            }
        }
    },
    {
        path: '/api/merchant/store/list',
        method: 'post',
        handle ({ body }) {
            let dataList = []
            for (let i = 1; i <= body.pageSize; i++) {
                dataList.push(generatorStoreItem())
            }
            return {
                code: 0,
                msg: 'success',
                data: {
                    dataList,
                    pagination: {
                        current: body.currentPage,
                        pageSize: body.pageSize,
                        total: 60
                    }
                }
            }
        }
    },
    {
        path: '/api/merchant/contract/update',
        method: 'post',
        handle ({ body }) {
            return {
                code: 0,
                msg: 'success',
                data: {
                    status: 0
                }
            }
        }
    }, {
        path: '/api/merchant/store/buy',
        method: 'post',
        handle ({ body }) {
            return {
                code: 0,
                msg: 'success',
                data: {
                    status: 0
                }
            }
        }
    }, {
        path: '/api/merchant/store/update/status',
        method: 'post',
        handle ({ body }) {
            return {
                code: 0,
                msg: 'success',
                data: {
                    status: 0
                }
            }
        }
    }
]
