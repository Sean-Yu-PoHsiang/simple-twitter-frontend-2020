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
export const emptyCoverFilter = {
  filters: {
    emptyCover(src) {
      return src || 'https://i.imgur.com/K6Azg87.png'
    }
  }
}