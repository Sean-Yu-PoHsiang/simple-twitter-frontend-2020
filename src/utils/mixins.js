import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      return dateTime ? moment(dateTime).fromNow() : '-'
    }
  }
}
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://i.imgur.com/S4PE66O.png'
    }
  }
}