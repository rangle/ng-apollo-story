import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RatesComponent } from './rates.component';
import { RatesGraphComponent } from './rates-graph/rates-graph.component';
import { cryptoMock } from '@nx-angular/apollo-story-data';
import { NetworkStatus } from '@apollo/client';

export default {
  title: 'Pages/Rates',
  component: RatesComponent,
  decorators: [
    moduleMetadata({ declarations: [RatesComponent, RatesGraphComponent] }),
  ],
} as Meta;

const Template: Story<RatesComponent> = (args) => ({
  props: args,
  template: `<app-rates [ratesData]="ratesData"></app-rates>`,
});

export const Rates = Template.bind({});
Rates.args = {
  ...Template.args,
  ratesData: {
    ...cryptoMock,
    loading: false,
    networkStatus: NetworkStatus.ready,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  ...Template.args,
  ratesData: {
    data: undefined as any,
    loading: true,
    networkStatus: NetworkStatus.loading,
  },
};
