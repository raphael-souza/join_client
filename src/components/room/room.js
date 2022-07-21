// import * as React from 'react';
import React, { Fragment } from 'react'
import Phaser from 'phaser'
import ActionCable from 'actioncable';

import { API_WS_ROOT, HEADERS, API_ROOT } from '../../constants';
import  axios from 'axios'

export default function Room() {
  // websocket
  const roomChannel = ActionCable.createConsumer(API_WS_ROOT)
  const data = { 
    name: 'raphael' + randomInt(1, 20),
    email: "email.fake@ras.com"
  }

  let players = [];
  let usersInRoom = [];


  function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  function establishActionCableConnection() {
    roomChannel.subscriptions.create({channel: 'GameRoomChannel', data: data}, {
      connected: () => {
        console.log('RoomsChannel connected!')
      },
      disconnected: () => {
        console.log('RoomsChannel disconnected!');
      },
      received: data => {
        // once the subscription is initiated
        // when the server is sent data it will
        // broadcast it out to the subscribers
        // this.handleReceivedRoom(data)
        debugger

        players[0]['player'].x = data.position_x
        players[0]['player'].y = data.position_y
        console.log(data)
        console.log('RoomsChannel data received')
      }

    });

  }
// TODO: criar um canal que o player assina e somente para transmitir os movimentos dos players 
// esse canal irá transmitir de volta para game_room_1
  function sendPlayerPosition(player) {
    console.log(`${API_ROOT}/move_players`)

    axios.post(`${API_ROOT}/move_players`, {
      data: {
        player_name: data.name ,
        position_x: player.x,
        position_y: player.y
      }
    })
    .then(function (response) {
      console.log("publicou -- > ") 
      console.log(response);
    })
  }

  async function getUsers() {
    console.log("buscando users");

    let res = await axios.get(`${API_ROOT}/users`)   
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("erro ao buscar users!!!!!!!!!!!!")
    }
  }
  

  // config do jogo
  const config = {
    type: Phaser.AUTO,
    width: 1730,
    height: 1200,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#1a1a2d',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
  };

  // corrigi o problema de criar a cena multiplicada 
  // usando isso:
  window.onload = () => {
    const  game = new Phaser.Game(config);
    establishActionCableConnection();
  };
 
  
  function preload (){
    
    this.load.image('tiles', 'assets/tilemaps/drawtiles-spaced.png');
    this.load.image('car', 'assets/sprites/car90.png');
    this.load.tilemapCSV('map', 'assets/tilemaps/csv/grid.csv');
  }

  function create () {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    const layer = map.createLayer(0, tileset, 0, 0);

    const player = this.add.image(32+16, 32+16, 'car');
    getUsers().then( (res) => { 
      usersInRoom = res;  
      usersInRoom.map((user)=> { 
        let newPlayer = {profile: user, player: this.add.image(randomInt(32, 200), randomInt(32, 500), 'car')};
        players.push(newPlayer);
        layer.getTileAtWorldXY(newPlayer['player'].x + 32, newPlayer['player'].y, true);


      });
    });
 
    //  Left
    this.input.keyboard.on('keydown-A', function (event) {

        let tile = layer.getTileAtWorldXY(player.x - 32, player.y, true); 
        // roomChannel.send({player: player, position: { x: player.x, y: player.y}});
        
        sendPlayerPosition(player);
        
        console.log(' tile index ' + tile.index)
        
        if (tile.index ===9) {
          alert('você entrou em uma área restrita!')
        }
        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x -= 32;
            player.angle = 180;
        }

    });

    //  Right
    this.input.keyboard.on('keydown-D', function (event) {

        var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);
        // roomChannel.send({player: player, position: { x: player.x, y: player.y}});
        sendPlayerPosition(player);

        console.log('-- tile index ' + tile.index)
        if (tile.index ===9) {
          alert('você entrou em uma área restrita!')
        }
        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x += 32;
            player.angle = 0;
        }

    });

    //  Up
    this.input.keyboard.on('keydown-W', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);
        sendPlayerPosition(player);

        console.log('-- tile index ' + tile.index)
        if (tile.index ===9) {
          alert('você entrou em uma área restrita!')
        }
        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y -= 32;
            player.angle = -90;
        }

    });

    //  Down
    this.input.keyboard.on('keydown-S', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);
        sendPlayerPosition(player);

        console.log('-- tile index ' + tile.index)
        if (tile.index ===9) {
          alert('você entrou em uma área restrita!')
        }
        if (tile.index === 2)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y += 32;
            player.angle = 90;
        }

    });

  }

  function update () {
  // updated
  }

}



