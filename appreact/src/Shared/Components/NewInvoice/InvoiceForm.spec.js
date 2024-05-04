import React from "react";
import { shallow } from "enzyme";
import InvoiceForm from "./InvoiceForm";
import { useInvoiceContext } from "../../Context/useInvoiceContext";

jest.mock("../../Context/useInvoiceContext");

describe("InvoiceForm", () => {
  let wrapper;
  const TAX_RATES = [
    { label: "23%", value: 0.23 },
    { label: "8%", value: 0.08 },
    { label: "5%", value: 0.05 },
  ];
  const setItems = jest.fn();
  const setTotalNetValue = jest.fn();
  const setTotalGrossValue = jest.fn();
  const setInvoiceDate = jest.fn();
  const setInvoiceSaleDate = jest.fn();
  const setInvoicePaymentDate = jest.fn();
  const setNotes = jest.fn();
  const handleSelectChange = jest.fn();
  const items = [
    {
      name: "Product 1",
      quantity: 2,
      unit: "pcs",
      vat: 0.23,
      netPrice: 10,
      netValue: 20,
      grossValue: 24.6,
    },
    {
      name: "Product 2",
      quantity: 1,
      unit: "pcs",
      vat: 0.08,
      netPrice: 50,
      netValue: 50,
      grossValue: 54,
    },
  ];
  const totalNetValue = 70;
  const totalGrossValue = 78.6;
  const kontrahent = [{ nip: "1234567890", companyName: "Company 1" }];
  const selectedKontrahent = {
    nip: "1234567890",
    companyName: "Company 1",
  };
  const invoiceDate = "2022-01-01";
  const invoiceSaleDate = "2022-01-01";
  const invoicePaymentDate = "2022-01-31";
  const notes = "Additional notes";

  beforeEach(() => {
    useInvoiceContext.mockReturnValue({
      TAX_RATES,
      items,
      setItems,
      totalNetValue,
      setTotalNetValue,
      totalGrossValue,
      setTotalGrossValue,
      kontrahent,
      selectedKontrahent,
      handleSelectChange,
      invoiceDate,
      setInvoiceDate,
      invoiceSaleDate,
      setInvoiceSaleDate,
      invoicePaymentDate,
      setInvoicePaymentDate,
      notes,
      setNotes,
    });
    wrapper = shallow(<InvoiceForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render select with kontrahent list", () => {
    const select = wrapper.find("select");
    expect(select).toHaveLength(1);
    expect(select.props().value).toBe("1234567890");
    expect(select.find("option")).toHaveLength(1);
    expect(select.find("option").props().value).toBe("1234567890");
    expect(select.find("option").text()).toBe("Company 1");
  });

  it("should call handleSelectChange on select change", () => {
    const select = wrapper.find("select");
    select.simulate("change", { target: { value: "0987654321" } });
    expect(handleSelectChange).toHaveBeenCalledWith("0987654321");
  });

  it("should add item on add item button click", () => {
    const addItemButton = wrapper.find(
      'Button[children="Dodaj produkt/usługę"]'
    );
    addItemButton.simulate("click");
    expect(setItems).toHaveBeenCalledWith([
      ...initialItems,
      {
        name: "",
        quantity: 1,
        unit: "",
        vat: TAX_RATES[0].value,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      },
    ]);
  });

  it("should remove item on remove button click", () => {
    const removeItemButton = wrapper.find(
      'button[children="Usuń"][startIcon=Delete]'
    );
    removeItemButton.simulate("click");
    expect(setItems).toHaveBeenCalledWith([]);
  });

  it("should change item field value on item field change", () => {
    const input = wrapper.find('input[name="name"]').first();
    input.simulate("change", { target: { value: "New Name" } });
    expect(setItems).toHaveBeenCalledWith([
      {
        name: "New Name",
        quantity: 1,
        unit: "",
        vat: TAX_RATES[0].value,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      },
    ]);
  });

  it("should change item vat value on item vat change", () => {
    const select = wrapper.find('select[name="vat"]').first();
    select.simulate("change", { target: { value: 0.23 } });
    expect(setItems).toHaveBeenCalledWith([
      {
        name: "",
        quantity: 1,
        unit: "",
        vat: 0.23,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      },
    ]);
  });

  it("should change notes value on notes field change", () => {
    const textarea = wrapper.find('textarea[name="notes"]').first();
    textarea.simulate("change", { target: { value: "New Notes" } });
    expect(setNotes).toHaveBeenCalledWith("New Notes");
  });
});

describe("InvoiceItem", () => {
  const initialItem = {
    name: "Item",
    quantity: 2,
    unit: "pcs",
    vat: 0.23,
    netPrice: 10,
    netValue: 20,
    grossValue: 24.6,
  };
  const handleRemove = jest.fn();
  const handleChange = jest.fn();
  const taxRates = [
    { value: 0.23, label: "23%" },
    { value: 0.08, label: "8%" },
    { value: 0, label: "0%" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = shallow(
    <InvoiceItem
      index={0}
      item={initialItem}
      onRemove={handleRemove}
      onChange={handleChange}
      taxRates={taxRates}
    />
  );

  it("should render item fields", () => {
    expect(wrapper.find('input[name="name"]').prop("value")).toEqual(
      initialItem.name
    );
    expect(wrapper.find('input[name="quantity"]').prop("value")).toEqual(
      initialItem.quantity
    );
    expect(wrapper.find('input[name="unit"]').prop("value")).toEqual(
      initialItem.unit
    );
    expect(wrapper.find('select[name="vat"]').prop("value")).toEqual(
      initialItem.vat
    );
    expect(wrapper.find('input[name="netPrice"]').prop("value")).toEqual(
      initialItem.netPrice.toString()
    );
  });

  it("should add item when add button is clicked", () => {
    const addButton = wrapper.find('Button[color="primary"]');
    addButton.simulate("click");
    expect(setItems).toHaveBeenCalledTimes(1);
    expect(items.length).toEqual(2);
  });

  it("should remove item when remove button is clicked", () => {
    const removeButton = wrapper.find("Button[startIcon={<Delete />}]").at(1);
    removeButton.simulate("click");
    expect(setItems).toHaveBeenCalledTimes(1);
    expect(items.length).toEqual(0);
  });

  it("should update item when input value is changed", () => {
    const nameInput = wrapper.find('input[name="name"]');
    nameInput.simulate("change", {
      target: { name: "name", value: "New Name" },
    });
    expect(setItems).toHaveBeenCalledTimes(1);
    expect(items[0].name).toEqual("New Name");
  });

  it("should update item when select value is changed", () => {
    const vatSelect = wrapper.find('select[name="vat"]');
    vatSelect.simulate("change", { target: { value: 23 } });
    expect(setItems).toHaveBeenCalledTimes(1);
    expect(items[0].vat).toEqual(23);
  });

  it("should update item when price input value is changed", () => {
    const priceInput = wrapper.find('input[name="netPrice"]');
    priceInput.simulate("change", { target: { name: "netPrice", value: 20 } });
    expect(setItems).toHaveBeenCalledTimes(1);
    expect(items[0].netPrice).toEqual(20);
  });

  it("should update total net value when item is added", () => {
    const addButton = wrapper.find('Button[color="primary"]');
    addButton.simulate("click");
    expect(setTotalNetValue).toHaveBeenCalledTimes(2);
    expect(totalNetValue).toEqual(40);
  });

  it("should update total gross value when item is added", () => {
    const addButton = wrapper.find('Button[color="primary"]');
    addButton.simulate("click");
    expect(setTotalGrossValue).toHaveBeenCalledTimes(2);
    expect(totalGrossValue).toEqual(49.2);
  });

  it("should show and hide additional notes when button is clicked", () => {
    const notesButton = wrapper.find("Button").last();
    notesButton.simulate("click");
    expect(setIsNotesVisibility).toHaveBeenCalledTimes(1);
    expect(isNotesVisibility).toEqual(true);
    const notesTextarea = wrapper.find('textarea[name="notes"]');
    expect(notesTextarea.exists()).toEqual(true);
    notesButton.simulate("click");
    expect(setIsNotesVisibility).toHaveBeenCalledTimes(2);
    expect(isNotesVisibility).toEqual(false);
    expect(notesTextarea.exists()).toEqual(false);
  });
});
