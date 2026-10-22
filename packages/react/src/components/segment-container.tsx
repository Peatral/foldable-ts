import type { ReactNode } from 'react';
import { useViewportSegments } from '../hooks/use-viewport-segments';

export type SegmentComponentProps = { segment: DOMRect, index: number, segments: DOMRect[] };

export function SegmentContainer({
  matchSegment,
  component: InnerComponent
}: {
  matchSegment: number,
  component: ({ segment, index, segments }: SegmentComponentProps) => ReactNode
}) {
  const segments = useViewportSegments();
  
  if (segments.length <= matchSegment) {
    return <></>
  }

  const segment = segments[matchSegment];

  if (!segment) {
    return <></>
  }

  return (
    <InnerComponent segment={segment} index={matchSegment} segments={segments} />
  );
}