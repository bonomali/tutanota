// @flow
import m from "mithril"
import {lang} from "../misc/LanguageViewModel"
import {DropDownSelector} from "../gui/base/DropDownSelector"
import stream from "mithril/stream/stream.js"
import {TextField} from "../gui/base/TextField"
import {Countries, CountryType} from "../api/common/CountryList"
import {HtmlEditor, Mode} from "../gui/base/HtmlEditor"

export class InvoiceDataInput {
	view: Function;
	selectedCountry: stream<?Country>;
	_invoiceAddressComponent: HtmlEditor;
	_vatNumberField: TextField;
	_subscriptionOptions: SubscriptionOptions;

	constructor(subscriptionOptions: SubscriptionOptions, invoiceData: InvoiceData) {
		this._subscriptionOptions = subscriptionOptions
		this._invoiceAddressComponent = new HtmlEditor()
			.setMinHeight(120)
			.showBorders()
			.setPlaceholderId("invoiceAddress_label")
			.setMode(Mode.HTML)
			.setHtmlMonospace(false)

		this._vatNumberField = new TextField("invoiceVatIdNo_label")

		const countries = Countries.map(c => ({value: c, name: c.n}))
		countries.push({value: null, name: lang.get("choose_label")});
		this.selectedCountry = stream(null)

		const countryInput = new DropDownSelector("invoiceCountry_label",
			() => lang.get("invoiceCountryInfoConsumer_msg"),
			countries,
			this.selectedCountry,
			250).setSelectionChangedHandler(value => {
			this.selectedCountry(value)
		})

		if (invoiceData) {
			this._invoiceAddressComponent.setValue(invoiceData.invoiceAddress)
			this._vatNumberField.setValue(invoiceData.vatNumber)
			this.selectedCountry(invoiceData.country)
		}

		this.view = () => [
			m(".pt", m(this._invoiceAddressComponent)),
			m(".small", lang.get(subscriptionOptions.businessUse ? "invoiceAddressInfoBusiness_msg" : "invoiceAddressInfoConsumer_msg")),
			m(countryInput),
			this._isVatIdFieldVisible() ? m(this._vatNumberField) : null

		]
	}

	validateInvoiceData(): ? string {
		if (this._subscriptionOptions.businessUse
		) {
			if (this._invoiceAddressComponent.getValue().trim() == "" || (this._invoiceAddressComponent.getValue().match(/\n/g) || []).length > 4) {
				return "invoiceAddressInfoBusiness_msg"
			} else if (!this.selectedCountry()) {
				return "invoiceCountryInfoBusiness_msg"
			} else if (this._isVatIdFieldVisible() && this._vatNumberField.value().trim() == "") {
				return "invoiceVatIdNoInfoBusiness_msg"
			}
		}
		else {
			if (!this.selectedCountry()) {
				return "invoiceCountryInfoBusiness_msg" // use business text here because it fits better
			} else if ((this._invoiceAddressComponent.getValue().match(/\n/g) || []).length > 4) {
				return "invoiceAddressInfoBusiness_msg"
			}
		}
		// no error
		return null
	}

	_isVatIdFieldVisible(): boolean {
		return this._subscriptionOptions.businessUse && this.selectedCountry() != null && this.selectedCountry().t == CountryType.EU
	}

	getInvoiceData(): InvoiceData {
		return {
			invoiceAddress: this._invoiceAddressComponent.getValue(),
			country: this.selectedCountry(),
			vatNumber: (this.selectedCountry() && this.selectedCountry().t == CountryType.EU) ? this._vatNumberField.value() : ""
		}
	}
}