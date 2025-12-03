export function calculateDiscountPercent(
  priceBeforeDiscount,
  priceAfterDiscount
) {
  const discountAmount = priceBeforeDiscount - priceAfterDiscount;
  const discountPercent = (discountAmount / priceBeforeDiscount) * 100;
  return discountPercent.toFixed(2); // returns percentage with two decimal places
}
