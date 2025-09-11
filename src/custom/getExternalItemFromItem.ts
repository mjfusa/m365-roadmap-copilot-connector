import { Item } from "../models/Item";
import { ExternalConnectors } from "@microsoft/microsoft-graph-types";
import { getAclFromITem } from "./getAclFromItem";

// [Customization point]
// If there is additional logic to transform the item, you can add it here
// This function is used to transform the JSON item into a format that can be ingested by the Graph API.
// The item is transformed into an ExternalItem object that can be ingested by the Graph API.
// The ExternalItem object is used to represent the item in the Graph API.
// See the Graph API documentation to understand the structure of the ExternalItem object and how to convert the item into it.
// https://learn.microsoft.com/en-us/graph/api/resources/connectors-api-overview?view=graph-rest-1.0
// https://learn.microsoft.com/en-us/graph/api/externalconnectors-externalconnection-put-items?view=graph-rest-1.0

/**
 * Transform internal JSON Item to Microsoft Graph ExternalItem format
 * @param item - The JSON item to transform
 * @returns ExternalItem formatted for Graph API
 */
export function getExternalItemFromItem(item: Item): ExternalConnectors.ExternalItem {
  return {
    id: item.id,
    properties: {
      "title@odata.type": "String",
      title: item.title,
      "description@odata.type": "String", 
      description: item.description,
      "status@odata.type": "String",
      status: item.status,
      "releasePhase@odata.type": "Collection(String)",
      releasePhase: item.releasePhase,
      "products@odata.type": "Collection(String)",
      products: item.products,
      "platforms@odata.type": "Collection(String)",
      platforms: item.platforms,
      "cloudInstances@odata.type": "Collection(String)",
      cloudInstances: item.cloudInstances,
      created: item.created,
      lastModified: item.lastModified,
      "moreInfoLink@odata.type": "String",
      moreInfoLink: item.url,
    },
    content: {
      value: item.content,
      type: "text",
    },
    acl: getAclFromITem(item),
  } as ExternalConnectors.ExternalItem;
}
