import React from "react";
import { shallow } from "enzyme";
import TransactionList from "../../../components/items/TransactionList";
import { storeFactory } from "../../test/TestUtils";

const setup = (props, actions = null) => {
  const customActions = {
    getAllTransactions: jest.fn(),
    ...actions
  };
  const store = storeFactory(props);
  const wrapper = shallow(<TransactionList store={store} {...customActions} />, { lifecycleExperimental: true })
    .dive()
    .dive();
  return wrapper;
};

describe("TransactionList component", () => {
  const props = {
    user: {
      data: {
        balance: 4955,
        country: "Indore",
        email: "pankaj.birle@impetus.co.in",
        employeeId: "IIIPL3025",
        firstName: "Pankaj",
        id: "-Lx1WclrnUuv0_hSvdpV",
        lastName: "Birle",
        password: "pankaj123",
        role: "EMPLOYEE"
      }
    },
    item: {
      isLoading: false,
      allTransactions: [
        {
          amount: 15,
          date: "26-Dec-2019",
          itemId: "-Lwi9T6G70Fs-Wd5JF0r",
          purchaseAmount: "0.00",
          quantity: 0,
          userId: "-Lwc-iXIVHhQnEihsqcW",
          id: "-Lx18EC9oMqwARQ2HL5m",
          itemName: "Tawa Roti",
          category: "Roti",
          userName: "Harish Nararayan"
        },
        {
          amount: 15,
          date: "26-Dec-2019",
          itemId: "-Lwi9T6G70Fs-Wd5JF0r",
          purchaseAmount: "10.00",
          quantity: 1,
          userId: "-Lwc-iXIVHhQnEihsqcs",
          id: "-Lx18EC9oMqwARQ2HL5n",
          itemName: "Tawa Roti",
          category: "Roti",
          userName: "Harish Nararayan"
        }
      ]
    }
  };
  test("Snapshot of TransactionList component", () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  test("Check the isLoading in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.item.isLoading).toBe(props.item.isLoading);
  });

  test("Check the 'EMPLOYEE' role in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.user.data.role).toBe(props.user.data.role);
  });

  test("Check the `allTransactions` in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.item.allTransactions).toBe(
      props.item.allTransactions
    );
  });

  test("Check the `getAllTransactions` action in props", () => {
    const wrapper = setup(props);
    const componentProps = wrapper.instance().props;
    expect(componentProps.getAllTransactions).toBeInstanceOf(Function);
  });
  
});
