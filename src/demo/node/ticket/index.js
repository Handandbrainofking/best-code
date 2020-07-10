class QueryTicket {
	constructor({ data, phoneNumber, cookie, day }) {
        //constructor
        this.data =data
        this.phoneNumber = phoneNumber
        this.cookie = cookie
        this.day = day
	}
	//初始化
	async init() {
		let ticketList = await this.handleQueryTicket();
		if (ticketList.length) {
			let resParse = await this.handleBuyTicket(ticketList);
		}
	}
	//查询余票逻辑
	async handleQueryTicket() {}
	//购票相关逻辑
	async handleBuyTicket(ticketList) {
		let year = new Date.getFullYear();
		let month = new Date.getMonth() + 1;
		let {
			onStationName,
			offStationName,
			lineId,
			vehTime,
			startTime,
			onStationId,
			offStationId
		} = this.data;
		let station = `${onStationName}-${offStationName}`;
		let dateStr = '';
		let tickAmount = '';
		ticketList.forEach(item => {
			dateStr = dateStr + `${year}-${month}-${item.day}`;
			tickAmount = tickAmount + `${item.ticketLeft}`;
		});

		let buyTicket = {
			lineId,
			vehTime,
			startTime,
			onStationId,
			offStationId,
			tradePrice: '5',
			saleDates: dateStr.slice(0, -1),
			payType: '2'
		};

		let data = querystring.stringify(buyTicket);
		let res = await this.requestOrder(data);

		//把发短信的数据都要传入
		return Object.assign({}, JSON.parse(res.data), {
			queryParam: {
				dateStr,
				tickAmount,
				startTime,
				station
			}
		});
	}
	requestOrder(obj) {
		axios.post(
			'htt://weixin.xxx.net/ebus/front/wxQueryController.do?BcTicketBuy',
			obj,
			{
				heades: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'User-Agent':
						'Mozilla/5.0(iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebkit/600.1.4 (KHTML, like Gecko) Mobile/12A365 MicroMessenger/5.4.1 NetType/WIFI',
					Cookie: this.cookie
				}
			}
		);
	}
	handleInfoUser() {
		let {
			returnCode,
			returnData: {
				main: { lineName, tradePrice }
			},
			queryParam: { dateStr, tickAmount, startTime, station }
        } = parseData;
        if(returnCode === '500') {
            let res = await this.sendMSG({
                dateStr,
                tickAmount: tickAmount.slice(0,-1),
                station,
                lineName,
                tradePrice,
                startTime,
                phoneNumber: this.phoneNumber
            })
            if(res.result === 0 && res.errmsg === 'OK') {
                this.setStop(true)
            } else {
                console.log(res.errmsg)
            }
        } else {
            //失败不做任何操作
            console.log(resParse['returnInfo'])
        }
	}
	sendMSG() {
        let {dateStr, tickAmount, station, lineName, phoneNumber, startTime, tradePrice} = obj
        let appid  = 140034324
        let appkey = 'asdfdsvajwienin234493nadsnzxc'
        let templateId = 7829
        let smsSign = '测试短信'
        let qcloundsms = QcloudSms(appid,appkey)
        let ssender = qcloundsms.SmsSingleSender()
        let params = [dateStr, station,lineName, startTime, tickAmount,tradePrice]
        return new Promise((resolve,reject) => {
            ssender.sendWithParam(86, phoneNumber, templateId,params,smsSign, '','', function(err,res,resData) {
                if(err) {
                    reject(err)
                } else {
                    resolve(resData)
                }
            })
        })
    }
}
