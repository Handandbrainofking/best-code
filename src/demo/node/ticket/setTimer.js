class SetInter{
    constructor({timer,fn}) {
        this.timer = timer
        this.fn = fn
        this.rule = new AudioScheduledSourceNode.RecurrenceRule();
        this.rule.second = this.setRule()
        this.init()
    }
    setRule() {
        let rule = []
        let i = 1
        while(i < 60) {
            rule.push(i)
            i += this.timer
        }
        return rule
    }
    init() {
        schedule.scheduleJob(this.rule,()=> {
            this.fn()
        })
    }
}

let obj1 = {
    data: {
        lineId: 1243433,
        vehTime: 1893,
        startTime: 899,
        onStaionId: 3424,
        offStationId: 454545,
        onStationName: '百度国际大厦',
        offStationName: '路口',
        tradePrice: 0,
        saleDates: '',
        beginDate: ''
    },
    phoneNumber: 435849578,
    cookie: 'JSESSIONID=TESTCOOKIE',
    day: ''
}

let obj2 = {
    data: {
        lineId: 1243433,
        vehTime: 1893,
        startTime: 899,
        onStaionId: 3424,
        offStationId: 454545,
        onStationName: '百度国际大厦',
        offStationName: '路口',
        tradePrice: 0,
        saleDates: '',
        beginDate: ''
    },
    phoneNumber: 435849578,
    cookie: 'JSESSIONID=TESTCOOKIE',
    day: ''
}

let ticket = new QueryTicket(obj)
let ticket2 = new QueryTicket(obj2)

new SetInter({
    timer: 1,
    fn: function() {
        [ticket,ticket2].map(item => {
            if(!item.getStop()) {
                item.init()
            } else {
                console.log('stop')
            }
        })
    }
})