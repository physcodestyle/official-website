function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

(function () {
  document.querySelector('#spec-info-min').setAttribute('d', describeArc(40, 40, 37.5, 0, Math.floor((208 / 300) * 360)));
  document.querySelector('#spec-radi-min').setAttribute('d', describeArc(40, 40, 37.5, 0, Math.floor((149 / 300) * 360)));
  document.querySelector('#spec-phys-min').setAttribute('d', describeArc(40, 40, 37.5, 0, Math.floor((142 / 300) * 360)));
  document.querySelector('#spec-phot-min').setAttribute('d', describeArc(40, 40, 37.5, 0, Math.floor((176 / 300) * 360)));
  document.querySelector('#spec-nano-min').setAttribute('d', describeArc(40, 40, 37.5, 0, Math.floor((163 / 300) * 360)));
  document.querySelector('#spec-nucl-min').setAttribute('d', describeArc(40, 40, 37.5, 0, Math.floor((238 / 300) * 360)));
}());
