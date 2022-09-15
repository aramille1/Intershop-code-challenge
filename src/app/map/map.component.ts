import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
// import { GeoJson, FeatureCollection } from '../../models/map';
import { environment } from 'src/environments/environment';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: Mapboxgl.Map;
  stores:any[] = [];
  searchText = '';
  selectedStore = null;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.getStores().subscribe((data: any) => {
      this.stores = data[0];
      (Mapboxgl as typeof Mapboxgl).accessToken = environment.accessToken;
      this.map = new Mapboxgl.Map({
        container: 'map-mapbox',
        style: 'mapbox://styles/mapbox/outdoors-v9',
        center: [9.0388181, 50.7726145], //lng, lat
        zoom: 5.5,
      });

      console.log(this.stores);

      this.map.on('load', () => {
        this.map.resize();
        /* Add the data to your map as a layer */
        this.map.addSource('places', {
          /* Add a GeoJSON source containing place coordinates and information. */
          type: 'geojson',
          data: data[0] as any,
        });
        this.addMarkers(data[0]);
      });
    });
  }

  addMarkers(stores: any) {
    for (const marker of stores) {
      /* Create a div element for the marker. */
      const el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.uuid}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';
      // getting coordinates from store and storing them in the same arr
      if (marker.longitude) {
        const lng = parseFloat(marker.longitude);
        const lat = parseFloat(marker.latitude);
        const coordinates = [lng, lat];
        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        new Mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(coordinates as any)
          .addTo(this.map);
      }

      // adding click listener
      el.addEventListener('click', (e) => {
        /* Fly to the point */
        this.flyToStore(marker);
        /* Close all other popups and display popup for clicked store */
        this.createPopUp(marker);
        /* Highlight listing in sidebar */
        // const activeItem = document.getElementsByClassName('active');
        // e.stopPropagation();
        // if (activeItem[0]) {
        //   activeItem[0].classList.remove('active');
        // }
      });
    }
  }

  showOnMap(store:any) {
    this.selectedStore = store
    this.flyToStore(store)
    this.createPopUp(store)
  }

  normalize(string: string) {
    return string.trim().toLowerCase();
  }

  flyToStore(store: any) {
    if (store.longitude) {
      this.map.flyTo({
        center: [parseFloat(store.longitude), parseFloat(store.latitude)],
        zoom: 15,
      });
    }
  }

  createPopUp(store: any) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new Mapboxgl.Popup({ closeOnClick: false })

      .setLngLat([parseFloat(store.longitude), parseFloat(store.latitude)])
      .setHTML(
        `
      <h3>${store.name}</h3>
      <div>phone: ${store.phoneBusiness}</div>
      <div>email: ${store.email}</div>
      <div>${store.address}</div>
      <div>${store.postalCode}</div>
      <div>${store.city}</div>
      <div>${store.country}</div>
      `
      )
      .addTo(this.map);
  }
}
