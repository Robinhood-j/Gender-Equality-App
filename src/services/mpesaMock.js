// Simulates M-Pesa payment
const stkPushMock = async ({ phone, amount, accountRef, transactionDesc }) => {
  console.log("Mock payment initiated:", { phone, amount, accountRef, transactionDesc });

  // Simulate a short delay as if calling the API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    MerchantRequestID: "MOCK12345",
    CheckoutRequestID: "MOCK54321",
    ResponseCode: "0",
    ResponseDescription: "Success. Request accepted for processing",
    CustomerMessage: `Payment request of KES ${amount} sent to ${phone}`,
  };
};

module.exports = { stkPushMock };
