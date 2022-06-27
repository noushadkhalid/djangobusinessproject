import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
export class MapContainer extends React.Component {
  constructor(props){
      super(props);
  }
  render() {
    return (
      <Map  google={this.props.google}
      initialCenter={{
        lat:this.props.latitude && this.props.latitude,
        lng:this.props.longitude && this.props.longitude,
      }}
      zoom={15}
      onClick={this.onMapClicked}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Business Location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1></h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAQFM5Asx7HPks7kOsS3yT6DPcrWtQvzjM')
})(MapContainer)

