import React from "react";
import { shallow } from "enzyme";
import UserList from "../../../components/users/index";
import { storeFactory } from "../../test/TestUtils";

const setup = props => {
  const store = storeFactory(props);
  const wrapper = shallow(<UserList store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("UserList component", () => {
  const props = {
    user: {
      isLoading: false,
      allUsers: [
        {
          id: 4,
          firstName: "Pankaj",
          lastName: "Birle"
        },
        {
          id: 5,
          firstName: "Rohan",
          lastName: "Bajpai"
        }
      ]
    }
  };
  test("Snapshot of UserList component", () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  test("Check the isLoading in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.user.isLoading).toBe(props.user.isLoading);
  });

  test("Check the `getAllUsers` action in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.getAllUsers).toBeInstanceOf(Function);
  });
});
