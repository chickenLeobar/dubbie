import CommerceSdk from "@chec/commerce.js";

const client = new CommerceSdk(process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY);

export default client;
