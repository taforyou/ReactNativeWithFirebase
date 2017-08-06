import React, { Component,PropTypes } from "react";
import { Image, View, ListView,AppRegistry } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  IconNB
} from "native-base";

// เอามาใช้แทน AlertIOS เพราะว่าเราทำบน Android ยังหาที่ Fancy กว่านี้นอกจากตัวอย่างไม่เจอ
import Prompt from 'react-native-prompt';

//import styles from "./styles";

const logo = require("./img/logo.png");
const cardImage = require("./img/drawer-cover.png");

//import React, {Component} from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./StatusBar');
const ActionButton = require('./ActionButton');
const ListItem = require('./ListItem');
const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsXoLrhmHzfNRryyj1g5ReHDShCLTu6Hc",
  authDomain: "reactnativetesting-de684.firebaseapp.com",
  databaseURL: "https://reactnativetesting-de684.firebaseio.com",
  projectId: "reactnativetesting-de684",
  storageBucket: "reactnativetesting-de684.appspot.com",
  messagingSenderId: "1032943208869"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class NativeBaseFirebase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      // เอาไว้ใช้ดัก popup ของ react-native-prompt
      message: '',
      promptVisible: false
    };
     this.itemsRef = this.getRef().child('items');
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

      //console.log('This is items >>',items);
    });
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    // เดิมที่ DataSource เป็น Static
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    // })
  }

  _renderItem(item) {
    return (
      <ListItem item={item} />
    );
  }

  handleToggleAlert() {
    this.setState({ promptVisible: true })
    // สิ่งที่ควรจะทำเมื่อเป็น IOS แต่ทำให้ต้องใช้ท่าอ้อมเพราะเราอยากจะทำบน Android ได้ (เดี๋ยวถ้ามีเวลาจะหาท่าที่ดีกว่านี้มากให้)
    // AlertIOS.prompt(
    //   'Add New Item',
    //   null,
    //   [
    //     {
    //       text: 'Add',
    //       onPress: (text) => {
    //         this.itemsRef.push({ title: text })
    //       }
    //     },
    //   ],
    //   'plain-text'
    // );
  }

  handleAddItem(value) {
    //(value) => this.setState({ promptVisible: false, message: `You said "${value}"` })
    // value คือ ค่าที่พิมพ์มาจาก alertTextbox
    this.itemsRef.push({ title: value })
    this.setState({ promptVisible: false })

  }



  render() {
    return (


      <Container style={styles.container}>

        <Prompt
          title="Say something"
          placeholder="Start typing"
          defaultValue="Hello"
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })}
          onSubmit={this.handleAddItem.bind(this)}
        />

        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Card Image</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 200,
                  flex: 1
                }}
                source={cardImage}
              />
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="thumbs-up" />
                  <Text>4923 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button iconLeft transparent>
                  <Icon active name="chatbubbles" />
                  <Text>89 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>

        <Content padder>
          <View style={styles.container}>

            <StatusBar title="Grocery List" />

            <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />

            {/*<ActionButton title="Add" onpress={this._addItem.bind(this)} />*/}
            {/* ตรงนี้ Handle onPress เพื่อไปเด้ง Component มา*/}
            <Button full success style={{marginTop: 15}} onPress={this.handleToggleAlert.bind(this)}><Text>Add</Text></Button>


          </View>

        </Content>

      </Container>



    );
  }
}

AppRegistry.registerComponent('NativeBaseFirebase', () => NativeBaseFirebase);
