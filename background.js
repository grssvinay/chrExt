const runScript = () => {
	const trs = Array.from(document.querySelectorAll('.ui.tablet.stackable.celled.padded.table tbody tr'));
	trs.forEach(function(row) {
		const dtElem = row.querySelector('td:nth-child(4) a');
		const parsedDt = Date.parse(dtElem.text);
		const dt = isNaN(parsedDt) ? getDate(dtElem) : new Date(parsedDt);

		const now = new Date();
		const acType = row.querySelector('td:nth-child(1)').textContent;

		const isVehicle = acType.indexOf('ehicle') !== -1;
		const isInFuture = now.getTime() < dt.getTime();
		const isInPast = dt.getTime() < now.getTime();

		if (isInPast || isVehicle)
			row.style.display = 'none';
	});
};

const getDate = input => {
	const dtx = input.text;

	const getMonthFromString = mon => {
		const d = Date.parse(mon + "1, 2012");
		return isNaN(d) ? -1 : new Date(d).getMonth(); 
	}

	const da = dtx.split(",").map(a => a.trim().split(" ")).flat();

	const response = new Date();
	response.setDate(parseInt(da[1].substring(0, da[1].length - 2)));
	response.setMonth(getMonthFromString(da[0]));
	response.setFullYear(parseInt(parseInt(da[2])));

	const tim = da[da.length - 1];
	const mer = tim.substring(tim.length - 2);
	let hrs = parseInt(tim.split(":")[0]);
	hrs = mer === 'pm' ? hrs + 12 : hrs;
	const mins = parseInt(tim.split(":")[1].substring(0, 2));

	response.setHours(hrs);
	response.setMinutes(mins);
	response.setSeconds(0);
	return response;
}


console.log("Started");
runScript();

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// 	console.log('triggered');
// 	if (changeInfo.status == 'complete' && tab.active) {
// 		console.log('if triggered');
// 		runScript();
// 	}
// })