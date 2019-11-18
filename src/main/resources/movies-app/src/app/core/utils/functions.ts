export let getFrenchDate = date => {
    function pad(s) { 
        return (s < 10) ? '0' + s : s; 
    }
    var d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

export let parse = dateStr => {
    const dateParts = dateStr.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
}