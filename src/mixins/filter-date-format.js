import formatDate from '@/libs/format-date'
export default {
    filters: {
        filterDateFormat: function (date, formatType) {
            if (!date) return ''
            return formatDate(date, formatType)
        }
    }
}
