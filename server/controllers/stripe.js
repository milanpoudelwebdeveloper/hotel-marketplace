import queryString from "query-string";
import User from "./../models/user";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  //find user from db
  const user = await User.findById(req.auth._id).exec();
  console.log("User is", user);

  //if user doesn't have a stripe account, create one
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("Stripe account is", account);
    user.stripe_account_id = account.id;
    user.save();
  }

  //create login link based on account id(for front end to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  //pre-fill any user info, for eg:- email
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  console.log("Account link", accountLink);
  const link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log(link);
  res.send(link);
};

//update payment days from 2 to 7 days

const updateDelayDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).exec();
    if (user && user.stripe_account_id) {
      const account = await stripe.accounts.retrieve(user.stripe_account_id);
      //just faking the charges enabled as true because we couldn't set up the payment method in stripe

      const updatedAccount = await updateDelayDays(account.id);
      updatedAccount.charges_enabled = true;
      console.log("Updated user account is", updatedAccount);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: updatedAccount,
        },
        { new: true }
      )
        .select("-password")
        .exec();
      res.status(200).json(updatedUser);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAcoountBalance = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();
  let balance = 0;
  try {
    if (user) {
      balance = await stripe.balance.retrieve({
        stripeAccount: user.stripe_account_id,
      });
      console.log(balance);
    }
    res.status(200).json(balance);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
};
