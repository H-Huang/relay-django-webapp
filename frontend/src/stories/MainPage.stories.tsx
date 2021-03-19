import React from "react";
import { Story, Meta } from "@storybook/react";


import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
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
