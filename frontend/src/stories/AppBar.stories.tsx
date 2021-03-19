import React from "react";
import { Story, Meta } from "@storybook/react";

import AppBar, { AppBarProps } from "../components/AppBar";

export default {
  title: "Example/AppBar",
  component: AppBar,
} as Meta;

const Template: Story<AppBarProps> = (args) => <AppBar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedIn: true,
  signOutMethod: () => {
    console.log("sign out");
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedIn: false,
};
