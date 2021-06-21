sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast",
	"../formatter",
	"sap/ui/model/Sorter"
], function (Controller, JSONModel, Filter, FilterOperator, exportLibrary, Spreadsheet, MessageToast, formatter, Sorter) {
	"use strict";

	var EdmType = exportLibrary.EdmType;

	return Controller.extend("my.Test.controller.App", {
		formatter: formatter,
		onInit: function () {

			// //	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1

			var oModelState = new JSONModel("https://cdn-api.co-vin.in/api/v2/admin/location/states");
			this.getView().byId("combo1").setModel(oModelState);
			// this.getView().byId("combo1").setValue("");
			// var that = this;
			// $.ajax("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
			// 	type: 'GET',
			// 	success: function (data) {
			// 		// 
			// 		that.getOwnerComponent().getModel("local").setProperty("/states", data.states);
			// 	},
			// 	error: function (oErr) {
			// 		// 
			// 	}
			// });

			this.byId("combo1").setSelectedKey(null);
			// this.onSelectRB();
			this.byId("seg").setSelectedKey("dis");
			this.onSelectSegment();
			// this.getView().byId("DP1").setValue(this.onGetDate());
			// this.getView().byId("comboCentre").setVisible(false);
			this.bDescending = true;

			this.byId("DP1").setMinDate(new Date()).setValue(this.onGetDPDate());

			// if (this.byId("seg").getSelectedKey() === "dis") {
			// 	this.getView().byId("chknext").setVisible(false);

			// }

		},

		onGetDPDate: function () {
			var date;
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = String(today.getFullYear());

			var yy = yyyy.substr(2, 2);

			date = mm + "/" + dd + "/" + yy;
			return date;
		},

		_fnGroup: function (oContext) {
			var avalibility = oContext.getProperty("available_capacity");

			return {
				key: avalibility
					// text: available_capacity
			};
		},

		fnApplyFiltersAndOrdering: function (oEvent) {
			var aSorters1 = [];
			// var aSorters2 = [];

			if (this.getView().byId("chknext").getSelected() === false) {
				aSorters1.push(new Sorter("available_capacity", this.bDescending));
				this.byId("table1").getBinding("items").sort(aSorters1);
			}
			// else {
			// 	this.bDescending = false;
			// 	aSorters2.push(new Sorter("date", this.bDescending));
			// 	this.byId("table2").getBinding("items").sort(aSorters2);
			// }
		},

		onSelectCheckbox: function (oEvent) {

			var filterArray = [];

			var oFilter;

			var oSegmentedButton = this.byId('seg').getSelectedKey();

			if ((oSegmentedButton === "pin" || oSegmentedButton === "dis") && (this.getView().byId("chknext").getSelected() === false)) {

				var oBinding = this.getView().byId("table1").getBinding("items");
				oBinding.filter([]);
			} else if (this.getView().byId("chknext").getSelected()) {
				var oBindingNew = this.getView().byId("table2").getBinding("items");
				// var oBinding1 = this.getView().byId("centertable").getBinding("items");
				// var oBinding2 = this.getView().byId("centertable1").getBinding("items");
				// var oBinding3 = this.getView().byId("centertable3").getBinding("items");
				// var oBinding4 = this.getView().byId("centertable4").getBinding("items");
				// var oBinding5 = this.getView().byId("centertable5").getBinding("items");
				// var oBinding6 = this.getView().byId("centertable6").getBinding("items");
				// var oBinding7 = this.getView().byId("centertable7").getBinding("items");
				// var oBinding8 = this.getView().byId("centertable8").getBinding("items");
				// var oBinding9 = this.getView().byId("centertable9").getBinding("items");
				oBindingNew.filter([]);
				// oBinding1.filter([]);
				// oBinding2.filter([]);
				// oBinding3.filter([]);
				// oBinding4.filter([]);
				// oBinding5.filter([]);
				// oBinding6.filter([]);
				// oBinding7.filter([]);
				// oBinding8.filter([]);
				// oBinding9.filter([]);

			}

			var sQuery = this.getView().byId("Search").getValue();
			if (sQuery) {
				oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, sQuery);
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chknext").getSelected()) {
				sQuery = this.getView().byId("Search1").getValue();
				if (sQuery) {
					oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, sQuery);
					filterArray.push(oFilter);
				}
			}

			if (this.getView().byId("chk18").getSelected()) {
				oFilter = new sap.ui.model.Filter("min_age_limit", "EQ", "18");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chk45").getSelected()) {
				oFilter = new sap.ui.model.Filter("min_age_limit", "EQ", "45");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkcovaxin").getSelected()) {
				oFilter = new sap.ui.model.Filter("vaccine", "EQ", "COVAXIN");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkcovishield").getSelected()) {
				oFilter = new sap.ui.model.Filter("vaccine", "EQ", "COVISHIELD");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chksputnik").getSelected()) {
				oFilter = new sap.ui.model.Filter("vaccine", "EQ", "SPUTNIK");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkfree").getSelected()) {
				oFilter = new sap.ui.model.Filter("fee_type", "EQ", "Free");
				filterArray.push(oFilter);
			}

			if (this.getView().byId("chkpaid").getSelected()) {
				oFilter = new sap.ui.model.Filter("fee_type", "EQ", "Paid");
				filterArray.push(oFilter);
			}
			if (this.getView().byId("chkdose1").getSelected()) {
				oFilter = new sap.ui.model.Filter("available_capacity_dose1", "NE", "0");
				filterArray.push(oFilter);
			}
			if (this.getView().byId("chkdose2").getSelected()) {
				oFilter = new sap.ui.model.Filter("available_capacity_dose2", "NE", "0");
				filterArray.push(oFilter);
			}

			oFilter = new sap.ui.model.Filter("available_capacity", "NE", "0");
			filterArray.push(oFilter);

			if (this.getView().byId("chknext").getSelected() === false) {

				oBinding.filter(filterArray);
			} else if (this.getView().byId("chknext").getSelected()) {
				oBindingNew.filter(filterArray);
				// oBinding1.filter(filterArray);
				// oBinding2.filter(filterArray);
				// oBinding3.filter(filterArray);
				// oBinding4.filter(filterArray);
				// oBinding5.filter(filterArray);
				// oBinding6.filter(filterArray);
				// oBinding7.filter(filterArray);
				// oBinding8.filter(filterArray);
				// oBinding9.filter(filterArray);

			}

		},

		onCheckFuture: function (oEvent) {

			if (this.getView().byId("chknext").getSelected()) {
				// this.getView().byId("comboCentre").setVisible(true);
				this.getView().byId("DP1").setVisible(false);
				this.getView().byId("search").setText("Search Future Availibility");

			} else {

				// this.getView().byId("comboCentre").setVisible(false);
				this.getView().byId("DP1").setVisible(true);
				this.getView().byId("search").setText("Search");
			}

			// this.getView().byId("centertable").setVisible(false);

			this.getView().byId("table1").setVisible(false);
			this.getView().byId("table2").setVisible(false);

			var tableArr = [];
			// var tableData = this.getView().byId("centertable");
			// tableData.setModel(tableArr[0]);
			// tableData.destroyItems(null);

			var tableData = this.getView().byId("table1");
			tableData.setModel(tableArr[0]);
			tableData.destroyItems(null);

			tableData = this.getView().byId("table2");
			tableData.setModel(tableArr[0]);
			tableData.destroyItems(null);

			// tableData = this.getView().byId("centertable1");
			// tableData.setModel(tableArr[0]);
			// tableData.destroyItems(null);

		},

		onButtonPress: function (oEvent) {
			window.open("https://selfregistration.cowin.gov.in/", "_blank");
		},

		onSearch: function (oEvent) {
			var tableArray = [];

			var DP1 = this.getView().byId("DP1")._getInputValue();

			var oSegmentedButton = this.byId("seg").getSelectedKey();

			if (oSegmentedButton === "dis") {

				var stateSelected = this.getView().byId("combo1").getSelectedKey();
				var districtSelected = this.getView().byId("comboDistrict").getSelectedKey();
			}

			// if (this.getView().byId("chknext").getSelected()) {
			// 	var centerSelected = this.getView().byId("comboCentre").getSelectedKey();
			// }

			if (oSegmentedButton === "pin") {
				var pincode = this.getView().byId("pin").getValue();
			}

			var msg;

			if (oSegmentedButton === "dis") {
				if (districtSelected === '' && stateSelected === '') {
					msg = "Please fill State and District";
				} else if (stateSelected === '') {
					msg = "Please fill State";

				} else if (districtSelected === '') {
					msg = "Please fill District";
				}

				if (msg !== '' && msg !== undefined) {
					MessageToast.show(msg);
					return;
				}

			}

			if (oSegmentedButton === "pin") {
				if (pincode === '') {
					msg = "Please fill PinCode";
				}

				if (msg !== '' && msg !== undefined) {
					MessageToast.show(msg);
					return;
				}

			}

			if (this.getView().byId("chknext").getSelected() === false) {

				if (DP1 === '') {
					msg = "Please fill date";
				}

				if (msg !== '' && msg !== undefined) {
					MessageToast.show(msg);
					return;
				}

			}

			// if (this.getView().byId("chknext").getSelected()) {
			// 	if (centerSelected === "") {
			// 		msg = "Please fill centre";
			// 		MessageToast.show(msg);
			// 		return;
			// 	}
			// }

			function getDate(that, n) {

				var sDate = that.getView().byId("DP1").getDateValue();
				var today = new Date(sDate);
				today.setDate(today.getDate() + n);
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				if (dd < 10) {
					dd = '0' + dd;
				}
				if (mm < 10) {
					mm = '0' + mm;
				}
				today = dd + '-' + mm + '-' + yyyy;

				return today;
			}

			if ((districtSelected != '') || (pincode != '')) {

				if (this.getView().byId("chknext").getSelected() === false) {
					if (oSegmentedButton === "dis") {

						var sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + districtSelected +
							"&date=" +
							getDate(this, 0);

					} else if (oSegmentedButton === "pin") {

						sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + getDate(this,
							0);

					}
				}

				if ((oSegmentedButton === "dis" || oSegmentedButton === "pin") && this.getView().byId("chknext").getSelected() === false) {

					var oPinModel = new JSONModel(sPath);
					tableArray.push(oPinModel);
					//Bind the data to the table
					var table = this.getView().byId("table1");
					table.setModel(tableArray[0]);
					this.getView().byId("table1").setVisible(true);
					// this.getView().byId("centertable").setVisible(false);
					this.getView().byId("table2").setVisible(false);
				}

				if (this.getView().byId("chknext").getSelected()) {
					//---------------------------------------------------------------------------------------------//
					// // test 
					var JSONQuery = [];
					// var indicator;
					var arr = {
						centers: []
					};
					var that = this;
					var n = 1;
					var p = 0;

					// var oData = {
					// 	centers: {
					// 		centerid: "",
					// 		name: "",
					// 		address:""

					// 	}
					// };

					var ctr = [];
					var date1;
					// var     cntr ={

					// 	    name: "",
					// 	    address: "",
					// 	    available_capacity: "",
					// 	    fee_type : "",
					// 	     block_name: "", 
					// 	     district_name: "",
					// 	     state_name: "",
					// 	     pincode: "",
					// 	     date:"",
					// 	     vaccine:"",
					// 	     available_capacity_dose1: "",
					// 	     available_capacity_dose2: "",
					// 	     min_age_limit:""

					// 	};

					do {

						if (oSegmentedButton === "pin") {

							sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pincode + "&date=" +
								getDate(this, n);
						} else if (oSegmentedButton === "dis") {

							sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + districtSelected +
								"&date=" +
								getDate(this, n);
						}

						// sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=" + centerSelected + "&date=" +
						// getDate(this, n);
						$.ajax(sPath, {
							type: "GET",
							success: function (data) {
								// var oModelState = new JSONModel();

								// JSONQuery = data;
								// JSONQuery.centers.setData(data.centers);
								// Object.assign(oData, data.centers);

								// JSONQuery = data.centers;
								p = p + 1;

								for (var i = 0; i < data.centers.length; i++) {
									//JSONQuery.push(data.centers[i]);

									for (var j = 0; j < data.centers[i].sessions.length; j++) {

										var cntr = {

											name: "",
											address: "",
											available_capacity: "",
											fee_type: "",
											block_name: "",
											district_name: "",
											state_name: "",
											pincode: "",
											date: new Date(),
											vaccine: "",
											available_capacity_dose1: "",
											available_capacity_dose2: "",
											min_age_limit: ""

										};

										cntr.name = data.centers[i].name;
										cntr.address = data.centers[i].address;
										cntr.fee_type = data.centers[i].fee_type;
										cntr.block_name = data.centers[i].block_name;
										cntr.district_name = data.centers[i].district_name;
										cntr.state_name = data.centers[i].state_name;
										cntr.pincode = data.centers[i].pincode;

										cntr.available_capacity = data.centers[i].sessions[j].available_capacity;
										cntr.available_capacity_dose1 = data.centers[i].sessions[j].available_capacity_dose1;
										cntr.available_capacity_dose2 = data.centers[i].sessions[j].available_capacity_dose2;
										// cntr.date = data.centers[i].sessions[j].date;
										// date1 = ("\'" + data.centers[i].sessions[j].date.substr(3, 2) + "/" +
										// 	data.centers[i].sessions[j].date.substr(0, 2) + "/" +
										// 	data.centers[i].sessions[j].date.substr(6, 4) + "\'");

										// cntr.date = new Date(parseInt(date1));
										// date1 = new Date(date1);

										// cntr.date = new Intl.DateTimeFormat('en-IN').format(date1);

										cntr.date = (data.centers[i].sessions[j].date.substr(3, 2) + "/" +
											data.centers[i].sessions[j].date.substr(0, 2) + "/" +
											data.centers[i].sessions[j].date.substr(6, 4));

										cntr.vaccine = data.centers[i].sessions[j].vaccine;
										cntr.min_age_limit = data.centers[i].sessions[j].min_age_limit;

										ctr.push(cntr);

										//arr.centers.push(cntr);
									}

								}

								if (p === 8) {

									// $.extend(arr, ctr);
									//that.getOwnerComponent().getModel("local").setProperty("/centreData", arr.centers);
									// that.getView().byId("table2").setVisible(true);

									// ctr.sort(function (a, b) {
									// 	return parseFloat(a.date) - parseFloat(b.date);
									// });

									ctr.sort(function (a, b) {
										var dateA = new Date(a.date),
											dateB = new Date(b.date);
										return dateA - dateB;
									});

									that.getOwnerComponent().getModel("local").setProperty("/centreData", ctr);

									that.onSelectCheckbox();
									// if (oSegmentedButton !== "available") {
									that.fnApplyFiltersAndOrdering();

									var ocontact_data_Model = new sap.ui.model.json.JSONModel();
									ocontact_data_Model.setData("local");
									ocontact_data_Model.setSizeLimit(20000); //Size Limit 

									// 						var tt = [];
									// 							var testing= new JSONModel(ctr);
									// 							tt.push(testing);

									// 							var tablenew = that.getView().byId("testing");
									// tablenew.setModel(tableArray[0], "local");

								}

								// 			// jQuery.each(data, function (index, item) {
								// 			//now you can access properties using dot notation
								// 			// var test = item.centers; 

								// 			for (var i = 0; i < data.centers.sessions.length; i++) {

								// 				if (data.centers.sessions[i].available_capacity != 0) {
								// 					indicator = true;

								// 				}

								// 			}
								// 			// oModelState.setData(item);

								// 			// tableArray.push(oModelState);
								// 			//Bind the data to the table
								// 			// var table = that.getView().byId("centertable");
								// 			// table.setModel(tableArray[0], "local");

								// 			// });

								// 			// JSONQuery.topBlock.sessions.total = 50;
								// 			if (indicator === true) {
								// that.getOwnerComponent().getModel("local").setProperty("/centreData", JSONQuery);

								// 				that.onSelectCheckbox();

							}
						});

						// 		},
						// 		error: function (oErr) {

						// 			// MessageToast.show("Failed to Load Data");
						// 			var name = 'test';
						// 		}

						// 	});

						n = n + 7;

						// 	if (indicator === true) {
						// 		break;
						// 	}

					}
					while (n < 56);

					// this.getView().byId("table1").setVisible(false);
					// this.getView().byId("centertable").setVisible(true);

					//----------------------------------------------------------------------------//

					// var i = 0;
					// do {
					// 	sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=" + centerSelected +
					// 		"&date=" +
					// 		getDate(this,
					// 			i);

					// 	var ocenterModel = new JSONModel(sPath);

					// 	// test start
					// 	// var test = new JSONModel();
					// 	// test.push(ocenterModel);

					// 	// test end

					// 	tableArray.push(ocenterModel);
					// 	i = i + 7;

					// } while (i < 71);

					//Bind the data to the table
					// var tablenew = this.getView().byId("centertable");
					// tablenew.setModel(tableArray[0], "local");

					// // test
					// var tablenew1 = this.getView().byId("centertable1");
					// tablenew1.setModel(tableArray[1], "local");

					// var tablenew2 = this.getView().byId("centertable2");
					// tablenew2.setModel(tableArray[2], "local");

					// var tablenew3 = this.getView().byId("centertable3");
					// tablenew3.setModel(tableArray[3], "local");

					// var tablenew4 = this.getView().byId("centertable4");
					// tablenew4.setModel(tableArray[4], "local");

					// var tablenew5 = this.getView().byId("centertable5");
					// tablenew5.setModel(tableArray[5], "local");

					// var tablenew6 = this.getView().byId("centertable6");
					// tablenew6.setModel(tableArray[6], "local");

					// var tablenew7 = this.getView().byId("centertable7");
					// tablenew7.setModel(tableArray[7], "local");

					// var tablenew8 = this.getView().byId("centertable8");
					// tablenew8.setModel(tableArray[8], "local");

					// var tablenew9 = this.getView().byId("centertable9");
					// tablenew9.setModel(tableArray[9], "local");
					// test

					this.getView().byId("table1").setVisible(false);
					this.getView().byId("table2").setVisible(true);
					// this.getView().byId("centertable").setVisible(true);
					// this.getView().byId("centertable1").setVisible(true);
					// this.getView().byId("centertable2").setVisible(true);
					// this.getView().byId("centertable3").setVisible(true);
					// this.getView().byId("centertable4").setVisible(true);
					// this.getView().byId("centertable5").setVisible(true);
					// this.getView().byId("centertable6").setVisible(true);
					// this.getView().byId("centertable7").setVisible(true);
					// this.getView().byId("centertable8").setVisible(true);
					// this.getView().byId("centertable9").setVisible(true);

				}

				if (this.getView().byId("chknext").getSelected() === false) {
					this.onSelectCheckbox();
					// if (oSegmentedButton !== "available") {
					this.fnApplyFiltersAndOrdering();
				}
				this.getView().byId("panel2").setExpanded(false); // "collapse the panel

			}
		},

		onSelectSegment: function (oEvent) {

			this.getView().byId("panel2").setExpanded(true);

			var tableArr = [];

			var tableData = this.getView().byId("table1");
			tableData.setModel(tableArr[0]);
			tableData.destroyItems(null);

			tableData = this.getView().byId("table2");
			tableData.setModel(tableArr[0]);
			tableData.destroyItems(null);

			// tableData = this.getView().byId("centertable");
			// tableData.setModel(tableArr[0]);
			// tableData.destroyItems(null);

			// tableData = this.getView().byId("centertable1");
			// tableData.setModel(tableArr[0]);
			// tableData.destroyItems(null);

			// tableData = this.getView().byId("centertable2");
			// tableData.setModel(tableArr[0]);
			// tableData.destroyItems(null);
			this.getView().byId("chknext").setSelected(false);
			var oSegmentedButton = this.byId("seg").getSelectedKey();

			if (oSegmentedButton === "pin") {
				this.getView().byId("combo1").setVisible(false);
				this.getView().byId("comboDistrict").setVisible(false);
				this.getView().byId("DP1").setVisible(true);
				this.getView().byId("pin").setVisible(true);
				this.getView().byId("pin").setValue("");
				this.getView().byId("chknext").setVisible(true);

			} else if (oSegmentedButton === "dis") {
				this.getView().byId("combo1").setVisible(true);

				this.getView().byId("comboDistrict").setVisible(true);
				this.getView().byId("DP1").setVisible(true);
				this.getView().byId("pin").setVisible(false);
				this.getView().byId("combo1").setValue("");
				this.getView().byId("comboDistrict").setValue("");
				// this.getView().byId("chknext").setVisible(false);
				// this.getView().byId("chknext").setSelected(false);

			}

			this.getView().byId("table1").setVisible(false);
			// this.getView().byId("centertable").setVisible(false);

			this.getView().byId("table2").setVisible(false);

		},

		onhandleChange: function (oEvent) {
			//	https://cdn-api.co-vin.in/api/v2/admin/location/districts/1
			var stateSelected = this.getView().byId("combo1").getSelectedItem().getKey();
			var districtPath = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateSelected;
			var oModelDistrict = new sap.ui.model.json.JSONModel(districtPath);
			this.getView().byId("comboDistrict").setModel(oModelDistrict);

		},

		createColumnConfig: function () {
			var aCols = [];

			aCols.push({
				label: "Center name",
				property: "name",
				type: EdmType.String

			});

			aCols.push({
				label: "Date",
				type: EdmType.String,
				property: "date"
			});

			aCols.push({
				label: "Vaccine Name",
				type: EdmType.String,
				property: "vaccine"
			});

			aCols.push({
				label: "Availability",
				property: "available_capacity",
				type: EdmType.String
			});

			aCols.push({
				label: "Age Limit",
				property: "min_age_limit",
				type: EdmType.String
			});

			aCols.push({
				label: "Fee type",
				property: "fee_type",
				type: EdmType.String
			});

			return aCols;
		},

		onExport: function () {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (this.getView().byId("chknext").getSelected() === false) {
				if (!this._oTable) {
					this._oTable = this.byId("table1");
				}
			} else {

				if (!this._oTable) {
					this._oTable = this.byId("table2");
				}
			}
			oTable = this._oTable;
			oRowBinding = oTable.getBinding("items");
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: "Level"
				},
				dataSource: oRowBinding,
				fileName: "Vaccine Availibility.xlsx",
				worker: false
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function () {
				oSheet.destroy();
			});
		},

		// onhandlecenter: function (oControlEvent) {
		// 	var pin = this.getView().byId("pin").getValue();

		// 	function getDate(that, n) {

		// 		var sDate = that.getView().byId("DP1").getDateValue();
		// 		var today = new Date(sDate);
		// 		today.setDate(today.getDate() + n);
		// 		var dd = today.getDate();
		// 		var mm = today.getMonth() + 1;
		// 		var yyyy = today.getFullYear();
		// 		if (dd < 10) {
		// 			dd = '0' + dd;
		// 		}
		// 		if (mm < 10) {
		// 			mm = '0' + mm;
		// 		}
		// 		today = dd + '-' + mm + '-' + yyyy;

		// 		return today;
		// 	}

		// 	var centerPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=" +
		// 		getDate(
		// 			this, 0);

		// 	var oModelCentre = new sap.ui.model.json.JSONModel(centerPath);
		// 	this.getView().byId("comboCentre").setModel(oModelCentre);
		// },

		// onAfterRendering: function() {
		//         MessageToast.show("test");
		// },

		// onhandledistrict: function (oControlEvent) {
		// 	var districtSelected = this.getView().byId("comboDistrict").getSelectedItem().getKey();

		// 	function getDate(that, n) {

		// 		var sDate = that.getView().byId("DP1").getDateValue();
		// 		var today = new Date(sDate);
		// 		today.setDate(today.getDate() + n);
		// 		var dd = today.getDate();
		// 		var mm = today.getMonth() + 1;
		// 		var yyyy = today.getFullYear();
		// 		if (dd < 10) {
		// 			dd = '0' + dd;
		// 		}
		// 		if (mm < 10) {
		// 			mm = '0' + mm;
		// 		}
		// 		today = dd + '-' + mm + '-' + yyyy;

		// 		return today;
		// 	}

		// 	var centerPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" +
		// 		districtSelected +
		// 		"&date=" + getDate(this, 0);

		// 	var oModelCentre = new sap.ui.model.json.JSONModel(centerPath);
		// 	this.getView().byId("comboCentre").setModel(oModelCentre);
		// },

		onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");
		}

	});
});
