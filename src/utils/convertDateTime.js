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
