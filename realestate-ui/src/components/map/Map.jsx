import React from 'react';
import './map.scss';
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';


const Map = ({items}) => {

  return (
    <>
<MapContainer 
  center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [20.5937, 78.9629]} 
  zoom={5} 
  scrollWheelZoom={false} 
  className="map"
  maxBounds={[[35.5087, 68.1114], [8.0689, 97.3956]]} 
  maxBoundsViscosity={1.0}
>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item => (
      <Pin item={item} key={item.id} />
    ))}
  </MapContainer>
    </>
  )
}

export default Map
