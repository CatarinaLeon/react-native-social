import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  // console.log("route", route.params);
  const { longitude, latitude } = route.params.locationCoords.coords;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="travel photo"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
