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
export const contentLengthFilter = {
  filters: {
    contentToLong(src) {
      return src.length <= 50 ? src : src.slice(0, 49) + "..."

      // let string = ''
      // let input = src.split(' ')
      // if (input.length < 50) { return src }
      // else {
      //   string = input[0]
      //   for (let i = 1; i < 50; i++) {
      //     string = string + " " + input[i]
      //   }
      //   string = string + '...'
      // }
      // return string
    }
  }
}