import {
  DefaultHandlerFactory,
  IDiscoverer,
  IMessageHandler,
  INode,
  Node,
} from "@approvers/libgenkainet";
import { DiscoverRequest, isDiscoverResponse, AnswerRequest, isAnswerResponse } from "./models";
import randomWords from "random-words";
import WebSocketAsPromised from "websocket-as-promised";
import { IAnswer, IOffer } from "@approvers/libgenkainet/dist/webrtc";

// type State = "ConnectingToDiscoverer" | "AwaitingDiscover" | "AwaitingAnswer" | "Connected";

export class Network {
  private webSocket!: WebSocketAsPromised;
  private node!: Node;

  private constructor(private discovererURL: string, private onMessage: IMessageHandler) {}

  static async create(discovererURL: string, onMessage: IMessageHandler): Promise<Network> {
    const self = new Network(discovererURL, onMessage);

    self.webSocket = new WebSocketAsPromised(discovererURL);
    await self.webSocket.open();

    const discoverer: IDiscoverer = {
      discover: (): Promise<INode> => {
        return new Promise((resolve, reject) => {
          console.log("discovering!!");

          const req: DiscoverRequest = { type: "requestDiscover" };
          self.webSocket.send(JSON.stringify(req));

          self.webSocket.ws.onmessage = (data) => {
            self.webSocket.ws.onmessage = null;
            console.log("discovered!!");

            const response = JSON.parse(data.data);
            if (!isDiscoverResponse(response)) {
              reject(new Error("requestDiscover response was not DiscoverResponse"));
            }

            resolve(response.object);
          };
        });
      },
      offer: (offer: IOffer): Promise<IAnswer> => {
        return new Promise((resolve, reject) => {
          console.log("offering!!!");

          const req: AnswerRequest = {
            type: "offer",
            object: {
              from: { id: offer.from.id },
              to: { id: offer.to.id },
              sdp: offer.sdp,
            },
          };
          self.webSocket.send(JSON.stringify(req));

          self.webSocket.ws.onmessage = (data) => {
            self.webSocket.ws.onmessage = null;
            console.log("offered!");

            const response = JSON.parse(data.data);
            if (!isAnswerResponse(response)) {
              reject(new Error("requestOffer response was not IAnswerResponse"));
            }

            resolve(response.object);
          };
        });
      },
    };

    const nodeID = (randomWords(5) as string[]).join("-");
    const node = new Node(nodeID, discoverer, new DefaultHandlerFactory(onMessage, {} as any));
    self.node = node;

    await node.connect();

    return self;
  }
}
