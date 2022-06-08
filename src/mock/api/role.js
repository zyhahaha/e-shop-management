import Mock from 'mockjs';
const Random = Mock.Random

function generatorRoleItem () {
    return {
        id: Random.id(),
        roleName: Random.cname(),
        roleDescription: Random.csentence(),
        createDate: Random.date(),
        status: Random.integer(0, 1)
    }
}

export default [
    {
        path: '/api/role/list',
        method: 'post',
        handle ({ body }) {
            let dataList = []
            for (let i = 1; i <= body.pageSize; i++) {
                dataList.push(generatorRoleItem())
            }
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
    }, {
        path: '/api/role/all',
        method: 'post',
        handle ({ body }) {
            let dataList = []
            for (let i = 1; i <= Random.integer(2, 10); i++) {
                dataList.push(generatorRoleItem())
            }
            return {
                code: 0,
                msg: 'success',
                data: {
                    dataList
                }
            }
        }
    }, {
        path: '/api/role/add',
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
        path: '/api/role/edit',
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
        path: '/api/role/update/status',
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
        path: '/api/role/delete',
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
