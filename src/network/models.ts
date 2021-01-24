import { INode } from "@approvers/libgenkainet";
import { IAnswer, IOffer } from "@approvers/libgenkainet/dist/webrtc";

export type DiscoverRequest = {
  type: "requestDiscover";
};

export type DiscoverResponse = {
  type: "responseDiscover";
  object: INode;
};

export type AnswerRequest = {
  type: "offer";
  object: IOffer;
};

export type AnswerResponse = {
  type: "answer";
  object: IAnswer;
};

export type ErrorResponse = {
  type: "error";
  message: string;
};

export type Response = DiscoverResponse | AnswerResponse | ErrorResponse;

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj != null && typeof obj === "object";
}

export function isINode(obj: unknown): obj is INode {
  return isObject(obj) && typeof obj["id"] === "string";
}

export function isIAnswer(obj: unknown): obj is IAnswer {
  return (
    isObject(obj) && isINode(obj["from"]) && isINode(obj["to"]) && typeof obj["sdp"] === "string"
  );
}

export function isDiscoverResponse(obj: unknown): obj is DiscoverResponse {
  return isObject(obj) && obj["type"] === "responseDiscover" && isINode(obj["object"]);
}

export function isAnswerResponse(obj: unknown): obj is AnswerResponse {
  return isObject(obj) && obj["type"] === "answer" && isIAnswer(obj["object"]);
}
