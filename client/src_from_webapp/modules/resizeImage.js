const fromCanvas = (canvas) => {
  return new Promise((resolve) => {
    const canvasToResize = document.createElement('canvas');
    const ctx = canvasToResize.getContext('2d');
    canvasToResize.width = 200;
    canvasToResize.height = 200;
    ctx.drawImage(
      canvas, 0, 0, 200, 200
    );
    canvasToResize.toBlob(resolve);
  });
};
export {
  fromCanvas,
}
