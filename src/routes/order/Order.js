import React, { useContext, useEffect } from "react";
import styles from "./Order.module.css";
import productList from "../../mock_data/data/PRODUCT_MOCK_DATA.json";

import OrderView from "./OrderView/OrderView";
import { Container } from "@mui/system";
import { useGetAllPastOrders } from "../../context/user/order-handler";
import { useInitializeAllOrders } from "../../context/user/order-handler";
import { UserContext } from "../../context/user/user-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Order() {
  const { state } = useContext(UserContext);
  const initializePast = useGetAllPastOrders();
  const initializeOrders = useInitializeAllOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      initializeOrders();
      initializePast();
    }
  }, [state.isAuthenticated]);

  const completedOrders = state?.pastOrders;

  const currentOrders = state?.current_orders;
  return (
    <Container>
      <div className={styles.centering}>
        {/* all past orders with the products in the props */}
        <h2>Current</h2>
        {currentOrders?.slice(0, 3).map((order, index) => (
          <OrderView status={"current"} key={index} order={order} />
        ))}
        {currentOrders.length > 3 ? (
          <Button
            onClick={() => navigate("/order/current")}
            sx={{
              color: "#7A7A7A",
              backgroundColor: "#EEEEEE",
              borderRadius: 30,
              fontWeight: 600,
              py: 1,
            }}
          >
            Load More
          </Button>
        ) : null}

        <h2>Completed</h2>
        {completedOrders?.slice(0, 3).map((order, index) => (
          <OrderView status={"completed"} key={index} order={order} />
        ))}

        {completedOrders.length > 3 ? (
          <Button
            onClick={() => navigate("/order/past")}
            sx={{
              color: "#7A7A7A",
              backgroundColor: "#EEEEEE",
              borderRadius: 30,
              fontWeight: 600,
              py: 1,
            }}
          >
            Load More
          </Button>
        ) : null}
      </div>
    </Container>
  );
}

export default Order;
