import { create } from 'zustand';

import { type PolygonCoordinate } from '@/components/polygon-map';

interface TemporaryStoreState {
  polygonCoordinates: PolygonCoordinate[];
  setPolygonCoordinates: (coordinates: PolygonCoordinate[]) => void;
  clearPolygonCoordinates: () => void;
}

export const useTemporaryStore = create<TemporaryStoreState>((set, get) => ({
  polygonCoordinates: [],
  setPolygonCoordinates: (coordinates) => {
    console.log('Setting polygon coordinates:', coordinates);
    set({ polygonCoordinates: coordinates });
    console.log(
      'Current polygon coordinates in store:',
      get().polygonCoordinates
    );
  },
  clearPolygonCoordinates: () => set({ polygonCoordinates: [] }),
}));
