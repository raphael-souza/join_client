// import * as React from 'react';
import React, { Fragment } from 'react'
import Phaser from 'phaser'
import ActionCable from 'actioncable';

import { API_WS_ROOT, HEADERS, API_ROOT } from '../../constants';
import  axios from 'axios'

export default function Room() {
  // websocket
  const roomChannel = ActionCable.createConsumer(API_WS_ROOT)
  
  function establishActionCableConnection() {

    roomChannel.subscriptions.create({channel: 'GameRoomChannel', room: '1'}, {
      received(data) { 
        console.info('received data x------ > ' + data.position.position_x)
        console.info('received data y------ > ' + data.position.position_y)
      }

    });
  }
// TODO: criar um canal que o player assina e somente para transmitir os movimentos dos players 
// esse canal irá transmitir de volta para game_room_1
  function sendPlayerPosition(player) {
    console.log(`${API_ROOT}/users`)

    axios.post(`${API_ROOT}/users`, {
      user: {
        position_x: player.x,
        position_y: player.y
      }
    })
    .then(function (response) {
      console.log("publicou -- > ") 
      console.log(response);
    })
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
        create: create
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
    console.log("update")
  }

}



