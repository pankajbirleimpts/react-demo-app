import React from "react";
import { shallow } from "enzyme";
import ItemList from "../../../components/items/index";
import { storeFactory } from "../../test/TestUtils";

const setup = props => {
  const store = storeFactory(props);
  const wrapper = shallow(<ItemList store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("ItemList component", () => {
  const props = {
    item: {
      isLoading: false,
      allItems: [
        {
          id: 1,
          amount: 15,
          category: "Roti",
          description: "This is tawa rohi",
          isActive: "Active",
          itemName: "Tawa Roti"
        },
        {
          amount: 15,
          category: "Dal",
          description: "Tal tadka",
          isActive: "Active",
          itemName: "Dal tadka"
        }
      ]
    }
  };
  test("Snapshot of ItemList component", () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  test("Check the isLoading in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.item.isLoading).toBe(props.item.isLoading);
  });

  test("Check the `getAllItems` action in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.getAllItems).toBeInstanceOf(Function);
  });
});
