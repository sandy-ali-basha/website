import { _Attributes } from "api/attributes/attributes";
import { useQuery } from "react-query";

export const useFetchCategories = () => {
  const { data, isLoading } = useQuery(["categories"], async () => {
    const attributesRes = await _Attributes.getAttributes();
    const attributes = attributesRes?.data?.product_attributes || [];

    // Fire parallel requests for attribute values
    const enrichedAttributes = await Promise.all(
      attributes.map(async (attr) => {
        const valuesRes = await _Attributes.getAttributeValues(attr.id);
        return {
          ...attr,
          values: valuesRes?.data.product_attributes_values || [],
        };
      })
    );

    return enrichedAttributes;
  });

  return { isLoading, categories: data || [] };
};
