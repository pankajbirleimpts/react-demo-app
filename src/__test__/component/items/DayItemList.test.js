import React from "react";
import { shallow } from "enzyme";
import DayItemList from "../../../components/items/DayItemList";
import { storeFactory } from "../../test/TestUtils";

const setup = props => {
  const store = storeFactory(props);
  const wrapper = shallow(<DayItemList store={store} getAllDayItems={jest.fn()}/>)
    .dive()
    .dive();
  return wrapper;
};

describe("DayItemList component", () => {
  const props = {
    item: {
      isLoading: false,
      allDayItems: [
        {
          id:1,
          date: "27-Dec-2019",
          remainingQuantity: 0,
          totalQuantity: 100,
          itemName: "Dal tadka",
          category: "Dal",
          amount: 10
        },
        {
          id:2,
          date: "27-Dec-2019",
          remainingQuantity: 0,
          totalQuantity: 100,
          itemName: "Sev Tamatar",
          category: "Dal",
          amount: 20
        }
      ]
    }
  };
  test("Snapshot of DayItemList component", () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  test("Check the isLoading in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.item.isLoading).toBe(props.item.isLoading);
  });

  test("Check the `allDayItems` in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.item.allDayItems).toBe(props.item.allDayItems);
  });

  test("Check the `getAllDayItems` action in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.getAllDayItems).toBeInstanceOf(Function);
  });
});
