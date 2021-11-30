class Slider {
  constructor({
    value,
    min,
    max,
    defaut,
    step,
    name,
    id,
    callback
  }) {

    this.value = value;
    this.min = min;
    this.max = max;
    this.defaut = defaut;
    this.step = step;
    this.name = name;
    this.id = id;
    this.callback = callback;
    this.text1;
    this.text2;

    this.slider = createSlider(this.min, this.max, this.defaut, this.step);

    this.slider.position(0, 0 + this.id * 30);
    this.text1 = createP(this.name);
    this.text1.position(140, -15 + this.id * 30);

    this.slider.elt.addEventListener('change', this.callback);
  }

  update(i) {
    this.value = this.slider.value();

    push();
    translate(-width / 2, -height / 2 + 20);
    textFont(yoster);
    textSize(20);
    fill(255);
    text(this.name + '  ' + this.value, 0, i * 30);
    pop();

    return this.value;
  }
}
