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

			var oModelState = new JSONModel("https://cdn-api.co-vin.in/api/v2/admin/location/states");
			this.getView().byId("combo1").setModel(oModelState);

			this.byId("combo1").setSelectedKey(null);
			
			this.byId("seg").setSelectedKey("dis");
			this.onSelectSegment();
		
			this.bDescending = true;

			this.byId("DP1").setMinDate(new Date()).setValue(this.onGetDPDate());
			
	                this.getView().byId("combo1").setValue("Karnatka");
		        this.getView().byId("combo1").setSelectedKey("16");
			this.getView().byId("comboDistrict").setSelectedKey("265");
			this.getView().byId("comboDistrict").setValue("Bangalore Urban");

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
				
			};
		},

		fnApplyFiltersAndOrdering: function (oEvent) {
			var aSorters1 = [];
		

			if (this.getView().byId("chknext").getSelected() === false) {
				aSorters1.push(new Sorter("available_capacity", this.bDescending));
				this.byId("table1").getBinding("items").sort(aSorters1);
			}
		
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
				oBindingNew.filter([]);
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
	
			}

		},

		onCheckFuture: function (oEvent) {

			if (this.getView().byId("chknext").getSelected()) {
				this.getView().byId("DP1").setVisible(false);
				this.getView().byId("search").setText("Search Future Availability");

			} else {

				
				this.getView().byId("DP1").setVisible(true);
				this.getView().byId("search").setText("Search");
			}

			

			this.getView().byId("table1").setVisible(false);
			this.getView().byId("table2").setVisible(false);

			var tableArr = [];
		

			var tableData = this.getView().byId("table1");
			tableData.setModel(tableArr[0]);
			tableData.destroyItems(null);

			tableData = this.getView().byId("table2");
			tableData.setModel(tableArr[0]);
			tableData.destroyItems(null);

	

		},

		onButtonPress: function (oEvent) {
			window.open("https://selfregistration.cowin.gov.in/", "_blank");
		},

		onSearch: function (oEvent) {
			var tableArray = [];

			var DP1 = this.getView().byId("DP1").getValue();

			var oSegmentedButton = this.byId("seg").getSelectedKey();

			if (oSegmentedButton === "dis") {

				var stateSelected = this.getView().byId("combo1").getSelectedKey();
				var districtSelected = this.getView().byId("comboDistrict").getSelectedKey();
			}

		

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


			function getDate(that, n) {

				var sDate = that.getView().byId("DP1").getValue();
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
				
					var JSONQuery = [];
				
					var arr = {
						centers: []
					};
					var that = this;
					var n = 1;
					var p = 0;

			

					var ctr = [];
					var date1;
		

					do {

						if (oSegmentedButton === "pin") {

							sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pincode + "&date=" +
								getDate(this, n);
						} else if (oSegmentedButton === "dis") {

							sPath = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + districtSelected +
								"&date=" +
								getDate(this, n);
						}

					
						$.ajax(sPath, {
							type: "GET",
							success: function (data) {
						
								p = p + 1;

								for (var i = 0; i < data.centers.length; i++) {
								

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
									

										cntr.date = (data.centers[i].sessions[j].date.substr(3, 2) + "/" +
											data.centers[i].sessions[j].date.substr(0, 2) + "/" +
											data.centers[i].sessions[j].date.substr(6, 4));

										cntr.vaccine = data.centers[i].sessions[j].vaccine;
										cntr.min_age_limit = data.centers[i].sessions[j].min_age_limit;

										ctr.push(cntr);

									
									}

								}

								if (p === 8) {

								

									ctr.sort(function (a, b) {
										var dateA = new Date(a.date),
											dateB = new Date(b.date);
										return dateA - dateB;
									});

									that.getOwnerComponent().getModel("local").setProperty("/centreData", ctr);

									that.onSelectCheckbox();
									
									that.fnApplyFiltersAndOrdering();

									var ocontact_data_Model = new sap.ui.model.json.JSONModel();
									ocontact_data_Model.setData("local");
									ocontact_data_Model.setSizeLimit(20000); //Size Limit 

						

								}

							


							}
						});


						n = n + 7;

				

					}
					while (n < 56);

			

			


					this.getView().byId("table1").setVisible(false);
					this.getView().byId("table2").setVisible(true);
			

				}

				if (this.getView().byId("chknext").getSelected() === false) {
					this.onSelectCheckbox();
					
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
			        this.getView().byId("combo1").setValue("Karnatka");
				this.getView().byId("combo1").setSelectedKey("16");
				this.getView().byId("comboDistrict").setSelectedKey("265");
				this.getView().byId("comboDistrict").setValue("Bangalore Urban");

			}
			
			if (this.getView().byId("chknext").getSelected() === true){
				this.getView().byId("search").setText("Search Future Availibility");
				
			} else {
					this.getView().byId("search").setText("Search");
			}

			this.getView().byId("table1").setVisible(false);

			this.getView().byId("table2").setVisible(false);

		},

		onhandleChange: function (oEvent) {
			this.getView().byId("comboDistrict").setSelectedKey("");
			this.getView().byId("comboDistrict").setValue("");
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


		onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");
		}

	});
});
