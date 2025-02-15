var total = 0;
var order = 0;
function calculate(next){
	var opts = {
		method: 'GET',      
		headers: {}
	};
	fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset='+next, opts).then(function (response) {
		return response.json();
	})
	.then(function (body) {
		var next_offset = body.data.next_offset;
		if(next_offset >= 0){
			for (let [key, value] of Object.entries(body.data.details_list)) {
				var total_temp = value.info_card.final_total / 100000;

                var date = 'no date';
                var time = 'no time';
                var ctime = "";

                if (value.shipping.tracking_info) {                
                    ctime = value.shipping.tracking_info.ctime;
                    date = new Date(ctime * 1000).toLocaleDateString("en-US")
                    time = new Date(ctime * 1000).toLocaleTimeString("en-US")
                }
                
				total += total_temp;
				order++;
                // console.log(order + ";", 'value', value);
	    		console.log(order + ";", "RM;" + total_temp + ";", ctime + ";", date + " " + time + ";", value.info_card.order_list_cards[0].items[0].name);
			}
			calculate(next_offset);
		} else {
			console.log('Calculation completed!;');
			console.log('GRAND TOTAL; RM ' + Math.round(total * 100) / 100);
		}
	});
}
calculate(0);
