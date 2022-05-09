import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";

import React, { useEffect } from "react";
import moment from "moment";
import { getAcoountBalance } from "../utils/stripe";
import { SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const { Ribbon } = Badge;

const ConnectNav = () => {
  const auth = useSelector((state) => state.auth);

  const user = auth?.user;

  let balance = 0;

  useEffect(() => {
    const getBalance = async () => {
      balance = await getAcoountBalance(auth.token);
    };
    getBalance();
  }, []);

  console.log(balance);

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user?.name[0]}</Avatar>}
          title={user?.name}
          description={`Joined ${moment(user?.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Available" color="gray">
              <Card className="bg-light pt-4">
                {balance >= 0 && `USD. ${balance}`}

                {/* balance.pending &&
                   balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                   ${currencyFormatter(bp)}
                      </span>
                ))} */}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card className="bg-light pt-4 pointer">
                <SettingOutlined className="h5 pt-2" />

                {/* balance.pending &&
                   balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                   ${currencyFormatter(bp)}
                      </span>
                ))} */}
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
