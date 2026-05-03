import { ProtocolContent } from './types';
import { trtIm } from './trt-im';
import { glp1Subq } from './glp1-subq';
import { hcgSubq } from './hcg-subq';

export const PROTOCOLS: Record<string, ProtocolContent> = {
  'trt-im': trtIm,
  'glp1-subq': glp1Subq,
  'hcg-subq': hcgSubq,
};

export const VALID_SLUGS = Object.keys(PROTOCOLS);

export type { ProtocolContent, SyringeType, InjectionRoute, InjectionSite } from './types';
