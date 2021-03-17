import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

import AppBar, { AppBarProps } from "../components/AppBar";

export default {
  title: "Example/AppBar",
  component: AppBar,
} as Meta;

const Template: Story<AppBarProps> = (args) => (
  <MemoryRouter>
    <AppBar {...args} />
  </MemoryRouter>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedIn: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedIn: false,
};
