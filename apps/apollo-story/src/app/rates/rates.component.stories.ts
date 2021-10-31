import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RatesComponent } from './rates.component';
import { notesMock } from '@nx-angular/apollo-story-data';
import { NetworkStatus } from '@apollo/client';

export default {
  title: 'Pages/Rates',
  component: RatesComponent,
  decorators: [moduleMetadata({ declarations: [RatesComponent] })],
} as Meta;

const Template: Story<RatesComponent> = (args) => ({
  props: args,
  template: `<app-rates [notesData]="notesData"></app-rates>`,
});

export const Rates = Template.bind({});
Rates.args = {
  ...Template.args,
  notesData: {
    ...notesMock,
    loading: false,
    networkStatus: NetworkStatus.ready,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  ...Template.args,
};
