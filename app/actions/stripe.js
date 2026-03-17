"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helper";
import { getCourseDetails } from "@/queries/courses";
const CURRENCY = "usd";

export async function createCheckoutSession(
  data,
) {
  const ui_mode = data.get(
    "uiMode",
  ) || "hosted";

  const headerList = await headers()
  const origin = headerList.get("origin");
  const courseId = data.get('courseId');

  const course = await getCourseDetails(courseId)

  if(!course) return new Error(`Course not found`);

  const courseName = course?.title;
  const coursePrice = course?.price

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
              name: courseName,
            },
            unit_amount: formatAmountForStripe(
              coursePrice,
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${course?._id}`,
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