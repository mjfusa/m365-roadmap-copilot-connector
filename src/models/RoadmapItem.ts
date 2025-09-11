/**
 * Represents a roadmap item from the Microsoft 365 JSON API.
 * This matches the structure returned by the JSON API service.
 */
export interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  moreInfoLink: string;
  publicDisclosureAvailabilityDate?: string;
  publicPreviewDate?: string;
  created: string;
  publicRoadmapStatus?: string;
  status?: string;
  modified: string;
  locale?: string | null;
  tags: Array<{
    tagName: string;
  }>;
  tagsContainer: {
    products: Array<{
      tagName: string;
    }>;
    cloudInstances: Array<{
      tagName: string;
    }>;
    releasePhase: Array<{
      tagName: string;
    }>;
    platforms: Array<{
      tagName: string;
    }>;
  };
}
