// import * as React from 'react';
import React, { Fragment } from 'react'
import Phaser from 'phaser'

export default function Room() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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



