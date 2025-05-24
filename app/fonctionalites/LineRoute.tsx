// LineRoute.tsx
import React from 'react';
import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export default function LineRoute({
  coordinates,
  id = 'routeSource',
}: {
  coordinates: Position[];
  id?: string;
}) {
  console.log('LineRoute coordinates:', coordinates);

  return (
    <ShapeSource
      id={id}
      lineMetrics
      shape={{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
        properties: {},
      }}
    >
      <LineLayer
        id={`${id}-lineLayer`}
        style={{
          lineColor: '#42E100',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 7,
        }}
      />
    </ShapeSource>
  );
}
