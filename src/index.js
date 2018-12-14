import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'phaser';
import { oyun, player } from './js/game';

const editor = ace.edit('editor');
editor.getSession().setMode('ace/mode/javascript');
editor.setFontSize(20);
editor.setValue("moveRight();");
var Range = ace.acequire('ace/range').Range;

document.getElementById('runGame').addEventListener('click', () => {
  var code = editor.getValue().split(/\r?\n/);
  console.log(code);
  for (let i = 0; i < code.length; i++) {
    oyun.time.delayedCall(1000 * i, move, [i, code[i]], this);
    // oyun.time.addEvent({ delay: 500 * i, callback: move, args: [code[i]], callbackScope: this });
  }
});

function move(i, direction) {
  const t = {
    targets: player,
    duration: 900,
    ease: 'Linear',
    onStart: startAnimation,
    onStartParams: [i, 'highlight'],
    onComplete: stopAnimation,
    onCompleteParams: [i, 'unhighlight'],
  };

  if (direction === 'moveRight();') {
    player.anims.play('right', true);
    t.x = player.x + 50;
    oyun.tweens.add(t);
  }
  else if (direction === 'moveLeft();') {
    player.anims.play('left', true);
    t.x = player.x - 50;
    oyun.tweens.add(t);
  }
  else {
    alert(`"${direction}" komutunu bilmiyorum :(`);
    oyun.scene.restart();
    editor.setValue("moveRight();");
  }
}

function startAnimation(t, arr, i, className) {
  highlight(i, className);
}

function stopAnimation(t, arr, i, className) {
  player.anims.play('turn', true);
  highlight(i, className);
}

function highlight(i, className) {
  editor.session.addMarker(new Range(i, 0, i, 1), `${className}Marker`, "fullLine");
}
