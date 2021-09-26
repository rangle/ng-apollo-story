import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HomeComponent } from './home.component';

export default {
  title: 'HomeComponent',
  component: HomeComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useValue: 'test',
        },
      ],
    }),
  ],
} as Meta<HomeComponent>;

const Template: Story<HomeComponent> = (args: HomeComponent) => ({
  component: HomeComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
