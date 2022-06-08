import Mock from 'mockjs';
const Random = Mock.Random

function generatorStaffItem () {
    const avatarColor = Random.color()
    const avatarContent = Random.word(1)
    return {
        id: Random.id(),
        staffName: Random.cname(),
        avatar: Random.image('100x100', avatarColor, avatarContent),
        account: Random.word(8),
        contactType: Random.county(true),
        createDate: Random.date(),
        status: Random.integer(0, 1)
    }
}
export default [
    {
        path: '/api/staff/list',
        method: 'post',
        handle ({ body }) {
            let dataList = []
            for (let i = 1; i <= body.pageSize; i++) {
                dataList.push(generatorStaffItem())
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
    }, {
        path: '/api/staff/add',
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
        path: '/api/staff/edit',
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
        path: '/api/staff/update/status',
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
        path: '/api/staff/delete',
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
        path: '/api/staff/relation',
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
