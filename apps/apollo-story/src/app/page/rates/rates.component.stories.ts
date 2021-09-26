import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RatesComponent } from './rates.component';

export default {
  title: 'RatesComponent',
  component: RatesComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      // providers: [
      //   {
      //     provide: APOLLO_OPTIONS,
      //     useValue: 'test',
      //   },
      // ],
    }),
  ],
} as Meta<RatesComponent>;

const Template: Story<RatesComponent> = (args: RatesComponent) => ({
  component: RatesComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
