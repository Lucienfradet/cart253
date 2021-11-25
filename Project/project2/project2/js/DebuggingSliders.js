class Slider {
  constructor({
    min,
    max,
    defaut,
    step,
    name
  }) {

    this.min = min;
    this.max = max;
    this.default = defaut;
    this.step = step;
    this.name = name;

    this.slider = createSlider(this.min, this.max, this.defaut, this.step);
  }

  update(valeur) {
    valeur = this.slider.value();
  }

  display(i) {
    this.slider.position(0, 0 + i * 10);
    this.slider.style('100px', '100px');
    text(this.name, 130, 0 + i * 10);
  }
}
