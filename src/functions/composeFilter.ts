import { ComparisonOperator, CondOperator } from "@nestjsx/crud-request";
import { fetchUtils } from "ra-core";
import { ObjectLiteral } from "../interfaces";

export function composeFilter(paramsFilter: ObjectLiteral) {
  const flatFilter = fetchUtils.flattenObject(paramsFilter);

  if (paramsFilter["$search"]) {
    return {
      s: paramsFilter["$search"]
    };
  }

  const filter = Object.keys(flatFilter).map(key => {
    const splitKey = key.split("||");
    const operator =
      (splitKey[1] as ComparisonOperator) || CondOperator.CONTAINS;
    let field: string = splitKey[0];

    if (field.indexOf("_") === 0 && field.indexOf(".") !== -1) {
      field = field.split(/\.(.+)/)[1];
    }

    return {
      field,
      operator,
      value: flatFilter[key]
    };
  });

  return filter;
}
