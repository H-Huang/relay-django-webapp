import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

import { RelayEnvironmentProvider } from "react-relay";
import environment from "../RelayEnvironment";
import ErrorBoundary from "../components/ErrorBoundary";

import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { muiTheme } from "storybook-addon-material-ui";

import MainPage from "../pages/MainPage";

// const environment = createMockEnvironment();

export default {
  title: "Example/MainPage",
  component: MainPage,
} as Meta;

const Template: Story = (args) => <MainPage {...args} />;

export const LoggedIn = Template.bind({});
// LoggedIn.args = {};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
//   loggedIn: false,
// };
