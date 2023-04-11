sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"kna/yabf/opensoitemszyabfosoli/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("kna.yabf.opensoitemszyabfosoli.controller.App", {
		formatter: formatter,
		onInit: function() {},

		onBeforeRebindTable: function(oEvent) {
			//add custom filter order to smart
			var mBindingParams = oEvent.getParameter("bindingParams"),
				//order type filter 
				oOpenOrdersRadio = this.getView().byId("idOrderType"),
				orderType = oOpenOrdersRadio.getSelectedButton().getText().toLowerCase(),
				orderTypeFilter;
			if (orderType === "open so only") {
				orderTypeFilter = new sap.ui.model.Filter("OPENSO", sap.ui.model.FilterOperator.EQ, "X");
			} else if (orderType === "open delivery only") {
				orderTypeFilter = new sap.ui.model.Filter("OPENDELV", sap.ui.model.FilterOperator.EQ, "X");
			} else {
				orderTypeFilter = new sap.ui.model.Filter("ALLOPENORD", sap.ui.model.FilterOperator.EQ, "X");
			}

			mBindingParams.filters.push(orderTypeFilter);

			//power unit filter
			var oPowerUnitRadio = this.getView().byId("idPowerUnit"),
				powerUnit = oPowerUnitRadio.getSelectedButton().getText().toLowerCase(),
				powerUnitFilter;
			if (powerUnit === "power unit orders") {
				powerUnitFilter = new sap.ui.model.Filter("PUOCB", sap.ui.model.FilterOperator.EQ, "X");
			} else if (powerUnit === "non power unit orders") {
				powerUnitFilter = new sap.ui.model.Filter("NPUCB", sap.ui.model.FilterOperator.EQ, "X");
			} else {
				powerUnitFilter = new sap.ui.model.Filter("ALLCB", sap.ui.model.FilterOperator.EQ, "X");
			}

			mBindingParams.filters.push(powerUnitFilter);
		},

		onPressSalesOrderNumber: function(oEvent) {
			//navigate to GUI tcode VA02 

			var salesOrderNumber = oEvent.getSource().getProperty("text");
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			var hashUrl = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "ZVA02",
					action: "display"
				},
				params: {
					"SalesOrderNumber": salesOrderNumber
				}
			}));
			
			sap.m.URLHelper.redirect(window.location.href.split("#")[0] + hashUrl, true);
		},
		onPressPlant: function(oEvent) {
			//navigate to GUI tcode MD04 

			var plant = oEvent.getSource().getProperty("text");
			plant = decodeURIComponent(plant);
			var materialNo = oEvent.getSource().getParent().getBindingContext().sPath.split("MATNR=")[1].split(")")[0].split("'")[1];
			materialNo = decodeURIComponent(materialNo);
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			var hashUrl = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "ZMD04",
					action: "display"
				},
				params: {
					"Plant": plant,
					"MaterialNo": materialNo
				}
			}));
		
			sap.m.URLHelper.redirect(window.location.href.split("#")[0] + decodeURIComponent(hashUrl), true);
		},

		onPressMaterialNumber: function(oEvent) {
			//navigate to GUI tcode ME2M  

			var materialNo = oEvent.getSource().getProperty("text");
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			var hashUrl = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "ZME2M",
					action: "display"
				},
				params: {
					"MaterialNo": materialNo
				}
			}));

			sap.m.URLHelper.redirect(window.location.href.split("#")[0] + hashUrl, true);
		}

	});
});