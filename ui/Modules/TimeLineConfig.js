import moment from 'moment'

module.exports = class TimeLineConfig {

    initialGroups = [];
    initialItems = [];


    options = {
        height: '400px',
        autoResize: true,
        stack: true, // false == overlap items
        orientation: 'top',
        verticalScroll: true,
        editable: true,
        zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 5,
    }

    constructor(ref) {
        this.ref = ref;
        this.initItems();
    }


    getTimeline() {
        return this.ref.current.timeline;
    }

    getOptions() {
        return this.ref.current.timeline.options;
    }

    reload() {
        this.getTimeline().fit();
    }

    setLocale(locale = 'fa') {
        this.locale = locale;

        if (locale === 'fa') {
            this.getTimeline().setOptions({
                rtl: true,
                locales: {
                    fa: {
                        current: 'الان',
                        time: 'زمان',
                        deleteSelected: 'حذف انتخاب شده',
                    },
                },
                locale: 'fa',
                format: {
                    minorLabels: {
                        millisecond: 'SSS',
                        second: 's',
                        minute: 'HH:mm',
                        hour: 'HH:mm',
                        weekday: 'ddd jD',
                        day: 'jD',
                        week: 'w',
                        month: 'jMMMM',
                        year: 'jYYYY'
                    },
                    majorLabels: {
                        millisecond: 'HH:mm:ss',
                        second: 'jD jMMMM HH:mm',
                        minute: 'ddd jD jMMMM',
                        hour: 'ddd jD jMMMM',
                        weekday: 'jMMMM jYYYY',
                        day: 'jMMMM / jYYYY',
                        week: 'jMMMM jYYYY',
                        month: 'jYYYY',
                        year: ''
                    }
                }
            });


        } else {
            this.getTimeline().setOptions({rtl: false});

        }

        this.getTimeline().redraw();

    }


    addItem(id, groupId, name, startTime) {
        return {
            id: id,
            group: groupId,
            content: 'item ' + id + ' <span style="color:#97B0F8">(' + name + ')</span>',
            start: startTime,
            end: startTime.clone().add(1, 'hours'),
            type: 'box'
        };
    }

    getProps = () => {
        return {
            initialGroups: this.initialGroups,
            initialItems: this.initialItems,
            options: this.options
        }
    }

    initItems() {
        const names = ['هلند', 'چین', 'کانادا', 'ایران'];
        for (let g = 0; g < names.length; g++) {
            this.initialGroups.push({id: g, content: names[g]});
        }

        const now = moment().minutes(0).seconds(0).milliseconds(0);

        for (let i = 0; i < 20; i++) {
            const start = now.clone().add(Math.random() * 200, 'hours');
            const group = Math.floor(Math.random() * 4);
            this.initialItems.push(this.addItem(i, group, names[group], start));
        }
    }


    getStartDate() {
        let date = data.reduce(function (a, b) {
            return a.start < b.start ? a : b;
        }).start;


        return moment(date).locale('en').add(-1, 'month').format('YYYY-MM-DD');
    }

    getEndDate() {
        let date = data.reduce(function (a, b) {
            return a.start > b.start ? a : b;
        }).start;

        return moment(date).locale('en').add(1, 'month').format('YYYY-MM-DD');
    }


}

