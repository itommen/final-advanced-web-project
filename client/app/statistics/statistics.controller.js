import angular from 'angular';

// import d3 from 'd3';

const CONTROLLER = 'statisticsController';

angular.module('advanced.controllers')
  .controller(CONTROLLER, (Post) => {
    const initPostGraph = () => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      debugger
      const x = d3.scaleOrdinal()
        .range([0, width], 0.1);

      const y = d3.scaleLinear()
        .range([height, 0]);

      const xAxis = d3.axisBottom(x);

      const yAxis = d3.axisLeft(y);

      const chart = d3.select('.chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      let data = [{ name: 'a', value: 1 }, { name: 'b', value: 2 }, { name: 'c', value: 3 }];

      Promise.resolve()
        .then(() => {
          x.domain(data.map(d => {
            return d.name;
          }));
          y.domain([0, d3.max(data, d => {
            return d.value;
          })]);

          chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

          chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

          chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => {
              return x(d.name);
            })
            .attr('y', d => {
              return y(d.value);
            })
            .attr('height', d => {
              return height - y(d.value);
            })
            .attr('width', 100);
        });
    };
  });

export default CONTROLLER;