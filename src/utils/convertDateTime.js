export const convertHMSToSeconds = s => {
    let b = s.split(':')
    return b[0] * 3600 + b[1] * 60 + (+b[2] || 0)
}

export const convertSecondsToHMS = hms => {
    const z = n => (n < 10 ? '0' : '') + n
    let sign = hms < 0 ? '-' : ''
    let c = Math.abs(hms)
    // eslint-disable-next-line no-bitwise
    return sign + z(c / 3600 | 0) + ':' + z((c % 3600) / 60 | 0) + ':' + z(c % 60)
}

export const convertSecondsToDate = (time, name = 's') => {
    const val = name === 'ms' ? +time : (+time * 1000)
    return new Date(val).toLocaleDateString('ru-RU')
}
export const convertSecondsToTime = (time, name = 's') => {
    const val = name === 'ms' ? +time : (+time * 1000)
    return new Date(val).toLocaleTimeString('ru-RU')
}

//конвертировать время из секунд UTC в своем часовом поясе
export const convertSecondsToTimeTimeZone = time => {
    const timeZoneTime = new Date().getTimezoneOffset()
    let sec = timeZoneTime * 60
    let ms = (time - sec) * 1000
    return new Date(ms).toLocaleTimeString()
}

export const convertSecondsUTCToSecondsMyZone = time => {
    const timeZoneTime = new Date().getTimezoneOffset()
    let sec = timeZoneTime * 60
    return time - sec
}
// export const convertDateToSeconds = (time, name = 'ms') => {
//     const val = name === 'ms' ? time : (time * 1000)
//     return new Date(val).toLocaleDateString('ru-RU')
// }
