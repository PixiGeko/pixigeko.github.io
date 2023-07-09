export function backgroundColor(color: string) {
  return {
    id: 'backgroundColor',
    beforeDraw: (chart: any, args: any, options: any) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };
}

export function legendColor(color: string) {
  return {
    id: 'legendColor',
    beforeDraw: (chart: any, args: any, options: any) => {
      const legends = chart.legend.legendItems;

      legends.forEach((e: any) => {
        e.fontColor = color;
      });
    }
  }
}
