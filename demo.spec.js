const { mount, shallowMount } = require('@vue/test-utils');

const DefaultSlotComponent = {
  name: 'DefaultSlotComponent',
  template: `
    <div class="default-slot-component">
      <slot></slot>
    </div>
  `,
};

const TwoSlotComponent = {
  name: 'TwoSlotComponent',
  template: `
    <div class="default-slot-component">
      <slot name="slot1"></slot>
      <slot name="slot2"></slot>
    </div>
  `,
};

const DefaultUseComponent = {
  name: 'DefaultUseComponent',
  components: {
    DefaultSlotComponent,
  },
  template: `
    <default-slot-component>
      <p>default slot content</p>
    </default-slot-component>
  `,
};

const TwoUseComponent = {
  name: 'DefaultUseComponent',
  components: {
    TwoSlotComponent,
  },
  template: `
    <two-slot-component>
      <template #slot1><p>slot 1 content</p></template>
      <template #slot2><p>slot 2 content</p></template>
    </two-slot-component>
  `,
};

const TwoInDefaultUseComponent = {
  name: 'DefaultUseComponent',
  components: {
    DefaultSlotComponent,
    TwoSlotComponent,
  },
  template: `
    <default-slot-component>
      <two-slot-component>
        <template #slot1><p>slot 1 content</p></template>
        <template #slot2><p>slot 2 content</p></template>
      </two-slot-component>
    </default-slot-component>
  `,
};

const DefaultInTwoUseComponent = {
  name: 'DefaultUseComponent',
  components: {
    DefaultSlotComponent,
    TwoSlotComponent,
  },
  template: `
    <two-slot-component>
      <template #slot1>
        <default-slot-component><p>default slot content in slot 1</p></default-slot-component>
      </template>
      <template #slot2>
        <default-slot-component><p>default slot content in slot 2</p></default-slot-component>
      </template>
    </two-slot-component>
  `,
};

const DefaultInDefaultUseComponent = {
  name: 'DefaultInDefaultUseComponent',
  components: {
    DefaultSlotComponent,
  },
  template: `
    <default-slot-component>
      <default-slot-component>
        <p>default slot content in default slot</p>
      </default-slot-component>
    </default-slot-component>
  `,
};

describe('shallow mount', () => {
  test('default slot', () => {
    const wrapper = shallowMount(DefaultUseComponent);
    expect(wrapper.html()).toContain('default slot content');
  });
  test('two slot', () => {
    const wrapper = shallowMount(TwoUseComponent);
    expect(wrapper.html()).toContain('slot 1 content');
    expect(wrapper.html()).toContain('slot 2 content');
  });
  test('two in default slot', () => {
    const wrapper = shallowMount(TwoInDefaultUseComponent);
    expect(wrapper.html()).toContain('slot 1 content');
    expect(wrapper.html()).toContain('slot 2 content');
  });
  test('default in two slot', () => {
    const wrapper = shallowMount(DefaultInTwoUseComponent);
    expect(wrapper.html()).toContain('default slot content in slot 1');
    expect(wrapper.html()).toContain('default slot content in slot 2');
  });
  test('default in default slot', () => {
    const wrapper = shallowMount(DefaultInDefaultUseComponent);
    expect(wrapper.html()).toContain('default slot content in default slot');
  });
});

describe('deep mount', () => {
  test('default slot', () => {
    const wrapper = mount(DefaultUseComponent);
    expect(wrapper.html()).toContain('default slot content');
  });
  test('two slot', () => {
    const wrapper = mount(TwoUseComponent);
    expect(wrapper.html()).toContain('slot 1 content');
    expect(wrapper.html()).toContain('slot 2 content');
  });
  test('two in default slot', () => {
    const wrapper = mount(TwoInDefaultUseComponent);
    expect(wrapper.html()).toContain('slot 1 content');
    expect(wrapper.html()).toContain('slot 2 content');
  });
  test('default in two slot', () => {
    const wrapper = mount(DefaultInTwoUseComponent);
    expect(wrapper.html()).toContain('default slot content in slot 1');
    expect(wrapper.html()).toContain('default slot content in slot 2');
  });
  test('default in default slot', () => {
    const wrapper = mount(DefaultInDefaultUseComponent);
    expect(wrapper.html()).toContain('default slot content in default slot');
  });
});
