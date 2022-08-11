import * as React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Drag from './components/dragMechanism';
import restart from './entities';
import Matter from 'matter-js';
import Bubble from './entities/bubble';//bubble entity
import Rect from './entities/rect'; //border entity (other wise bubbles will float away from screen)
const {height,width} = Dimensions.get("window");
export default function App() {
  const [entities, setEntities] = React.useState({})
  const engine = React.useRef(null);
  React.useEffect(()=>{
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.gravity.y = 0;
    setEntities(
        {
          physics: { engine, world },
          1:Bubble({id:"bubble1",world:world,position:[100,100],radius:55}),//returns a document with necessary props
          2:Bubble({id:"bubble2",world:world,position:[250,100],radius:70}),
          7:Bubble({id:"bubble3",world:world,position:[200,100],radius:60}),
          8:Bubble({id:"bubble4",world:world,position:[150,100],radius:50}),
          9:Bubble({id:"bubble5",world:world,position:[250,300],radius:90}),
          10:Bubble({id:"bubble6",world:world,position:[100,200],radius:80}),
          11:Bubble({id:"bubble7",world:world,position:[50,200],radius:70}),
          12:Bubble({id:"bubble8",world:world,position:[150,600],radius:80}),
          13:Bubble({id:"bubble9",world:world,position:[150,500],radius:60}),
          14:Bubble({id:"bubble10",world:world,position:[350,700],radius:90}),
          15:Bubble({id:"bubble11",world:world,position:[250,400],radius:100}),
          3:Rect({x:width/2,y:height+60,world:world,size:{w:width,h:40}}),//acts as a bottom border 
          4:Rect({x:width/2,y:-60,world:world,size:{w:width,h:40}}),//acts as a top border
          5:Rect({x:-60,y:height/2,world:world,size:{w:40,h:height}}),//acts as a left border
          6:Rect({x:width+60,y:height/2,world:world,size:{w:40,h:height}}),//acts as a right border
      }
    )
  },[])
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <GameEngine
        ref={engine}
        style={styles.container}
        systems={[Drag]}
        entities={entities}
      >
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
