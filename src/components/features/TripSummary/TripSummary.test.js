import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should a link to the correct address is generated', () => {
    const expectedId = 'abc';
    const component = shallow(
      <TripSummary
        id="abc"
        name="lorem name"
        image="image.jpg"
        cost="1$"
        days={5}
        tags={['']}
      />
    );
    const renderedLink = component.find('Link').prop('to');
    expect(renderedLink).toEqual(`/trip/${expectedId}`);
  });

  it('image has valid src and alt', () => {
    const expectedImage = 'image.jpg';
    const expectedName = 'lorem name';
    const component = shallow(
      <TripSummary
        id="abc"
        name={expectedName}
        image={expectedImage}
        cost="1$"
        days={5}
        tags={['']}
      />
    );
    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });

  it('should render corect props: name, cost and days', () => {
    const expextedName = 'lorem name';
    const expextedCost = '1$';
    const expectedDays = 5;
    const component = shallow(
      <TripSummary
        id="abc"
        name={expextedName}
        image="image.jpg"
        cost={expextedCost}
        days={expectedDays}
        tags={['']}
      />
    );
    expect(component.find('.title').text()).toEqual(expextedName);
    expect(component.find('span').at(0).text()).toEqual(`${expectedDays} days`);
    expect(component.find('span').at(1).text()).toEqual(`from ${expextedCost}`);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags correctly', () => {
    const component = shallow(
      <TripSummary
        id="abc"
        name="lorem name"
        image="image.jpg"
        cost="1$"
        days={5}
        tags={['first', 'second', 'third']}
      />
    );

    expect(component.find('.tag').at(0).text()).toEqual('first');
    expect(component.find('.tag').at(1).text()).toEqual('second');
    expect(component.find('.tag').at(2).text()).toEqual('third');
  });

  it('should not render if tags prop is not given', () => {
    const component = shallow(
      <TripSummary
        id="abc"
        name="lorem name"
        image="image.jpg"
        cost="1$"
        days={5}
        tags={['']}
      />
    );

    expect(component.find('.tags')).toMatchObject({});
  });
});
