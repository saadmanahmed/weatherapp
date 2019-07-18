/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import OpenWeatherMap from "./open_weather_map";
import Forecast from "./Forecast";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component{
  constructor(props){
    super(props);
    this.state={zip:" ",forecast:null};
  }
  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
    this.setState({ forecast: forecast });
    });
  };
  render() {
    let content = null;
    if (this.state.forecast !== null) {
    content = (
    <Forecast
    main={this.state.forecast.main}
    description={this.state.forecast.description}
    temp={this.state.forecast.temp}
    />
    );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
source={require("./flowers.png")}
resizeMode="cover"
style={styles.backdrop}
>
      <View style={styles.overlay}>
      <View style={styles.row}>
      <Text style={styles.mainText}>
      Current weather for
      </Text>
      <View style={styles.zipContainer}>
      <TextInput
      style={[styles.zipCode, styles.mainText]}
      onSubmitEditing={this._handleTextChange}
      underlineColorAndroid="transparent"
      />
      </View>
      </View>
{content}
</View>
</ImageBackground>
</View>
);
}
}const baseFontSize = 16;
const styles = StyleSheet.create({
container: { flex: 1, alignItems: "center", paddingTop: 0 },
backdrop: { flex: 1, flexDirection: "column" ,width: '100%', height: '100%'},
overlay: {
paddingTop: 5,
backgroundColor: "#000000",
opacity: 0.5,
flexDirection: "column",
alignItems: "center"
},
row: {
flexDirection: "row",
flexWrap: "nowrap",
alignItems: "flex-start",
padding: 30
},
zipContainer: {
height: baseFontSize + 10,
borderBottomColor: "#DDDDDD",
borderBottomWidth: 1,
marginLeft: 5,
marginTop: 3
},
zipCode: { flex: 1, flexBasis: 1, width: 50, height: baseFontSize },
mainText: { fontSize: baseFontSize, color: "#FFFFFF" }
});
  

export default App;
