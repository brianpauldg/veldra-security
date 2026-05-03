export type SyringeType = 'insulin' | 'intramuscular';
export type InjectionRoute = 'IM' | 'SubQ';

export interface InjectionSite {
  name: string;
  anatomicalLocation: string;
  recommended: boolean;
  notes: string;
  diagramId: string;
}

export interface ProtocolContent {
  slug: string;
  medication: string;
  brandName?: string;
  route: InjectionRoute;
  syringe: {
    type: SyringeType;
    gauge: string;
    length: string;
    visualNotes: string;
  };
  angle: {
    degrees: 45 | 90;
    technique: string;
    pinchAndPoke: boolean;
  };
  sites: InjectionSite[];
  rotation: {
    cadence: string;
    pattern: string;
  };
  aspiration: {
    required: boolean;
    rationale: string;
  };
  videoUrl: string;
  videoPoster: string;
  videoDurationSec: number;
  troubleshooting: { question: string; answer: string }[];
  frequencyNote: string;
  storageNote: string;
  physicianReviewedDate: string;
  physicianName: string;
  physicianCredentials: string;
  contentVersion: string;
}
