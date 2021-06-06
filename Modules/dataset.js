import moment from 'moment'

let data = [
    {id: 2, content: 'مهد کودک', start: '2021-01-20'},
    {id: 1, content: 'تولد', start: '2021-01-18'},
    {id: 3, content: 'ابتدایی', start: '2021-01-21'},
    {id: 4, content: 'نگارش کتاب', start: '2021-01-22', end: '2021-01-26'},
    {id: 5, content: 'جایزه اسکار', start: '2021-01-27', type: 'point'},
    {id: 6, content: 'مرگ', start: '2021-01-30'},
    {
        id: 7,
        content: 'آزمایشی',
        start: '2021-02-19'
    }
];


function getStartDate() {
    let date = data.reduce(function (a, b) {
        return a.start < b.start ? a : b;
    }).start;


    return moment(date).locale('en').add(-1, 'month').format('YYYY-MM-DD');
}

function getEndDate() {
    let date = data.reduce(function (a, b) {
        return a.start > b.start ? a : b;
    }).start;

    return moment(date).locale('en').add(1, 'month').format('YYYY-MM-DD');
}

function getData(){
    return data;
}

export default {
    data: getData(),
    end_date: getEndDate(),
    start_date: getStartDate()
}

