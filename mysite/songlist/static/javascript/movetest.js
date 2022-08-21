class Game {
    constructor(opt) {
      this._canvas = opt.canvas;
      this._ctx = this._canvas.getContext('2d');
      
      this._assets = opt.assets;
      this._loadedAssets = {};
      
      this._fps = opt.fps || 30;
      this._timer;
      this._items = [];
      this._keyboard = '';
      this._setEventListener();
  
      // 当たり判定用リスト
      this.hitTests = [];
    }
  
    /**
     * 当たり判定を追加する
     * @param {Object} opt オプション
     * @param {Object} opt.self 主のオブジェクト
     * @param {Object} opt.target 当たり判定の対象
     * @param {Function} opt.onhit 衝突検知したときの処理
     */
    addHitTest(opt) {
      this.hitTests.push(opt);
    }
    /**
     * 当たり判定を削除する
     * @param {Object} opt オプション
     * @param {Object} opt.self 主のオブジェクト
     * @param {Object} opt.target 当たり判定の対象
     * @param {Function} opt.onhit 衝突検知したときの処理
     */
    removeHitTest(opt) {
      const index = this.hitTests.findIndex(a => a === opt);
      this.hitTests.splice(index, 1);
    }
    /**
     * 当たり判定を行う
     * @param {Object} self メイン
     * @param {Object} target ターゲット
     * @return {boolean} 衝突検知したらtrue
     */
    _hitTest(self, target) {
      const myTop = self.y;
      const myBottom = self.y + self.h;
      const myLeft = self.x;
      const myRight = self.x + self.w;
  
      const targetTop = target.y;
      const targetBottom = target.y + target.h;
      const targetLeft = target.x;
      const targetRight = target.x + target.w;
  
      return (myTop < targetBottom && targetTop < myBottom) && (myLeft < targetRight && targetLeft < myRight);
    }
  
    //以下の詳細は参照→ http://kuroeveryday.blogspot.jp/2017/10/canvas-how-to-move-object-with-keyboard.html
    // _renderのみ修正
    async start() {
      await this._loadAssets();
      this._timer = setInterval(() => {
        this._render();
      }, 1000 / this._fps);
    }
    stop() {
      clearInterval(this._timer);
    }
    async _loadAssets() {
      const promises = Object.keys(this._assets).map(asset => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => { resolve(); }
          img.onerror = err => { reject(err); }
          img.src = this._assets[asset];
          this._loadedAssets[asset] = img;
        });
      });
  
      return Promise.all(promises);
    }
    _render() {
      this._ctx.clearRect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
      this._items.forEach(a => {
        a.update(this._keyboard);
        a.draw(this._ctx, this._loadedAssets);
  
        // 当たり判定
        this.hitTests
          // 自分に関係する当たり判定のみ取得
          .filter(test => test.self === a)
          .forEach(test => {
            if (this._hitTest(test.self, test.target)) {
              // 当たったときの処理
              test.onhit();
              // 不要な当たり判定を削除
              this.removeHitTest(test);
            }
          });
      })
    }
    _setEventListener() {
      window.addEventListener('keydown', e => { this._keyboard = e.key });
      window.addEventListener('keyup', e => { this._keyboard = '' });
    }
    add(item) {
      this._items.push(item);
    }
    remove(item) {
      const idx = this._items.find(a => a === item);
      this._items.splice(idx, 1);
    }
  }
  
  class Player {
    constructor(opt = {}) {
      this.x = opt.x || 0;
      this.y = opt.y || 0;
      this.w = opt.w || 64;
      this.h = opt.h || 64;
      this.src = opt.src;
    }
    draw(ctx, assets) {
      if (assets[this.src]) {
        ctx.drawImage(assets[this.src], this.x, this.y, this.w, this.h);
      } else {
        ctx.fillRect(this.x, this.y, this.w, this.h);
      }
    }
    update(keyboard) {
      // ここで動作を定義する
      switch (keyboard) {
        case 'ArrowUp':
          this.y -= 5;
          break;
        case 'ArrowDown':
          this.y += 5;
          break;
        case 'ArrowLeft':
          this.x -= 5;
          break;
        case 'ArrowRight':
          this.x += 5;
          break;
      }
    }
  }
  
  class ObjectItem {
    constructor(opt = {}) {
      this.x = opt.x || 0;
      this.y = opt.y || 0;
      this.w = opt.w || 64;
      this.h = opt.h || 64;
      this.color = 'black';
    }
    draw(ctx, assets) {
      ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    update(keyboard) {
      /* nop */
    }
  }
  
  function main() {
    const assets = {
      player: '../songlist/inui1.png'
    };
    const game = new Game({
      canvas: document.getElementById('app'),
      assets: assets,
      fps: 30
    });
    
    const player = new Player({
      src: 'player'
    });
    game.add(player);
    
   for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * (580 - 60 + 1) ) + 60;
      const y = Math.floor(Math.random() * (300 - 60 + 1) ) + 60;
      const item = new ObjectItem({
        x: x,
        y: y
      });
  
      game.addHitTest({
        self: item,
        target: player,
        onhit: () => {
          item.color = 'red';
        }
      });
      game.add(item);
   }
    
    document.getElementById('start').addEventListener('click', () => game.start());
    document.getElementById('stop').addEventListener('click', () => game.stop());
  }
  main();