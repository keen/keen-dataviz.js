module.exports = {
  render: function(text){
    var outer = document.createElement('div'),
        inner = document.createElement('div'),
        msg = document.createElement('span'),
        height = this.height() || 140;

    outer.className = this.theme();
    inner.className = this.theme() + '-message';
    inner.style.height = height + 'px';
    inner.style.paddingTop = (height / 2 - 12) + 'px';
    inner.style.width = this.width() + 'px';

    msg.innerHTML = text || '';
    inner.appendChild(msg);
    outer.appendChild(inner);

    this.el().innerHTML = '';
    this.el().appendChild(outer);
  },
  update: function(){
    // no special update handling
    this.render();
  },
  destroy: function(){
    // no special clean-up
  }
};
