import { ClientRequestType, ObjectLiteral } from "../interfaces";
import { POSSIBLE_SINGLE_ACTIONS } from "../constants";

export function httpParse(
  rawResponse: ObjectLiteral,
  request: ClientRequestType
) {
  const { json } = rawResponse;

  let toReturn: {
    data: ObjectLiteral | ObjectLiteral[];
    total?: number;
    page?: number;
    pageCount?: number;
  } = POSSIBLE_SINGLE_ACTIONS.includes(request.type) ? { data: json } : json;

  return toReturn;
}
