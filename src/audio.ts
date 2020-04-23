export class Player {
  private element: HTMLAudioElement | undefined = undefined;

  public set(src: string) {
    if (this.element !== undefined) {
      this.element.pause();
      this.element = undefined;
    }

    this.element = new Audio(src);
  }

  public play() {
    if (this.element === undefined) {
      throw Error('No audio has been set so far. Did you call set() on the player?');
    }

    this.element.pause();

    // Ignore errors so that we can re-play if the element recovers.
    //
    // Some browsers disallow autoplay (playing audio without first clicking somewhere in the window), so
    // the catch also ignores these errors.
    this.element.play().catch(() => {
      /* do nothing */
    });
  }

  public pause() {
    if (this.element !== undefined) {
      this.element.pause();
    }
  }
}
