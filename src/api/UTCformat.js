export function UTCformat(t='') {
    
    return t.split('T')[0]
}

export function goTime(start, end) {
      return Math.abs(Date.parse(UTCformat(end))-Date.parse(UTCformat(start)))
}