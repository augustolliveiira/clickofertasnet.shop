import { Howl } from 'howler';

class SoundService {
  private coinCollect: Howl;
  private coinDrop: Howl;
  private coinShower: Howl;
  private celebration: Howl;

  constructor() {
    this.coinCollect = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'],
      volume: 0.5,
    });

    this.coinDrop = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3'],
      volume: 0.3,
    });

    this.coinShower = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'],
      volume: 0.4,
      sprite: {
        shower: [0, 2000]
      }
    });

    this.celebration = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3'],
      volume: 0.4,
    });
  }

  playCoinCollect() {
    this.coinCollect.play();
  }

  playCoinDrop() {
    this.coinDrop.play();
  }

  playCoinShower() {
    this.coinShower.play('shower');
  }

  playCelebration() {
    this.celebration.play();
  }
}

export const soundService = new SoundService();