import { NextResponse } from "next/server"
import Stripe from 'stripe' 
const stripe = new Stripe (process.env.STRIPE_SECRET_KEY)

const formatAmountForStripe = (amount)=>{
    return Math.round(amount * 100)
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    if (!session_id) {
      throw new Error('Session ID is required')
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    return NextResponse.json(checkoutSession)
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}

export async function POST(req) {
  const { subscriptionType } = await req.json();

  let unitAmount;
  let productName;

  if (subscriptionType === 'pro') {
      unitAmount = formatAmountForStripe(5); // $5.00 for Pro Subscription
      productName = 'Pro Subscription';
  } else if (subscriptionType === 'basic') {
      unitAmount = formatAmountForStripe(0); // Free Basic Subscription
      productName = 'Basic Subscription';
  } else {
      return NextResponse.json({ error: { message: 'Invalid subscription type' } }, { status: 400 });
  }

  const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
          {
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: productName,
                  },
                  unit_amount: unitAmount,
                  recurring: {
                      interval: 'month',
                      interval_count: 1,
                  },
              },
              quantity: 1,
          },
      ],
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      return NextResponse.json(checkoutSession, {
        status: 200,
      })
}