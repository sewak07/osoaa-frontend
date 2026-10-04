import React from 'react';
import { useLocation } from 'react-router-dom';

export const PoliciesPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Shipping Policy';
  let content = null;

  if (path.includes('shipping-policy')) {
    title = 'Shipping & Delivery Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>At OSOAA, we ensure prompt and secure delivery of your supplements across Nepal.</p>
        <h3 className="text-base font-bold text-black mt-4">1. Delivery Timelines</h3>
        <p>• Inside Kathmandu Valley: 1–2 business days.</p>
        <p>• Outside Kathmandu Valley (Major cities & districts across all 7 provinces): 2–4 business days.</p>
        <h3 className="text-base font-bold text-black mt-4">2. Shipping Charges</h3>
        <p>• Standard Delivery Fee: Rs. 150</p>
        <p>• Orders above Rs. 3,500 automatically qualify for <strong className="text-orange-600">Free Nationwide Delivery</strong>.</p>
        <h3 className="text-base font-bold text-black mt-4">3. Packaging & Tamper-Proof Seals</h3>
        <p>All items are shipped in sturdy, tamper-evident packaging. Please inspect the outer seal before accepting Cash on Delivery parcels.</p>
      </div>
    );
  } else if (path.includes('return-policy')) {
    title = 'Return & Refund Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          Thanks for shopping at <strong>www.osoaa.com.np</strong>.
        </p>

        <p>
          If you are not entirely satisfied with your purchase, we're here to help.
        </p>

        <h3 className="text-base font-bold text-black mt-6">
          CANCELLATION POLICY
        </h3>

        <h4 className="font-bold text-black mt-4">
          Cancellation Before Dispatch
        </h4>

        <p>
          If the order or the item(s) that you want to cancel have not been shipped
          yet, you can call us on 9812345678 from Sunday to
          Friday between 10 a.m. and 6 p.m.
        </p>

        <p>
          In such cases, the order will be cancelled, and the money will be refunded
          to you within 7 business days after the cancellation request is duly
          processed by us.
        </p>

        <h4 className="font-bold text-black mt-4">
          Cancellation After Dispatch
        </h4>

        <p>
          Cancellation will be entertained only upon receipt of a defective or
          incorrect product and appropriate proof being shared with the customer
          care team.
        </p>

        <h4 className="font-bold text-black mt-4">
          Discount Vouchers
        </h4>

        <p>
          Discount vouchers are intended for one-time use only and shall be treated
          as such even if you cancel the order.
        </p>

        <h3 className="text-base font-bold text-black mt-6">
          RETURNS
        </h3>

        <p>
          You have 3 calendar days to return an item from the date you received it.
        </p>

        <p>
          To be eligible for a return, your item must be unused and in the same
          condition as when you received it.
        </p>

        <p>
          Your item must be in the original packaging with all labels intact.
        </p>

        <p>
          Your item needs to have a receipt or proof of purchase.
        </p>

        <h3 className="text-base font-bold text-black mt-6">
          REFUNDS
        </h3>

        <p>
          Once we receive your package, after a general inspection, we shall notify
          you of the receipt of the package in our warehouse.
        </p>

        <p>
          Further, the item will be verified for any damage, return conditions, and
          applicable clauses mentioned in the return policy. We will notify you
          about the status of the item received in our warehouse.
        </p>

        <p>
          If your return is approved, we will initiate a refund to your debit card,
          credit card, bank account, or the original method of payment, as
          applicable.
        </p>

        <p>
          You will receive the refund within 3 days of approval from OSOAA.
          Depending on your bank or payment provider's policies, the returned amount
          may take additional time to reflect in your account.
        </p>

        <h3 className="text-base font-bold text-black mt-6">
          SHIPPING
        </h3>

        <h4 className="font-bold text-black mt-4">
          Product Received in Good Condition
        </h4>

        <p>
          The customer will be responsible for bearing all shipping costs incurred
          during the item return procedure when the product is received in good
          condition and the return is not due to an error on the part of OSOAA.
        </p>

        <h4 className="font-bold text-black mt-4">
          Product Received in Bad Condition
        </h4>

        <p>
          OSOAA will bear the cost of return shipping if the product is received
          damaged or defective.
        </p>

        <h4 className="font-bold text-black mt-4">
          Wrong Product
        </h4>

        <p>
          OSOAA will bear the cost of return shipping if an incorrect product is
          delivered.
        </p>

        <h3 className="text-base font-bold text-black mt-6">
          CONTACT US
        </h3>

        <p>
          If you have any questions about how to return your item, please contact us
          by email at{' '}
          <a
            href="mailto:osoaanepal@gmail.com"
            className="text-orange-600 font-semibold hover:underline"
          >
            osoaanepal@gmail.com
          </a>
          .
        </p>
      </div>
    );
  } else if (path.includes('privacy-policy')) {
    title = 'Privacy Policy';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>Your privacy is paramount. This policy outlines how OSOAA collects and protects your customer data.</p>
        <h3 className="text-base font-bold text-black mt-4">1. Data Collection</h3>
        <p>We collect essential information required to fulfill deliveries, including name, delivery address, mobile phone number, and email address.</p>
        <h3 className="text-base font-bold text-black mt-4">2. Payment Data Security</h3>
        <p>We never store customer eSewa passwords or banking PINs. All online payments are securely processed through official gateway integrations.</p>
        <h3 className="text-base font-bold text-black mt-4">3. Third-Party Sharing</h3>
        <p>Customer contact details are shared strictly with our authorized delivery logistics partners to ensure delivery completion.</p>
      </div>
    );
  } else {
    title = 'Terms & Conditions';
    content = (
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>Welcome to OSOAA Nepal. By using our website and purchasing our wellness products, you agree to the following terms.</p>
        <h3 className="text-base font-bold text-black mt-4">1. Pricing & NPR Currency</h3>
        <p>All prices listed on OSOAA are in Nepalese Rupees (NPR / Rs.) and are subject to change without prior notice.</p>
        <h3 className="text-base font-bold text-black mt-4">2. Product Usage & Consultation</h3>
        <p>Supplements should be consumed in accordance with stated label instructions. Consult a certified medical or fitness professional if you have pre-existing medical conditions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 bg-white min-h-[75vh]">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-black">{title}</h1>
      </div>
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
        {content}
      </div>
    </div>
  );
};
