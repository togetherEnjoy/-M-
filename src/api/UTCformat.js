export function UTCformat(t = '') {

    return t.split('T')[0].replace(/\-/g, '.')
}

export function goTime(start, end) {
    return Math.abs(new Date(end).getTime() - new Date(start).getTime()) 
}