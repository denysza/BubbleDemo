import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {GameEngine} from 'react-native-game-engine';
import Drag from './components/dragMechanism';
import Zooming from './components/zoomingMechanism';
import restart from './entities';
import Matter from 'matter-js';


export default function App() {
  let entities = restart()
  const engine = React.useRef(null);
  
  const handleGetEntities = () => { 
    const physics = entities.physics
    const allBodies = Matter.Composite.allBodies(physics.world)
    console.log(allBodies)
  };

  return (
          <View style={{flex: 1}} >    
            <GameEngine
              ref={engine}
              style={styles.container}
              systems={[Drag, Zooming]} //logic related stuff...
              entities={entities}
              //entities => {{...props,renderer:<renderingComponent>}}
              //restart => {Bubbles()} , Bubbles=>{...props,renderer}
              // running={true}
            >
              {/* <StatusBar style="auto" hidden={true} /> */}
            </GameEngine>
            <View style={styles.buttonView}>
              <Button
                onPress={handleGetEntities}
                title="Get Bubble data"
              />
            </View>
          </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    padding: 2,
  },
  safeArea: {
    flex: 1,
  },
  container: {
  
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: Platform.select({
      android: 50,
    }),
    alignItems: 'center',
  },
  message: {},
  selectedCity: {
    marginTop: 15,
    fontSize: 12,
    maxWidth: '80%',
    textAlign: 'center',
  },
});
