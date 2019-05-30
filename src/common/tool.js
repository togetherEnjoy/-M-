export function firstCode(str) {
    return str.substr(0, 1)
}

export function getMonthDays(year, month) {
    var stratDate = new Date(year, month - 1, 1),
        endData = new Date(year, month, 1);
    var days = (endData - stratDate) / (1000 * 60 * 60 * 24);
    return days;
}


export function getYearMD(t) {
    return t.getFullYear() + '-' + t.getMonth() + 1 + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes()
}