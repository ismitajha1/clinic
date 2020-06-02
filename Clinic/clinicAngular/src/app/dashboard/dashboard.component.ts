import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {scaleBand, scaleLinear, select} from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('chartWrapper', {read: ElementRef, static: true}) chartWrapperDiv: ElementRef<HTMLDivElement>;

  data = [
    {address: 'Kathmandu', noOfEmployees: 5},
    {address: 'Pokhara', noOfEmployees: 1},
    {address: 'Palpa', noOfEmployees: 3},
    {address: 'Lumbini', noOfEmployees: 9},
    {address: 'Illam', noOfEmployees: 3},
    {address: 'Chitwan', noOfEmployees: 9},
    {address: 'Butwal', noOfEmployees: 3}
  ];

  constructor() {}

  ngOnInit(): void {
    const maxNum = this.getMaxNum();
    const height = 300;
    const width = 600;
    const chartSvg = select(this.chartWrapperDiv.nativeElement)
      .append('svg')
      .attr('height', height)
      .attr('width', width);
    const yScale = scaleBand()
      .domain(this.data.map(v => v.address))
      .range([0, height])
      .paddingInner(0.1);
    const xScale = scaleLinear()
      .domain([0, maxNum + 1])
      .range([0, width]);
    chartSvg.selectAll('rect').data(this.data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', val => yScale(val.address))
      .attr('height', yScale.bandwidth())
      .attr('width', 0)
      .attr('fill', 'green')
      .transition()
      .duration(2000)
      .attr('width', val => xScale(val.noOfEmployees));
  }

  private getMaxNum(): number {
    let maxNum = 0;
    this.data.forEach(item => {
      maxNum = maxNum < item.noOfEmployees
        ? item.noOfEmployees
        : maxNum
    });
    return maxNum;
  }
}
