"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helper";
export const CURRENCY = "usd";

export async function createCheckoutSession(
  data,
) {
  const ui_mode = data.get(
    "uiMode",
  );

  const origin = headers().get("origin");



  const checkoutSession =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "auto",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Custom amount donation",
            },
            unit_amount: formatAmountForStripe(
              19,
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/courses`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/donate-with-embedded-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data
) {
  const paymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation")),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret};
}