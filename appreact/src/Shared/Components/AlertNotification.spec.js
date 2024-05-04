import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { connect } from "react-redux";
import { getActions } from "../../Store/actions/alertActions";
import { shallow } from "enzyme";

describe("AlertNotification", () => {
  it("should render Snackbar with correct props", () => {
    const mockShowAlertMessage = true;
    const mockCloseAlertMessage = jest.fn();
    const mockAlertMessageContent = "Test message";
    const wrapper = shallow(
      <AlertNotification
        showAlertMessage={mockShowAlertMessage}
        closeAlertMessage={mockCloseAlertMessage}
        alertMessageContent={mockAlertMessageContent}
      />
    );
    expect(wrapper.find(Snackbar).props()).toMatchObject({
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      open: mockShowAlertMessage,
      onClose: mockCloseAlertMessage,
      autoHideDuration: 6000,
    });
  });

  it("should render Alert with correct severity and content", () => {
    const mockShowAlertMessage = true;
    const mockCloseAlertMessage = jest.fn();
    const mockAlertMessageContent = "Test message";
    const wrapper = shallow(
      <AlertNotification
        showAlertMessage={mockShowAlertMessage}
        closeAlertMessage={mockCloseAlertMessage}
        alertMessageContent={mockAlertMessageContent}
      />
    );
    expect(wrapper.find(Alert).props()).toMatchObject({
      severity: "info",
      children: mockAlertMessageContent,
    });
  });
});
