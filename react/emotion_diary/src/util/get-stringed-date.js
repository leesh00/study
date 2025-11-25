export const getStringedDate = (targetDate) => {
    let y = targetDate.getFullYear();
    let m = targetDate.getMonth() + 1;
    let d = targetDate.getDate();

    if (m < 10) {
        m = `0${m}`
    }
    if (d < 10) {
        d = `0${d}`
    }
    return `${y}-${m}-${d}`;
}