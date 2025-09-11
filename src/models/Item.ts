// [Customization point]
// If you need additional properties in the item object, you can add them here
/**
 * Represents a roadmap item from Microsoft 365 JSON API.
 * This is an internal representation of the item before translated
 * into a Graph API item for further ingestion to the Graph API.
 */
export interface Item {
  id: string;
  title: string;
  description: string;
  moreInfoLink: string;
  status: string;
  lastModified: string;
  created: string;
  products: string[];
  platforms: string[];
  releasePhase: string[];
  cloudInstances: string[];
  content: string;
  url: string;
  guid: string;
}
