sap.ui.define([], function() {
	"use strict";

	return {
		requestedDeliveryDate: function(rDate) {

			if (rDate) {
				var date = rDate.getUTCDate().toString(),
					month = (rDate.getUTCMonth() + 1).toString(),
					year = rDate.getUTCFullYear();
				while (date.length < 2) {
					date = "0" + date;
				}
				while (month.length < 2) {
					month = "0" + month;
				}
				return month + "." + date + "." + year;
			}
		}
	};
});