import React from 'react';
import './Pricing.css';

const pricingPlans = [
  {
    title: "Free",
    features: [
      { feature: "Landing Page Builder", available: true },
      { feature: "Point of Sale System", available: true },
      { feature: "CRM", available: false },
      { feature: "Manual Leads Management", available: false },
      { feature: "Analytics", available: false },
      { feature: "Support", available: "Email" },
    ],
    price: "Free",
    highlight: false,
  },
  {
    title: "Basic",
    features: [
      { feature: "Landing Page Builder", available: true },
      { feature: "External Domain Support", available: true },
      { feature: "CRM", available: true },
      { feature: "Manual Leads Management", available: true },
      { feature: "Analytics", available: "Basic" },
      { feature: "Support", available: "Email & Chat" },
    ],
    price: "R250/month",
    highlight: true,
  },
  {
    title: "Pro",
    features: [
      { feature: "Landing Page Builder", available: true },
      { feature: "Lead Feed Automation", available: true },
      { feature: "CRM", available: true },
      { feature: "Manual Leads Management", available: true },
      { feature: "Analytics", available: "Advanced" },
      { feature: "Support", available: "Priority Support" },
    ],
    price: "Custom/month",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section className="pricing">
      <h2>Business Packages</h2>
      <div className="pricing-cards">
        {pricingPlans.map((plan, index) => (
          <div className={`pricing-card ${plan.highlight ? 'highlight' : ''}`} key={index}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>
                  {feature.available === true ? "✔️" : feature.available === false ? "❌" : feature.available}
                  &nbsp; {feature.feature}
                </li>
              ))}
            </ul>
            <button className="btn">Select Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
