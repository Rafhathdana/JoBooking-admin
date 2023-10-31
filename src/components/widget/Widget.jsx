import { useEffect, useState } from "react";
import axios from "axios";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { BASE_URL } from "../../context/Constant";
import API from "../../../api";

const Widget = ({ type }) => {
  const [data, setData] = useState({
    title: "",
    isMoney: false, 
    link: "",
    amount: 0,
    icon: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case "user":
            // response = await API.get("/users/count");
            setData({
              title: "USERS",
              isMoney: false,
              link: "See all users",
              amount: 3,
              icon: (
                <PersonOutlinedIcon
                  className="icon"
                  style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                  }}
                />
              ),
            });
            break;
          case "order":
            setData({
              title: "ORDERS",
              isMoney: false,
              amount: 5,
              link: "View all orders",
              icon: (
                <ShoppingCartOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                  }}
                />
              ),
            });
            break;
          case "earning":
            setData({
              title: "EARNINGS",
              amount: 50,
              isMoney: true,
              link: "View net earnings",
              icon: (
                <MonetizationOnOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    color: "green",
                  }}
                />
              ),
            });
            break;
          case "balance":
            setData({
              title: "BALANCE",
              isMoney: true,
              amount: 29,
              link: "See details",
              icon: (
                <AccountBalanceWalletOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                    color: "purple",
                  }}
                />
              ),
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* Calculate the percentage here if needed */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
